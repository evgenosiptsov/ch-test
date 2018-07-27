import React, { Component } from 'react';
import Editor from '../components/Editor'
import Console from '../components/Console'
import { ALMOST_INITITAL_CODE } from '../constants'

class Example extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			code: ALMOST_INITITAL_CODE,
			text: null,
			error: null,
		};
		this.onChange = this.onChange.bind(this)
		this.handleAlmostC = this.handleAlmostC.bind(this)
	}
	
	onChange(code = "") {
		const [text, error] = this.handleAlmostC(code)
		this.setState({ code, text, error })
	}
	
	/**
	 *
	 * @param code
	 * @returns {*[text, error]}
	 * error - syntax error, impossible, etc
	 */
	handleAlmostC(code) {
		const lines = code.split('\n')
		const syntaxErrors = lines.filter(line => {
			return !line.match(/^[A-Za-z0-9]+ calls [A-Za-z0-9]+[\s\n]{0,1}$/gm)
		}).filter(line => line)
		let text =""
		let error = ""
		
		if(syntaxErrors.length) {
			text = "";
			error = "Syntax error";
		} else {
			//lexical processing within graph context
			const edges = lines.map((line) => {
				const actors = line.split('calls')
				const caller = actors[0]
				const callee = actors[1]
				return [callee, caller].filter(edge => typeof(edge) === 'string').map(edge => edge.trim())
			}).filter(edges => edges.length > 1)
			
			//sorting graphs
			if (edges.length) {
				try {
					text = this.topologicalSort(edges).join(', ')
					error = null;
				} catch(e) {
					text = "";
					error = "Impossible";
				}
			}
		}
		
		return [text, error]
	}
	
	topologicalSort(edges) {
		var nodes   = {}, // hash: stringified id of the node => { id: id, afters: lisf of ids }
			sorted  = [], // sorted list of IDs ( returned value )
			visited = {}; // hash: id of already visited node => true
		
		var Node = function(id) {
			this.id = id;
			this.afters = [];
		}
		
		// 1. build data structures
		edges.forEach(function(v) {
			var from = v[0], to = v[1];
			if (!nodes[from]) nodes[from] = new Node(from);
			if (!nodes[to]) nodes[to]     = new Node(to);
			nodes[from].afters.push(to);
		});
		
		// 2. topological sort
		Object.keys(nodes).forEach(function visit(idstr, ancestors) {
			var node = nodes[idstr],
				id   = node.id;
			
			// if already exists, do nothing
			if (visited[idstr]) return;
			
			if (!Array.isArray(ancestors)) ancestors = [];
			
			ancestors.push(id);
			
			visited[idstr] = true;
			
			node.afters.forEach(function(afterID) {
				if (ancestors.indexOf(afterID) >= 0)  // if already in ancestors, a closed chain exists.
					throw new Error('closed chain : ' +  afterID + ' is in ' + id);
				
				visit(afterID.toString(), ancestors.map(function(v) { return v })); // recursive call
			});
			
			sorted.unshift(id);
		});
		
		return sorted;
	}
	
	render() {
		const { code, text, error } = this.state
		return (
			<div>
				<Editor code={code} onChange={this.onChange}/>
				<Console text={text} error={error}/>
			</div>
		);
	}
}

export default Example;

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import toJSON from 'enzyme-to-json';
import Container from './AlmostC';

Enzyme.configure({ adapter: new Adapter() });

describe('Test container components ', () => {
	
	
	it('Container should render correctly', () => {
		const wrapper = shallow( <Container/> );
		
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
	
	/**
	 foo calls bar
	 foo calls baz
	 bar calls baz
	 */
	it('Possible', () => {
		const wrapper = shallow( <Container/> );
		const topologicalSort = wrapper.instance().topologicalSort
		const edges = [
			['bar', 'foo'],
			['baz', 'foo'],
			['baz', 'bar'],
		];
		const sorted = topologicalSort(edges)
		expect(sorted).toMatchSnapshot();
	});
	
	/**
	 strcpy calls memcpy
	 memcpy calls malloc
	 malloc calls strcpy
	 */
	it('Impossible', () => {
		const wrapper = shallow( <Container/> );
		const topologicalSort = wrapper.instance().topologicalSort
		const edges = [
			['memcpy', 'strcpy'],
			['malloc', 'memcpy'],
			['strcpy', 'malloc'],
		];
		expect(() => topologicalSort(edges)).toThrow();
	});
	
	/**
	 strcpy calls memcpy
	 memcpy calls malloc
	 malloc calls strcpy
	 */
	it('Syntax error', () => {
		const wrapper = shallow( <Container/> );
		const handleAlmostC = wrapper.instance().handleAlmostC
		const code = "strcpy calls memcpy\nmemcpy calls malloc;\malloc calls strcpy";
		
		const [text, error] = handleAlmostC(code)
		
		expect(error).toBe('Syntax error')
	});

});
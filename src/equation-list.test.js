import React from 'react';
import {EquationList} from './components/equation-list';
import {shallow, mount} from 'enzyme';


// describe('<App />', () => {
//     it('Should renderer without crashing', () => {
//         shallow(<App equations={[]}/>);
//     });
//   });
it('Should render the equations in the equation list', () => {
      const equations = [
        {name: 'dsafdfs', molecules: [{name: 'asfd', weight: 45}, {name: 'asqwe', weight: 60}]},
        {name: 'dfdass', molecules: [{name: 'aetryfd', weight: 85}, {name: 'awerwe', weight: 65}]}
    ];
    const outputs = []
      const wrapper = shallow(<EquationList equations={equations} dispatch={() => {}}/>);
      wrapper.setState({
          equations
      });
      const lis = wrapper.find('.the-equation');
      expect(lis.length).toEqual(equations.length);
      lis.forEach((item, index) => {
      expect(item.text()).toEqual(equations[index].name);
      });
  });

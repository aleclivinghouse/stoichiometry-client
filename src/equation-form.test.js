import React from 'react';
import {EquationForm} from './components/equation-form';
import { Provider } from "react-redux";
import {shallow, mount, render} from 'enzyme';
import configureMockStore from "redux-mock-store";
// import local-storage from './local-storage';



// describe what we are testing
describe('Equation Form', () => {

 // make our assertion and what we expect to happen
 it('should render without throwing an error', () => {
   expect(shallow(<EquationForm dispatch={() => {}}/>).find('form').exists()).toBe(true)
 })
})

it('Should add an equation when the form is submitted', () => {
     const equations = [{name: 'CH4+2O2=CO2+2H20', molecules: [{amount: 10, whichMolecule: 1}]}];
     const nameToAdd = '2H2+O2=2H2O';
     const wrapper = mount(<EquationForm/>);
    //  const moleculeAmount = 10;
    // const   whichMolecule = 1}
     wrapper.setState({
         equations
     });

     const equationInput = wrapper.find('#equation');
     equationInput.instance().value = nameToAdd;
     equationInput.simulate("change");
     const whichMoleculeInput = wrapper.find('#whichMole-0');
     whichMoleculeInput.instance().value = 1;
     whichMoleculeInput.simulate("change");
     const amountInput = wrapper.find('#amount-0');
     amoountInput.simulate("change");
     amountInput.instance().value = 10;
     const form = wrapper.find('form');
     form.simulate('submit');
     console.log(wrapper.state());
     // expect(wrapper.state('equations')).toEqual([..., toAdd]);
 });

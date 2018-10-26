import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {validateEquation} from '../validations/validateEquation';
import {validateMolecules} from '../validations/validateMolecules';
import {limitingReactantValidation} from '../validations/limitingReactantValidation';
import {postEquation, addEquation, fetchEquationsError} from '../actions/equation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './equation-form.css';

export class EquationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      molecules: [{amount: 0, whichMolecule: 1}],
      equation: '',
      equationError: '',
      moleculesError: '',
    };
  }

  handleChange = (e) => {
    console.log(e.target);
    if(["amount", "whichMolecule"].includes(e.target.className)){
      let molecules = [...this.state.molecules];
      molecules[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ molecules }, () => console.log(this.state.molecules))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  deleteField = (e) => {
    let molecules = [...this.state.molecules];
    let toDelete = molecules[e.target.dataset.id];
    let i = molecules.indexOf(toDelete);
    let theMolecules = molecules.filter((i) => {
      return i != toDelete
    });
    this.setState({ molecules: theMolecules});
  }


  addMolecule = () => {
  this.setState((prevState) => ({
    molecules: [...prevState.molecules, {amount: 0, whichMolecule: 1}]
  }));
}



handleSubmit = (e) => {
  e.preventDefault()
  //rest of the code
  const equationIsValid = validateEquation(this.state.equation);
  const moleculesAreValid = validateMolecules(this.state.molecules);

  if(equationIsValid === true && moleculesAreValid == true){
    // let theState = this.state;
    for(let molecule of this.state.molecules){
        molecule.whichMolecule = parseInt(molecule.whichMolecule);
        console.log('below should be a type number');
   }
   console.log('below is the state');
   console.log(this.state);
   this.props.dispatch(postEquation(this.state));
   this.setState({
       equationError: '',
       moleculesError: ''
     })

  } else if(equationIsValid === false && moleculesAreValid == true){
    this.setState({
        equationError: 'Must be a valid equation with two reactants',
        moleculesError: ''
      })
    } else if(equationIsValid === true && moleculesAreValid == false){
      this.setState({
          moleculesError: 'Molecule weight must be greater than zero, molecule position must be unique',
          equationsError: ''
      })
    } else {
      this.setState({
          moleculesError: 'Molecule weight must be greater than zero and molecule position must be unique',
          equationError: 'Must be a valid equation with two reactants'
      })
    }
  }

  render(){
    let molecules = this.state.molecules;
    let equation = this.state.equation;
    return (
      <div className="form-wrapper">
          <p className="error">{this.state.equationError}</p>
          <p className="error">{this.state.moleculesError}</p>
      <form onSubmit={this.handleSubmit}  >
        <label htmlFor="equation">Equation</label>
        <input type="text" name="equation" id="equation" value={equation} onChange={this.handleChange} className="equation-input"/>
          <a onClick={this.addMolecule} className="add-molecule"> <FontAwesomeIcon icon="plus-circle" size="lg"/></a>
        {
          molecules.map((val, idx)=>{
            let amountId = `amount-${idx}`, whichMoleId = `whichMole-${idx}`
            return (
               <div key={idx} className = "field-wrapper">
                <label htmlFor={amountId}>Amount</label>
                <input
                  type="number"
                  name={amountId}
                  data-id={idx}
                  id={amountId}
                  value={molecules[idx].amount}
                  className="amount"
                  onChange={this.handleChange}
                />
                <label htmlFor={whichMoleId}>Which Molecule</label>
                 <select
                   type="number"
                   name={whichMoleId}
                   data-id={idx}
                   id={whichMoleId}
                   value={molecules[idx].whichMolecule}
                   className="whichMolecule"
                   onChange={this.handleChange}
                 >
                 <option value="1">First</option>
                 <option value="2">Second</option>
               </select>
               <a onClick={this.deleteField} data-id={idx} className="submit-button">Delete</a>
               </div>
            )
          })
        }
        <input type="submit" value="Submit" className="submit-button"/>
      </form>
    </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   equationToAdd: state.equationToAdd
// });
export default connect()(EquationForm);

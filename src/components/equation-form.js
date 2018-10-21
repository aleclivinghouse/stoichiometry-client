import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {validateEquation} from '../validations/validateEquation';
import {validateMolecules} from '../validations/validateMolecules';
import {postEquation, addEquation, fetchEquationsError} from '../actions/equation';

class EquationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      molecules: [{amount: 0, whichMolecule: 1}],
      equation: '',
      equationError: '',
      moleculesError: ''
    };
  }

  handleChange = (e) => {
    //rest
    if(["amount", "whichMolecule"].includes(e.target.className)){
      let molecules = [...this.state.molecules];
      molecules[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ molecules }, () => console.log(this.state.molecules))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }


  addMolecule = (e) => {
  this.setState((prevState) => ({
    molecules: [...prevState.molecules, {amount: 0, whichMolecule: 1}],
  }));
}



handleSubmit = (e) => {
  e.preventDefault()
  //rest of the code
  let theState = this.state;
  for(let molecule of this.state.molecules){
    if(isNaN(molecule.whichMolecule)){
      molecule.whichMolecule = parseInt(molecule.whichMolecule);
  }
  const equationIsValid = validateEquation(this.state.equation);
  const moleculesAreValid = validateMolecules(this.state.molecules);
  console.log('this is equation is valid ' + equationIsValid);
  if(equationIsValid === true && moleculesAreValid == true){
    this.setState({
        moleculesError: '',
        equationError: ''
      })
    this.props.dispatch(postEquation(theState));
  } else if(equationIsValid === false && moleculesAreValid == true){
    this.setState({
        equationError: 'Must be a valid Equation',
        moleculesError: ''
      })
    } else if(equationIsValid === true && moleculesAreValid == false){
      this.setState({
          moleculesError: 'Molecule weight must be greater than zero and molecule position must be unique',
          equationsError: ''
      })
    } else {
      this.setState({
          moleculesError: 'Molecule weight must be greater than zero and molecule position must be unique',
          equationError: 'Must be a valid Equation'
      })
    }
  }
}

  render(){
    let molecules = this.state.molecules;
    let equation = this.state.equation;
    return (
      <div>
        <h3>{this.state.equationError}</h3>
        <h3>{this.state.moleculesError}</h3>
      <form onSubmit={this.handleSubmit}  >
        <label htmlFor="equation">Equation</label>
        <input type="text" name="equation" id="equation" value={equation} onChange={this.handleChange}/>
        <button onClick={this.addMolecule}>Add Another Molecule</button>
        {
          molecules.map((val, idx)=>{
            let amountId = `amount-${idx}`, whichMoleId = `whichMole-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={amountId}>amount</label>
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
                 <option value="3">Third</option>
                 <option value="4">Fourth</option>
               </select>
               </div>
            )
          })
        }
        <input type="submit" value="Submit" />
      </form>
    </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   equationToAdd: state.equationToAdd
// });
export default connect()(EquationForm);

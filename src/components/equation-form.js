import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {postEquation, addEquation, fetchEquationsError} from '../actions/equation';

class EquationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      molecules: [{amount: 0, whichMolecule: 1}],
      equation: ''
    };
  }

  handleChange = (e) => {
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
    molecules: [...prevState.molecules, {amount: '', whichMolecule: ''}],
  }));
}
handleSubmit = (e) => { e.preventDefault()
  let value = this.state;
  console.log('below is what we send to the server');
  console.log(value);
  this.props.dispatch(postEquation(value));
}

  render(){
    let molecules = this.state.molecules;
    let equation = this.state.equation;
    return (
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
    )
  }
}

// const mapStateToProps = (state) => ({
//   equationToAdd: state.equationToAdd
// });
export default connect()(EquationForm);

import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {postEquation, addEquation, fetchEquationsError} from '../actions/equation';

class EquationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      molecules: [{name: '', whichMolecule: ''}]
    };
  }

  handleChange = (e) => {
    if(["name", "whichMolecule"].includes(e.target.className)){
      let molecules = [...this.state.molecules];
      molecules[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ molecules }, () => console.log(this.state.molecules))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }


  addMolecule = (e) => {
  this.setState((prevState) => ({
    molecules: [...prevState.molecules, {name: '', whichMolecule: ''}],
  }));
}
handleSubmit = (e) => { e.preventDefault()
  console.log(this.state.molecules);
}

  render(){
    let molecules = this.state.molecules;
    return (
      <form onSubmit={this.handleSubmit}  >
        <button onClick={this.addMolecule}>Add Another Molecule</button>
        {
          molecules.map((val, idx)=>{
            let nameId = `name-${idx}`, whichMoleId = `whichMole-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={nameId}>{`Name #${idx + 1}`}</label>
                <input
                  type="text"
                  name={nameId}
                  data-id={idx}
                  id={nameId}
                  value={molecules[idx].name}
                  className="name"
                  onChange={this.handleChange}
                />
                <label htmlFor={whichMoleId}>Which Molecule</label>
                 <input
                   type="text"
                   name={whichMoleId}
                   data-id={idx}
                   id={whichMoleId}
                   value={molecules[idx].whichMolecule}
                   className="whichMolecule"
                   onChange={this.handleChange}
                 />
               </div>
            )
          })
        }
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  equationToAdd: state.equationToAdd
});
export default connect(mapStateToProps)(EquationForm);

import React from 'react';
import {connect} from 'react-redux';
import { fetchEquations } from '../actions/equation';
import './equation-list.css';

export class EquationList extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchEquations());
  }

  render(){
    return(
      <div className="list-wrapper">
      {this.props.equations}
    </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('below is the state');
  console.log(state);
  const equationList = state.equation.equations.map((equation, index)=>{
     return (
      <div className="equation-card">
        <div className="card-header">
        <h2 key={index}>{equation.name}</h2>
        </div>
        {equation.molecules.map((molecule, index) => <h4>Molecule Name:{molecule.name} Molecule Weight:{molecule.weight}</h4>)}
      </div>
    )
  });
  return {
    equations: equationList.reverse()
  };
};

export default connect(mapStateToProps)(EquationList);

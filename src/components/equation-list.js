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
    let theName = equation.name.replace('1','');
    console.log('this is the name');
    console.log(theName);
     return (
      <div className="equation-card">
        <div className="card-header">
        <h2 key={index}>{theName}</h2>
        </div>
        {equation.molecules.map((molecule, index) => <h4>Molecule Name:{molecule.name.replace('1', '')} Molecule Weight:{molecule.weight}</h4>)}
      </div>
    )
  });
  return {
    equations: equationList.reverse()
  };
};

export default connect(mapStateToProps)(EquationList);

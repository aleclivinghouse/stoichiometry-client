import React from 'react';
import {connect} from 'react-redux';
import { fetchEquations } from '../actions/equation';

export class EquationList extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchEquations());
  }

  render(){
    return(
      <ul>
      {this.props.equations}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  console.log('below is the state');
  console.log(state);
  const equationList = state.equation.equations.map((equation, index)=>{
     return (
      <div>
       <ul>
        <li key={index}>{equation.name}</li>
        {equation.molecules.map((molecule, index) => <li>{molecule.name} {molecule.weight}</li>)}
       </ul>
      </div>
    )
  });
  return {
    equations: equationList
  };
};

export default connect(mapStateToProps)(EquationList);

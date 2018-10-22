import React from 'react';
import {connect} from 'react-redux';
import { fetchEquations, deleteEquation} from '../actions/equation';
import './equation-list.css';

export class EquationList extends React.Component{
  componentDidMount(){
    console.log('this is the state in the component');
    console.log(this.state);
    this.props.dispatch(fetchEquations());
  }

  render(){
    const equations = this.props.equations.map((equation, index)=> {
      console.log('this is each equation')
      console.log(equation);
        let theName = equation.name.replace('1','');
    return( <div className="equation-card">
          <div className="card-header">
          <h2 key={index}>{theName}</h2>
          </div>
          {equation.molecules.map((molecule, index) => <h4>Molecule Name:{molecule.name.replace('1', '')} Molecule Weight:{molecule.weight}</h4>)}
        <a onClick={() => this.props.dispatch(deleteEquation(equation.id))}>Delete</a>
      </div>
      )
    });
    return(
      <div>
        {equations}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  equations: state.equation.equations.reverse()
});

export default connect(mapStateToProps)(EquationList);

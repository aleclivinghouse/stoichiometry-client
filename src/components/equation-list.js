import React from 'react';
import {connect} from 'react-redux';
import {fetchEquations, deleteEquation} from '../actions/equation';
import './equation-list.css';

export class EquationList extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchEquations());
  }

  render(){
    const equations = this.props.equations.map((equation, index)=> {
      let numRegex = /[1-9]/;
        let theName;
          for(let i = 0; i < equation.length; i++){
            if(numRegex.test(equation[i])===false && equation[i+1] === '0'){
              console.log('this is equation of i' + equation[i]);
              console.log('this is equation of i plus one' + equation[i + 1]);
              equation = equation.replace(equation[i+1], '');
            }
        }
    return(
      <div className="equation-card" key={index}>
          <div className="card-header">
            <h2 className="the-equation">{equation.name}</h2>
          </div>
          {equation.molecules.map((molecule, index) => <p key={index}>name:{molecule.name} weight:{molecule.weight}</p>)}
          <a onClick={() => this.props.dispatch(deleteEquation(equation.id))} className="submit-button">Delete</a>
      </div>
      )
    });
    return(
      <div className='equations-wrapper'>
        {equations}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  equations: state.equation.equations.reverse()
});

export default connect(mapStateToProps)(EquationList);

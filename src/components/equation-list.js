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
  // const equationList = state.equations.map((equation, index)=>{
  //    return (<li key={index}>{equation}</li>)
  // });
  // return {
  //   equations: equationList
  // };
};

export default connect(mapStateToProps)(EquationList);

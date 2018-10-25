import React from 'react';
import './modal.css';
export class Modal extends React.Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  render(){
    return (
      <div>
        <button onClick={this.toggleHidden.bind(this)} className="help-button">
          Help
        </button>
        {!this.state.isHidden && <Child />}
      </div>
    )
  }
}

const Child = () => (
<div className='modal'>
  <p>Enter a chemical equation in the following format: CH4+2O2=2H2O+CO2</p>
  <p>Then enter the weights in grams of the molecules you already know the weight of</p>
  </div>
)

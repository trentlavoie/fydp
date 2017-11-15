import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';

const backgroundStyle = {
  height: '800px',
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto'
}

export default class RecommendationView extends React.Component {

    constructor() {
      super();
      this.state = {
        currentStep: 0
      }
    }

    renderCurrentStep() {

      if (this.state.currentStep === 0) {
        return (
          <div style = {{height: '50%', textAlign: 'center'}}> 
            Current Step
          </div>
        )
      } else if (this.state.currentStep === 1) {
        return (
          <div style = {{height: '50%', textAlign: 'center'}}> 
            Next Step
          </div>
        )
      }
    }

    render() {

      return (
          <div>
            <Navbar/>
            <div style = {backgroundStyle}>
              <div style = {{alignSelf: 'center', width: '800px', height: '300px'}}>
                {this.renderCurrentStep()}
                <div style = {{float: 'left'}}>
                  <RaisedButton label="Back" secondary={true} onClick = {() => {this.setState({currentStep: this.state.currentStep - 1})}}/>
                </div>
                <div style = {{float: 'right'}}>
                  <RaisedButton label="Next Step" secondary={true} onClick = {() => {this.setState({currentStep: this.state.currentStep + 1})}}/>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

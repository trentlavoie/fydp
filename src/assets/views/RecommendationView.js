import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';
import Geosuggest from 'react-geosuggest';
import FontIcon from 'material-ui/FontIcon';

const backgroundStyle = {
  height: '800px',
  display: 'flex',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const centerContainer = {
  height: '200px',
  textAlign: 'center'
}
export default class RecommendationView extends React.Component {

    constructor() {
      super();
      this.state = {
        currentStep: 0,
        location: ''
      }

      this.onLocationSelect = (suggest) => {
        if (suggest && suggest.description) {
          this.setState({location: suggest.description})
        }
      }
    }

    renderCurrentStep() {

      if (this.state.currentStep === 0) {
        return (
          <div style = {centerContainer}> 
            <FontIcon className="material-icons" style = {{fontSize: '80px'}}>map</FontIcon>
            <div>
              <span style=  {{fontFamily: 'Futura' , fontSize: '20px', color: 'teal'}}>My Location</span>
            </div>
            <Geosuggest onSuggestSelect={this.onLocationSelect} initialValue={this.state.location}/>
          </div>
        )
      } else if (this.state.currentStep === 1) {
        return (
          <div style = {centerContainer}> 
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
                  {this.state.currentStep > 0 &&
                    <RaisedButton label="Back" secondary={true} onClick = {() => {this.setState({currentStep: this.state.currentStep - 1})}}/>
                  }
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

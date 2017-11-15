import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';
import Geosuggest from 'react-geosuggest';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import ReactBubbleChart from 'react-bubble-chart';

var colorLegend = [
  //reds from dark to light
  {color: "#67000d", text: 'Negative', textColor: "#ffffff"}, "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
  //neutral grey
  {color: "#f0f0f0", text: 'Neutral'},
  // blues from light to dark
  "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", {color: "#08306b", text: 'Positive', textColor: "#ffffff"}
];

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

const headerFont = {
  fontFamily: 'Futura',
  fontSize: '20px',
  color: 'teal'
}

const captionFont = {
  fontFamily: 'Futura',
  fontSize: '15px',
  color: 'teal'
}

export default class RecommendationView extends React.Component {

    constructor() {
      super();
      this.state = {
        currentStep: 2,
        location: '',
        budgetAmount: 5000,
        g: null
      }

      this.onLocationSelect = (suggest) => {
        if (suggest && suggest.description) {
          this.setState({location: suggest.description})
        }
      }

      this.handleSliderValue = (event, value) => {
        if (value && event) {
          this.setState({budgetAmount: value})
        }
      }

      this.prettyAmount = () => {
        var prettiedAmmount = this.state.budgetAmount;

        if (this.state.budgetAmount / 1000 < 10) {
          prettiedAmmount = this.state.budgetAmount / 1000 + ',' + (this.state.budgetAmount % 1000 === 0 ? '000': this.state.budgetAmount%1000);
        } else {
          prettiedAmmount = (this.state.budgetAmount / 1000).toFixed(0) + ',000';
        }

        return prettiedAmmount;
      }

      this.buttonClick = (data) => {
        console.log(data);
      }
    }

    renderCurrentStep() {

      if (this.state.currentStep === 0) {
        return (
          <div style = {centerContainer}> 
            <FontIcon className="material-icons" style = {{fontSize: '80px'}}>map</FontIcon>
            <div>
              <span style=  {headerFont}>My Location</span>
            </div>
            <Geosuggest onSuggestSelect={this.onLocationSelect} initialValue={this.state.location}/>
          </div>
        )
      } else if (this.state.currentStep === 1) {
        return (
          <div style = {centerContainer}> 
            <FontIcon className="material-icons" style = {{fontSize: '80px'}}>shopping_cart</FontIcon>
            <div>
              <span style=  {headerFont}>My Budget</span>
            </div>
            <Slider
              min={5000}
              max={150000}
              defaultValue={10000}
              step={1000}
              value={this.state.budgetAmount}
              onChange={this.handleSliderValue}
            />
            <span style = {captionFont}>Your current selected amount in $: {this.prettyAmount()}</span>
          </div>
        )
      } else if (this.state.currentStep === 2) {

        var data = [
          {
            _id: 'Handling',
            value: 1,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Cost',
            value: 1,
            colorValue: 'white',
            selected: false
          },
          {
            _id: 'Fuel Efficiency',
            value: 1,
            colorValue: 'white',
            selected: true
          },
          {
            _id: 'Comfort',
            value: 1,
            colorValue: 'white',
            selected: true
          }
        ]

        return (
          <div style = {centerContainer} > 
          <ReactBubbleChart
            data={data}
            colorLegend={colorLegend}
            selectedColor="black"
            legend={false}
            fixedDomain={{min: -1, max: 1}}
            selectedTextColor="white"
            onClick={this.buttonClick}
          />;
          </div>
        )
      }

    }

    render() {

      return (
          <div>
            <Navbar/>
            <div style = {backgroundStyle}>
              <div style = {{alignSelf: 'center', width: '800px', height: '300px'}} id = "chart">
                {this.renderCurrentStep()}
                <div style = {{float: 'left'}}>
                    <RaisedButton label="Back" disabled={this.state.currentStep === 0} secondary={true} onClick = {() => {this.setState({currentStep: this.state.currentStep - 1})}}/>
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

import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';
import Geosuggest from 'react-geosuggest';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import ReactBubbleChart from 'react-bubble-chart';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import _ from 'lodash';
import { Button } from 'semantic-ui-react';

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

const progressFont = {
  fontFamily: 'Futura',
  fontSize: '20px',
  color: 'teal',
  paddingTop: '50px'
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
        currentStep: 4,
        location: '',
        budgetAmount: 5000,
        selectedCarType: [],
        file: null,
        preferences: [
          {
            _id: 'Handling',
            value: 5,
            colorValue: -1,
            selected: false,
            clicked: 0
          },
          {
            _id: 'Cost',
            value: 5,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Fuel Efficiency',
            value: 5,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Comfort',
            value: 5,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Brand',
            value: 5,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Off-Roading',
            value: 5,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Resale Value',
            value: 5,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Safety',
            value: 5,
            colorValue: -1,
            selected: false
          },
          {
            _id: 'Performance',
            value: 5,
            colorValue: -1,
            selected: false
          }
        ]
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

        let newPrefenceArr = _.cloneDeep(this.state.preferences)

        newPrefenceArr.forEach((preference) => {
          if (preference._id === data._id) {
            if (preference.clicked < 2) {
              preference.clicked ++;
              preference.value = preference.value * 1.2;
              preference.selected = true;
            } else {
              preference.clicked = 0;
              preference.value = 5;
              preference.selected = false;
            }
          }
        })

        this.setState({preferences: newPrefenceArr})
      }

      this.carTypeClicked = (evt) => {

        var modifiedCarTypeArr = _.cloneDeep(this.state.selectedCarType);

        if (evt && evt.currentTarget) {

          var id = parseInt(evt.currentTarget.id);

          if (modifiedCarTypeArr.indexOf(id) >= 0) {
            modifiedCarTypeArr.splice(modifiedCarTypeArr.indexOf(id), 1);
            this.setState({selectedCarType: modifiedCarTypeArr})
          } else {
            modifiedCarTypeArr.push(id);
            this.setState({selectedCarType: modifiedCarTypeArr})
          }
        }
      }

      this.openFileDialog = () => {
        this.refs.fileUpload.click();
      }

      this.handleFileChange = (evt) => {
        this.setState({file: this.refs.fileUpload.files[0]})
      }

      this.incrementStepCounter = () => {
        if (this.state.currentStep !== 4 ) {
          this.setState({currentStep: this.state.currentStep + 1})
        }
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

        return (
          <div style = {centerContainer} > 
          <div style = {{marginTop: '-200px'}}>
            <FontIcon className="material-icons" style = {{fontSize: '80px'}}>person_pin</FontIcon>
            <div>
              <span style=  {headerFont}>Preference Selections - Select any preferences (Click twice for importance)</span>
            </div>
          </div>
          <ReactBubbleChart
            data={this.state.preferences}
            colorLegend={colorLegend}
            selectedColor="black"
            legend={false}
            fixedDomain={{min: -1, max: 1}}
            selectedTextColor="white"
            fontSizeFactor={0.3}
            onClick={this.buttonClick}
          />
          </div>
        )
      } else if (this.state.currentStep === 3) {

        const style = {
          height: 100,
          width: 100,
          margin: 20,
          textAlign: 'center',
          display: 'inline-block',
          position: 'relative'
        };

        var image = 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX19511256.jpg';

        var divStyle = {
          height: 100,
          width: 100,
          margin: 20,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'block',
          position: 'absolute',
          left: -20,
          top: -20
        }

        return (
          <div style = {centerContainer} > 
            <FontIcon className="material-icons" style = {{fontSize: '80px', top: '-100px'}}>motorcycle</FontIcon>
            <div style = {{marginTop: '-100px'}}>
              <span style=  {headerFont}>Car Type</span>
            </div>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(1) >= 0 ? 5 : 1}>
              <div id="1" style = {divStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {{marginTop: '20px'}} src = "https://i.stack.imgur.com/gYVtH.png"></img>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(2) >= 0 ? 5 : 1}>
              <div id="2" style = {divStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {{marginTop: '20px'}} src = "https://i.stack.imgur.com/gYVtH.png"></img>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(3) >= 0 ? 5 : 1}>
              <div id="3" style = {divStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {{marginTop: '20px'}} src = "https://i.stack.imgur.com/gYVtH.png"></img>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(4) >= 0 ? 5 : 1}>
              <div id="4" style = {divStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {{marginTop: '20px'}} src = "https://i.stack.imgur.com/gYVtH.png"></img>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(5) >= 0 ? 5 : 1}>
              <div id="5" style = {divStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {{marginTop: '20px'}} src = "https://i.stack.imgur.com/gYVtH.png"></img>
              </div>
            </Paper>
          </div>
        )
      } else if (this.state.currentStep === 4) {
        return (
          <div style = {centerContainer}> 
            <FontIcon className="material-icons" style = {{fontSize: '80px'}}>file_upload</FontIcon>
            <div>
              <span style=  {headerFont}>Upload drive cycle data (Optional)</span>
            </div>
            <div style = {{paddingTop: '30px'}}>
              <RaisedButton label="Upload Here" primary={true} onClick={this.openFileDialog}>
              <input
                  ref="fileUpload"
                  type="file"
                  style={{"display" : "none"}}
                  onChange={this.handleFileChange}
              />
              </RaisedButton>

              {
                this.state.file && this.state.file.name &&
                <div style = {{paddingTop: '20px'}}>
                  <span style= {progressFont}>You are uploading: {this.state.file.name}</span>
                </div>
              }
            </div>
          </div>
        )
      }
    }

    render() {

      return (
          <div>
            <Navbar/>
            <div style = {backgroundStyle}>
              <div style = {{alignSelf: 'center', width: '1000px', height: '300px'}} >
                {this.renderCurrentStep()}
                <div style = {{float: 'left'}}>
                  <RaisedButton label="Back" disabled={this.state.currentStep === 0} secondary={true} onClick = {() => {this.setState({currentStep: this.state.currentStep - 1})}}/>
                </div>
                <div style = {{float: 'right'}}>
                  <RaisedButton label={this.state.currentStep !== 4 ? 'Next Step' : 'Finish'} secondary={true} onClick = {this.incrementStepCounter}/>
                </div>
                <div style = {{paddingTop: '100px', textAlign: 'center'}}>
                  <LinearProgress mode="determinate" value={(this.state.currentStep + 1) * 20 } />
                  <span style = {progressFont} >Step {this.state.currentStep + 1} out of 5 completed</span>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

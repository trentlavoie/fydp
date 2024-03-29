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
import request from 'superagent';
import { Button } from 'semantic-ui-react';

var colorLegend = [
  //reds from dark to light
  {color: "#ffffff", text: 'Negative', textColor: "#000000"}, "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
  //neutral grey
  {color: "#7F7F7F", text: 'Neutral', textColor: 'white'},
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
  fontFamily: 'Verdana',
  fontSize: '20px',
  color: 'teal'
}

const progressFont = {
  fontFamily: 'Verdana',
  fontSize: '20px',
  color: 'teal',
  paddingTop: '50px'
}

const captionFont = {
  fontFamily: 'Verdana',
  fontSize: '15px',
  color: 'teal'
}

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  position: 'relative'
};

const inlinePaperDivStyle = {
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

const typeContainer = {
  textAlign: 'center',
  width: '700px',
  height: '200px',
  marginLeft: '120px',
  marginBottom: '50px'
}

const distanceContainer = {

    textAlign: 'center',
    width: '1000px',
    height: '200px'
}

const imageStyle = {
  marginTop: '20px'
}

const vehicleTypes = [
  'Hatchback',
  'Sedan',
  'SUV',
  'Coupe'
]

const fontIconStyle = {
  fontSize: '80px',
  top: '-100px'
}

export default class RecommendationView extends React.Component {

    constructor() {
      super();
      this.state = {
        currentStep: 0,
        location: '',
        budgetAmount: 20000,
        selectedCarType: [],
        selectedDistanceTravelled: 0,
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
            _id: 'Fuel  Economy',
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

              if (preference.clicked === 0) {
                preference.selected = false;
                preference.colorValue = 0;
              } else {
                preference.selected = true;
              }

              preference.clicked ++;
              preference.value = preference.value * 1.2;

            } else {
              preference.clicked = 0;
              preference.colorValue = -1;
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
            if (id === 1) {
              modifiedCarTypeArr = [];
            }
            modifiedCarTypeArr.push(id);
            this.setState({selectedCarType: modifiedCarTypeArr})
          }
        }
      }

      this.distanceTravelClicked =(evt) => {

        if (evt && evt.currentTarget) {

          var id = parseInt(evt.currentTarget.id);

          if (this.state.selectedDistanceTravelled === id) {
            this.setState({selectedDistanceTravelled: 0})
          } else {
            this.setState({selectedDistanceTravelled: id})
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
        if (this.state.currentStep !== 3) {
          this.setState({currentStep: this.state.currentStep + 1})
        } else if (this.state.currentStep === 3) {
          this.postPreferenceData();
        }
      }

      this.postPreferenceData = () => {

        var selectedVehicleTypes = [];

        if (this.state.selectedCarType.indexOf(1) >= 0 || !this.state.selectedCarType.length) {
          selectedVehicleTypes = vehicleTypes;
        } else {
          this.state.selectedCarType.forEach((carIndex) => {
            selectedVehicleTypes.push(vehicleTypes[carIndex-2]);
          })
        }

        var formData = new FormData();
        var cache = []
        formData.append('file', this.refs.fileUpload.files[0])
        formData.append('budget', this.state.budgetAmount);
        formData.append('preferences', JSON.stringify(this.state.preferences, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        }));
        formData.append('car_types', JSON.stringify(selectedVehicleTypes))
        var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        request
          .post(full + '/process')
          .send(formData)
          .end((err, res) => {
            if (err || !res.ok) {
              //alert('Oh no! error');
            } else {
              this.context.router.push({
                pathname: '/portal',
                state: { list_of_cars: res.body.list_of_cars }
              })
              //alert('yay got');
            }
          });
      }

    }

    renderCurrentStep() {
      if (this.state.currentStep === -1) {
        /*
        return (
          <div style = {centerContainer}> 
            <FontIcon className="material-icons" style = {{fontSize: '80px'}}>map</FontIcon>
            <div>
              <span style=  {headerFont}>My Location</span>
            </div>
            <Geosuggest onSuggestSelect={this.onLocationSelect} initialValue={this.state.location}/>
          </div>
        )
        */
      } else if (this.state.currentStep === 0) {
        return (
          <div style = {centerContainer}> 
            <FontIcon className="material-icons" style = {{fontSize: '60px'}}>description</FontIcon>
            <div>
              <span style=  {headerFont}>Budget</span>
            </div>
            <Slider
              min={20000}
              max={75000}
              defaultValue={20000}
              step={5000}
              value={this.state.budgetAmount}
              onChange={this.handleSliderValue}
            />
            <span style = {captionFont}>Your budget is ${this.prettyAmount()}</span>
          </div>
        )
      } else if (this.state.currentStep === 1) {

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
      } else if (this.state.currentStep === 2) {

        return (
          <div style = {typeContainer} > 
            <FontIcon className="material-icons" style = {fontIconStyle}>local_shipping</FontIcon>
            <div style = {{marginTop: '-100px'}}>
              <span style = {headerFont}>Car Type</span>
            </div>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(1) >= 0 ? 5 : 1}>
              <div id="1" style = {inlinePaperDivStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {imageStyle} src = "https://image.flaticon.com/icons/svg/48/48688.svg"></img>
                <div>Any</div>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(2) >= 0 || this.state.selectedCarType.indexOf(1) >= 0 ? 5 : 1}>
              <div id="2" style = {inlinePaperDivStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {imageStyle} src = "https://image.flaticon.com/icons/svg/55/55183.svg"></img>
                <div>Hatchback</div>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(3) >= 0 || this.state.selectedCarType.indexOf(1) >= 0  ? 5 : 1}>
              <div id="3" style = {inlinePaperDivStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {imageStyle} src = "https://image.flaticon.com/icons/svg/55/55283.svg"></img>
                <div>Sedan</div>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(4) >= 0 || this.state.selectedCarType.indexOf(1) >= 0  ? 5 : 1}>
              <div id="4" style = {inlinePaperDivStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {imageStyle} src = "https://image.flaticon.com/icons/svg/55/55280.svg"></img>
                <div>SUV</div>
              </div>
            </Paper>
            <Paper style={style} zDepth={this.state.selectedCarType.indexOf(5) >= 0 || this.state.selectedCarType.indexOf(1) >= 0  ? 5 : 1}>
              <div id="5" style = {inlinePaperDivStyle} onClick={this.carTypeClicked}>
                <img width={50} height={50} style = {imageStyle} src = "https://image.flaticon.com/icons/svg/55/55180.svg"></img>
                <div>Coupe</div>
              </div>
            </Paper>
          </div>
        )
      } else if (this.state.currentStep === 3) {

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
            <Navbar selectedIndex={1}/>
            <div style = {backgroundStyle}>
              <div style = {{alignSelf: 'center', width: '1000px', height: '300px'}} >
                {this.renderCurrentStep()}
                <div style = {{float: 'left'}}>
                  <RaisedButton label="Back" disabled={this.state.currentStep === 0} secondary={true} onClick = {() => {this.setState({currentStep: this.state.currentStep - 1})}}/>
                </div>
                <div style = {{float: 'right'}}>
                  <RaisedButton label={this.state.currentStep !== 5 ? 'Next Step' : 'Finish'} secondary={true} onClick = {this.incrementStepCounter}/>
                </div>
                <div style = {{paddingTop: '100px', textAlign: 'center'}}>
                  <LinearProgress mode="determinate" value={(this.state.currentStep + 1) * 25 } />
                  <span style = {progressFont} >Step {this.state.currentStep + 1} out of 4 completed</span>
                </div>
              </div>
            </div>
            <div style = {{marginTop: '300px', textAlign: 'center', fontSize: '10px'}}>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          </div>
        )
    }
}

RecommendationView.contextTypes = {
    router: React.PropTypes.object.isRequired
}

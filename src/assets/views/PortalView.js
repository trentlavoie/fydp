import React from 'react';
import { Sidebar, Segment, Button, Menu, Image, Grid, Icon, Header } from 'semantic-ui-react'
import Navbar from '../components/Navbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import * as d3 from "d3";
import {LineChart} from 'react-d3-basic'
import ReactTooltip from 'react-tooltip';
import CircularProgressbar from 'react-circular-progressbar';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const runIconStyle = {
  marginRight: '50px',
  height: '0px'
}

const cardSectionStyle = {
  paddingBottom: '20px'
}

const cardSectionFont = {
  fontSize: '30px',
  fontFamily: 'futura',
}

const verticalAlignContainer = {
  position: 'relative',
  right: '10px'
}

const percentageFunction = (pct) => `${pct}% Match`;

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class PortalView extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        runId: 1,
        firstCardExpand: false,
        secondCardExpand: false,
        thirdCardExpand: false,
        car_details: this.props.location.state && this.props.location.state.list_of_cars ? this.props.location.state.list_of_cars :
        [
          {
            Body: 'Coupe',
            Model: 'Camaro',
            Brand: 'Chevrolet',
            Year: '2018',
            'FE-L100K-CMB': 30,
            Price: 28000,
            percent_match_norm: 75,
            HP_value: 650,
            Torque_value: 250,
            details: 'http://www.chevrolet.ca/camaro-sports-car.html',
            image: 'http://www.chevrolet.ca/content/dam/Chevrolet/northamerica/ca/nscwebsite/en/home/vehicles/performance/2018_camaro/01_images/intro/ca-2018-chevrolet-camaro-sports-car-mo-masthead-1480x551-01.jpg'
          },
          {
            Body: 'Sedan',
            Model: 'Malibu',
            Brand: 'Chevrolet',
            Year: '2017',
            'FE-L100K-CMB': 50,
            Price: 20000,
            percent_match_norm: 85,
            HP_value: 450,
            Torque_value: 100,
            details: 'http://www.chevrolet.ca/malibu-mid-size-sedan.html',
            image: 'http://www.chevrolet.ca/content/dam/Chevrolet/northamerica/ca/nscwebsite/en/home/vehicles/cars/2017_malibu/01_images/ca-2017-chevrolet-malibu-mid-size-sedan-mo-01_perspective_img_1.jpg'
          },
          {
            Body: 'Sedan',
            Model: 'Impala',
            Brand: 'Chevrolet',
            Year: '2017',
            'FE-L100K-CMB': 25,
            Price: 30000,
            percent_match_norm: 65,
            HP_value: 550,
            Torque_value: 300,
            details: 'http://www.chevrolet.ca/impala-full-size-car.html',
            image: 'http://www.chevrolet.ca/content/dam/Chevrolet/northamerica/ca/nscwebsite/en/home/vehicles/cars/2017_impala/01_images/ca-2017-chevrolet-impala-full-size-sedan-intro-1480x551-01.jpg'
          }
      ]
      }

      this.handleClick = (evt, data) => {
        this.setState({runId: data.id})
      }

      this.onSecondCardExpand = (expand) => {
        this.setState({secondCardExpand: expand})
      }

      this.onThirdCardExpand = (expand) => {
        this.setState({thirdCardExpand: expand})
      }

      this.onFirstCardExpand = (expand) => {
        this.setState({firstCardExpand: expand})
      }
    }

    renderContentLayout() {
      var chartDataCamaro = [
        {
          year:'2017M01',  total: 80
        },
        {
          year:'2018M01',  total: 90
        },
        {
          year:'2019M01',  total: 110
        }
      ]

      var chartDataMalibu = [
        {
          year:'2017M01',  total: 60
        },
        {
          year:'2018M01',  total: 100
        },
        {
          year:'2019M01',  total: 130
        }
      ]

      // your date format, use for parsing

      var parseDate = d3.time.format("%YM%m").parse;
      //+ this.state.car_details[0]['FE-L100K-CTY'] + 'L/' + this.state.car_details[0]['FE-L100K-HWY'] +'L'
      var width = 500,
        height = 300,
        margins = {left: 130, right: 130, top: 20, bottom: 50},
        chartSeries = [
          {
            field: 'total',
            name: 'Total',
            color: '#ff7f0e'
          }
        ],
        // your x accessor
        x = function(d) {
          return parseDate(d.year);
        },
        xScale = 'time';

      return (
        <Segment basic className="panel-width">
        <Header as='h3'>Recommendations & Comparison for Run: {this.state.runId}</Header>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column className="recommendation-panel-card">
              <Card onExpandChange={this.onFirstCardExpand}>
                <div style = {{textAlign: 'center', height: '300px', backgroundSize: 'contain'}}>
                  <img style = {{maxWidth: '100%', maxHeight: '100%'}} src={this.state.car_details[0].image} alt=""/>
                </div>
                <CardTitle style = {{fontFamily: 'futura'}} title={this.state.car_details[0].Year + ' ' + this.state.car_details[0].Brand + ' ' + this.state.car_details[0].Model + ' ' + this.state.car_details[0].Body}/>
                <CardText>
                  <div style = {{textAlign: 'center', fontFamily: 'futura'}}>
                    <div style = {cardSectionStyle}>
                      <CircularProgressbar percentage={this.state.car_details[0].percent_match_norm.toFixed(0)} initialAnimation={true} textForPercentage={percentageFunction} className="progressbar-green"/>
                    </div>
                    <div style = {cardSectionStyle}>
                      <Icon name='dollar' size="huge" data-tip="Budget Price" />
                      <ReactTooltip />
                      <span style = {cardSectionFont}>= {numberWithCommas(this.state.car_details[0].Price)} </span>
                    </div>
                    <div style = {cardSectionStyle}>
                      <div style ={verticalAlignContainer}>
                        <img style={{verticalAlign: 'middle'}} data-tip="Horse Power" width="70" height="50" src = "https://www.fcausfleet.com/content/dam/fca-fleet/na/fleet/en_us/why-fca-fleet/blurbrailicon/FCA-SDP_icons_Horsepower.png.fleetimage.1440.png"/>
                        <ReactTooltip />
                        <span style = {cardSectionFont}>= {this.state.car_details[0].HP_value}</span>
                        <span style = {{fontSize: '10px', fontFamily: 'futura'}}>HP</span>
                      </div>

                    </div>
                    <div style = {cardSectionStyle}>
                      <div style ={{marginRight: '10px'}}>
                        <i data-tip="Fuel Consumption (Combined)/City/Highway" className="material-icons" style = {{fontSize: '70px', verticalAlign: 'middle'}}>local_gas_station</i>
                        <span style = {{fontSize: '30px', fontFamily: 'futura'}}>= {this.state.car_details[0]['FE-L100K-CMB']}
                          <span style = {{fontSize: '10px', fontFamily: 'futura'}}>L/100KM</span>
                        </span>
                        <ReactTooltip/>
                      </div>
                    </div>
                    <div style = {{textAlign: 'center', paddingTop: '10px'}}>
                    </div>
                  </div>
                </CardText>
                <CardActions actAsExpander={true}>
                  <div style = {{textAlign: 'center'}}>
                    {!this.state.firstCardExpand && <Icon name = 'chevron down' size="large"/>}
                    {this.state.firstCardExpand && <Icon name = 'chevron up' size="large"/>}
                  </div>
                </CardActions>

                <CardText expandable={true}>
                  <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                      <TableRow>
                        <TableHeaderColumn>Specification</TableHeaderColumn>
                        <TableHeaderColumn>Units</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      <TableRow>
                        <TableRowColumn>Torque</TableRowColumn>
                        <TableRowColumn>{this.state.car_details[0].Torque_value}</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div style = {{'textAlign': 'center'}}>
                    <RaisedButton label="More Details" primary={true} onClick={()=>{window.open(this.state.car_details[0].details)}}/>
                  </div>
                </CardText>
              </Card>
            </Grid.Column>
            <Grid.Column className="recommendation-panel-card">
            <Card onExpandChange={this.onSecondCardExpand}>
              <div style = {{textAlign: 'center', height: '300px', backgroundSize: 'contain'}}>
                <img style = {{maxWidth: '100%', maxHeight: '100%'}} src={this.state.car_details[1].image} alt=""/>
              </div>
              <CardTitle style = {{fontFamily: 'futura'}} title={this.state.car_details[1].Year + ' ' + this.state.car_details[1].Brand + ' ' + this.state.car_details[1].Model + ' ' + this.state.car_details[1].Body}/>
              <CardText>
                <div style = {{textAlign: 'center', fontFamily: 'futura'}}>
                  <div style = {cardSectionStyle}>
                    <CircularProgressbar percentage={this.state.car_details[1].percent_match_norm.toFixed(0)} initialAnimation={true} textForPercentage={percentageFunction} className="progressbar-green"/>
                  </div>
                  <div style = {cardSectionStyle}>
                    <Icon name='dollar' size="huge" data-tip="Budget Price" />
                    <ReactTooltip />
                    <span style = {cardSectionFont}>= {numberWithCommas(this.state.car_details[1].Price)} </span>
                  </div>
                  <div style = {cardSectionStyle}>
                    <div style ={verticalAlignContainer}>
                      <img style={{verticalAlign: 'middle'}} data-tip="Horse Power" width="70" height="50" src = "https://www.fcausfleet.com/content/dam/fca-fleet/na/fleet/en_us/why-fca-fleet/blurbrailicon/FCA-SDP_icons_Horsepower.png.fleetimage.1440.png"/>
                      <ReactTooltip />
                      <span style = {cardSectionFont}>= {this.state.car_details[1].HP_value}</span>
                      <span style = {{fontSize: '10px', fontFamily: 'futura'}}>HP</span>
                    </div>

                  </div>
                  <div style = {cardSectionStyle}>
                    <div style ={{marginRight: '10px'}}>
                      <i data-tip="Fuel Consumption (Combined)/City/Highway" className="material-icons" style = {{fontSize: '70px', verticalAlign: 'middle'}}>local_gas_station</i>
                      <span style = {{fontSize: '30px', fontFamily: 'futura'}}>= {this.state.car_details[1]['FE-L100K-CMB']}
                        <span style = {{fontSize: '10px', fontFamily: 'futura'}}>L/100KM</span>
                      </span>
                      <ReactTooltip/>
                    </div>
                  </div>
                  <div style = {{textAlign: 'center', paddingTop: '10px'}}>
                  </div>
                </div>
              </CardText>
              <CardActions actAsExpander={true}>
                <div style = {{textAlign: 'center'}}>
                  {!this.state.secondCardExpand && <Icon name = 'chevron down' size="large"/>}
                  {this.state.secondCardExpand && <Icon name = 'chevron up' size="large"/>}
                </div>
              </CardActions>

              <CardText expandable={true}>
                <Table>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn>Specification</TableHeaderColumn>
                      <TableHeaderColumn>Units</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn>Torque</TableRowColumn>
                      <TableRowColumn>{this.state.car_details[1].Torque_value}</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                <div style = {{'textAlign': 'center'}}>
                  <RaisedButton label="More Details" primary={true} onClick={()=>{window.open(this.state.car_details[1].details)}}/>
                </div>
              </CardText>
            </Card>
            </Grid.Column>
          <Grid.Column className="recommendation-panel-card">
          <Card onExpandChange={this.onThirdCardExpand}>
            <div style = {{textAlign: 'center', height: '300px', backgroundSize: 'contain'}}>
              <img style = {{maxWidth: '100%', maxHeight: '100%'}} src={this.state.car_details[2].image} alt=""/>
            </div>
            <CardTitle style = {{fontFamily: 'futura'}} title={this.state.car_details[2].Year + ' ' + this.state.car_details[2].Brand + ' ' + this.state.car_details[2].Model + ' ' + this.state.car_details[2].Body}/>
            <CardText>
              <div style = {{textAlign: 'center', fontFamily: 'futura'}}>
                <div style = {cardSectionStyle}>
                  <CircularProgressbar percentage={this.state.car_details[2].percent_match_norm.toFixed(0)} initialAnimation={true} textForPercentage={percentageFunction} className="progressbar-green"/>
                </div>
                <div style = {cardSectionStyle}>
                  <Icon name='dollar' size="huge" data-tip="Budget Price" />
                  <ReactTooltip />
                  <span style = {cardSectionFont}>= {numberWithCommas(this.state.car_details[2].Price)} </span>
                </div>
                <div style = {cardSectionStyle}>
                  <div style ={verticalAlignContainer}>
                    <img style={{verticalAlign: 'middle'}} data-tip="Horse Power" width="70" height="50" src = "https://www.fcausfleet.com/content/dam/fca-fleet/na/fleet/en_us/why-fca-fleet/blurbrailicon/FCA-SDP_icons_Horsepower.png.fleetimage.1440.png"/>
                    <ReactTooltip />
                    <span style = {cardSectionFont}>= {this.state.car_details[2].HP_value}</span>
                    <span style = {{fontSize: '10px', fontFamily: 'futura'}}>HP</span>
                  </div>

                </div>
                <div style = {cardSectionStyle}>
                  <div style ={{marginRight: '10px'}}>
                    <i data-tip="Fuel Consumption (Combined)/City/Highway" className="material-icons" style = {{fontSize: '70px', verticalAlign: 'middle'}}>local_gas_station</i>
                    <span style = {{fontSize: '30px', fontFamily: 'futura'}}>= {this.state.car_details[2]['FE-L100K-CMB']}
                      <span style = {{fontSize: '10px', fontFamily: 'futura'}}>L/100KM</span>
                    </span>
                    <ReactTooltip/>
                  </div>
                </div>
                <div style = {{textAlign: 'center', paddingTop: '10px'}}>
                </div>
              </div>
            </CardText>
            <CardActions actAsExpander={true}>
              <div style = {{textAlign: 'center'}}>
                {!this.state.thirdCardExpand && <Icon name = 'chevron down' size="large"/>}
                {this.state.thirdCardExpand && <Icon name = 'chevron up' size="large"/>}
              </div>
            </CardActions>

            <CardText expandable={true}>
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Specification</TableHeaderColumn>
                    <TableHeaderColumn>Units</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn>Torque</TableRowColumn>
                    <TableRowColumn>{this.state.car_details[2].Torque_value}</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
              <div style = {{'textAlign': 'center'}}>
                <RaisedButton label="More Details" primary={true} onClick={()=>{window.open(this.state.car_details[2].details)}}/>
              </div>
            </CardText>
          </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      )
    }

    render() {
        return (
          <div>
            <Navbar selectedIndex={1}/>
            <div style = {{marginTop: '-5px', height: '1300px'}}>
            <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='slide along' visible={true} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                Main
              </Menu.Item>

              <Menu.Item name='plus'>
                <Icon name='plus' />
                Start a Run
              </Menu.Item>

              <Menu.Item>
              Recommendation History
                <Menu.Menu>
                  <Menu.Item id="1" name='run1' onClick={this.handleClick}>
                  <div style = {runIconStyle}>
                    <Icon name='asterisk' />
                  </div>
                  Run 1
                  </Menu.Item>
                  <Menu.Item id="2" name='run2' onClick={this.handleClick}>
                  <div style = {runIconStyle}>
                    <Icon name='asterisk' />
                  </div>
                  Run 2
                  </Menu.Item>
                  <Menu.Item id="3" name='run3' onClick={this.handleClick}>
                  <div style = {runIconStyle}>
                    <Icon name='asterisk' />
                  </div>
                  Run 3
                  </Menu.Item>
                </Menu.Menu>
              </Menu.Item>
            </Sidebar>
              {this.renderContentLayout()}
          </Sidebar.Pushable>
          </div>
          </div>
        )
    }
}

PortalView.contextTypes = {
    router: React.PropTypes.object.isRequired
}

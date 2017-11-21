import React from 'react';
import { Sidebar, Segment, Button, Menu, Image, Grid, Icon, Header } from 'semantic-ui-react'
import Navbar from '../components/Navbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import * as d3 from "d3";
import {LineChart} from 'react-d3-basic'
import ReactTooltip from 'react-tooltip';

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
  fontFamily: 'futura'
}

export default class PortalView extends React.Component {

    constructor() {
      super();

      this.state = {
        runId: 1,
        firstCardExpand: false,
        secondCardExpand: false
      }

      this.handleClick = (evt, data) => {
        this.setState({runId: data.id})
      }

      this.onSecondCardExpand = (expand) => {
        this.setState({secondCardExpand: expand})
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

      var width = 500,
        height = 300,
        margins = {left: 50, right: 130, top: 20, bottom: 50},
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
        <Segment basic>
        <Header as='h3'>Recommendations & Comparison for Run: {this.state.runId}</Header>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column width={4} className="recommendation-panel-height">
              <Card onExpandChange={this.onFirstCardExpand}>
                <CardMedia>
                  <img src="http://www.chevrolet.ca/content/dam/Chevrolet/northamerica/ca/nscwebsite/en/home/vehicles/performance/2018_camaro/01_images/intro/ca-2018-chevrolet-camaro-sports-car-mo-masthead-1480x551-01.jpg" alt="" />
                </CardMedia>
                <CardTitle title="2018 Chevrolet Camaro ZL1 2 Door Coupe RWD ZL1"/>
                <CardText>
                  <div style = {cardSectionStyle}>
                    <Icon data-tip="Rating" name='star' size="huge">
                    <ReactTooltip />
                    </Icon>
                    <span style = {cardSectionFont}>= 7/10 </span>
                  </div>
                  <div style = {cardSectionStyle}>
                    <Icon name='dollar' size="huge" data-tip="Budget Price" />
                    <ReactTooltip />
                    <span style = {cardSectionFont}>= $80,000 </span>
                  </div>
                  <div style = {cardSectionStyle}>
                    <Icon name='car' size="huge" data-tip="Horse Power" />
                    <ReactTooltip />
                    <span style = {cardSectionFont}>= 650W </span>
                  </div>
                  <div style = {cardSectionStyle}>
                    <Icon name='industry' size="huge" data-tip="Fuel Consumption Rating" />
                    <span style = {cardSectionFont}>= 50L </span>
                    <ReactTooltip/>
                  </div>
                  <div style = {{textAlign: 'center', paddingTop: '10px'}}>
                    <span style = {{fontFamily: 'futura', fontSize: '20px'}}>Fuel Consumption Over Time </span>
                    <LineChart
                      margins= {margins}
                      data={chartDataCamaro}
                      width={width}
                      height={height}
                      chartSeries={chartSeries}
                      x={x}
                      xScale={xScale}
                    />
                  </div>
                </CardText>

                <CardActions actAsExpander={true}>
                  <div style = {{textAlign: 'center'}}>
                    {!this.state.firstCardExpand && <Icon name = 'chevron down' size="large"/>}
                    {this.state.firstCardExpand && <Icon name = 'chevron up' size="large"/>}
                  </div>
                </CardActions>

                <CardText expandable={true}>
                  <div style = {{textAlign: 'center'}}>
                    More Specifications Here
                  </div>
                </CardText>

              </Card>
            </Grid.Column>
            <Grid.Column width={4} className="recommendation-panel-height">
            <Card onExpandChange={this.onSecondCardExpand}>
              <CardMedia>
                <img src="http://www.chevrolet.ca/content/dam/Chevrolet/northamerica/ca/nscwebsite/en/home/vehicles/cars/2017_malibu/01_images/ca-2017-chevrolet-malibu-mid-size-sedan-mo-01_perspective_img_1.jpg" alt="" />
              </CardMedia>
              <CardTitle title="2017 Cheverolet Malibu 4 Door Sedan ZL1">
              </CardTitle>
              <CardText>
                <div style = {cardSectionStyle}>
                  <Icon data-tip="Rating" name='star' size="huge">
                  <ReactTooltip />
                  </Icon>
                  <span style = {cardSectionFont}>= 6.5/10 </span>
                </div>
                <div style = {cardSectionStyle}>
                  <Icon name='dollar' size="huge" data-tip="Budget Price" />
                  <ReactTooltip />
                  <span style = {cardSectionFont}>= $60,000 </span>
                </div>
                <div style = {cardSectionStyle}>
                  <Icon name='car' size="huge" data-tip="Horse Power" />
                  <ReactTooltip />
                  <span style = {cardSectionFont}>= 450W </span>
                </div>
                <div style = {cardSectionStyle}>
                  <Icon name='industry' size="huge" data-tip="Fuel Consumption Rating" />
                  <span style = {cardSectionFont}>= 20L </span>
                  <ReactTooltip/>
                </div>
                <div style = {{textAlign: 'center', paddingTop: '10px'}}>
                <span style = {{fontFamily: 'futura', fontSize: '20px'}}>Fuel Consumption Over Time </span>
                <LineChart
                  margins= {margins}
                  data={chartDataMalibu}
                  width={width}
                  height={height}
                  chartSeries={chartSeries}
                  x={x}
                  xScale={xScale}
                />
                </div>
              </CardText>

              <CardActions actAsExpander={true}>
                <div style = {{textAlign: 'center'}}>
                  {!this.state.secondCardExpand && <Icon name = 'chevron down' size="large"/>}
                  {this.state.secondCardExpand && <Icon name = 'chevron up' size="large"/>}
                </div>
              </CardActions>

              <CardText expandable={true}>
                <div>
                <Table>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn>Specification</TableHeaderColumn>
                      <TableHeaderColumn>Units</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn># of Doors</TableRowColumn>
                      <TableRowColumn>4</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                </div>
              </CardText>
            </Card>
            </Grid.Column>
            <Grid.Column className="recommendation-panel-height">
              <Image src='/assets/images/wireframe/media-paragraph.png' />
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
            <Sidebar as={Menu} animation='slide along' width='wide' visible={true} icon='labeled' vertical inverted>
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
            <Sidebar.Pusher>
              {this.renderContentLayout()}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          </div>
          </div>
        )
    }
}

PortalView.contextTypes = {
    router: React.PropTypes.object.isRequired
}

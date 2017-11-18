import React from 'react';
import { Sidebar, Segment, Button, Menu, Image, Grid, Icon, Header } from 'semantic-ui-react'
import Navbar from '../components/Navbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class PortalView extends React.Component {

    constructor() {
      super();

      this.handleClick = (evt) => {
        console.log('hi');
      }
    }

    render() {
        return (
          <div>
            <Navbar selectedIndex={1}/>
            <div style = {{marginTop: '-5px', height: '900px'}}>
            <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='slide along' width='wide' visible={true} icon='labeled' vertical inverted>
              <Menu.Item name='home' onClick={this.handleClick}>
                <Icon name='home' />
                Main
              </Menu.Item>
              <Menu.Item name='star' onClick={this.handleClick}>
                <Icon name='star' />
                Recommendation History
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <Grid.Column  width={4} className="recommendation-panel-height">
                      Recommendation 1
                      <Card>
                        <CardHeader
                          title="URL Avatar"
                          subtitle="Subtitle"
                          avatar="images/jsa-128.jpg"
                        />
                        <CardMedia
                          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                        >
                          <img src="https://www.bmw.ca/content/dam/bmw/marketCA/bmw_ca/en_CA/M550i_1680.jpg/_jcr_content/renditions/cq5dam.resized.img.1680.large.time1501266489469.jpg" alt="" />
                        </CardMedia>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                        <CardText>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>
                        <CardActions>
                          <FlatButton label="Action1" />
                          <FlatButton label="Action2" />
                        </CardActions>
                      </Card>
                    </Grid.Column>
                    <Grid.Column className="recommendation-panel-height">
                      <Image src='/assets/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column className="recommendation-panel-height">
                      <Image src='/assets/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Image src='/assets/images/wireframe/paragraph.png' />
              </Segment>
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

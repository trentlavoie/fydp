import React from 'react';
import { Sidebar, Segment, Button, Menu, Image, Grid, Icon, Header } from 'semantic-ui-react'
import Navbar from '../components/Navbar';

export default class PortalView extends React.Component {

    constructor() {
      super();

      this.handleClick = (evt) => {
        console.log('hi', evt)
      }
    }

    render() {
        return (
          <div>
            <Navbar/>
            <div style = {{marginTop: '-5px', height: '900px'}}>
            <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='slide along' width='thin' visible={true} icon='labeled' vertical inverted>
              <Menu.Item name='home' onClick={this.handleClick}>
                <Icon name='home' />
                Home
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as='h3'>Application Content</Header>
                <Grid columns={3} divided>
                  <Grid.Row>
                    <Grid.Column>
                      Hi
                      <Image src='/assets/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
                      <Image src='/assets/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column>
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

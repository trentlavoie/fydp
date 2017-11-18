import React from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
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
          <div style = {{height: '800px'}}>
            <Navbar/>
            <div style = {{height: '900px'}}>
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
                <div className="ui three column grid">
                <div className="column">
                  <div>
                    Hi
                  </div>
                </div>
                <div className="column">
                  <div>
                    Testing
                  </div>
                </div>
                <div className="column">
                  <div>
                    Stuff
                  </div>
                </div>
              </div>
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

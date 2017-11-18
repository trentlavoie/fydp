import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Navbar extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        selectedIndex: this.props.selectedIndex || 0
      }

      this.onTabChange = (value) => {
        if (value === 1) {
          this.context.router.push('/portal');
        } else if (value === 0) {
          this.context.router.push('/');
        } else if (value === 2) {
          this.context.router.push('/recommend');
        }
      }
    }

    render() {
        return (
          <AppBar iconElementLeft={
            <div style = {{width: '500px'}}>
            <div style = {{position: 'relative', top: '5px', left: '10px', height: '1px'}}>
              <FontIcon className="material-icons" style = {{fontSize: '40px'}}>map</FontIcon>
            </div>

            <div style = {{marginLeft: '70px'}}>
              <Tabs value ={this.state.selectedIndex} onChange={this.onTabChange}>
                <Tab label="Home" value = {0}/>
                <Tab label="Portal" value = {1}/>
                <Tab label="Survey" value = {2}/>
              </Tabs>
            </div>
            </div>
          }>
          <div style = {{width: '90px', marginTop: '7px'}}>
            <Avatar style={{marginTop: '2px'}} src='https://ih1.redbubble.net/image.195485388.5310/flat,800x800,075,f.jpg' />
            <IconMenu
              style = {{float: 'right'}}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Account Settings" leftIcon={<FontIcon className="material-icons">settings</FontIcon>} />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          </div>

          </AppBar>
        )
    }
}

Navbar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

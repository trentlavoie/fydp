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

        if (value === 0) {
          this.context.router.push('/');
        } else if (value === 1) {
          this.context.router.push('/recommend');
        }
      }
    }

    render() {
        return (
          <AppBar iconElementLeft={
            <div style = {{width: '500px'}}>
            <div style = {{position: 'relative', top: '5px', left: '10px', height: '1px'}}>
              <img src = "images/white_project_vantage_logo.png" width="40" height="30"/>
            </div>

            <div style = {{marginLeft: '70px'}}>
              <Tabs value ={this.state.selectedIndex} onChange={this.onTabChange}>
                <Tab label="Home" value = {0}/>
                <Tab label="Survey" value = {1}/>
              </Tabs>
            </div>
            </div>
          }>
          <div style = {{width: '90px', marginTop: '7px'}}>
            <Avatar style={{marginTop: '2px'}} src='' />
            <IconMenu
              style = {{float: 'right'}}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Account Settings" leftIcon={<FontIcon className="material-icons">settings</FontIcon>} />
              <MenuItem primaryText="Help" leftIcon={<FontIcon className="material-icons">backup</FontIcon>} />
              <MenuItem primaryText="Sign out" leftIcon={<FontIcon className="material-icons">power_settings_new</FontIcon>} />
            </IconMenu>
          </div>

          </AppBar>
        )
    }
}

Navbar.contextTypes = {
    router: React.PropTypes.object.isRequired
}

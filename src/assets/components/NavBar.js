import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';

export default class Home extends React.Component {

    constructor() {
    	super()
    }

    render() {
        return (
          <AppBar
            iconElementRight={
              <div style = {{width: '90px'}}>
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
            }
          />
        )
    }
}

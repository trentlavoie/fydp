import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Button } from 'semantic-ui-react';

const backgroundImage = 'https://images.pexels.com/photos/163848/road-mountains-sunset-path-163848.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
const style = {
  margin: 12,
};

const backgroundStyle = {
  background: `url(${backgroundImage}) no-repeat`,
  height: '1000px',
  display: 'flex',
  justifyContent: 'center',
  backgroundSize: 'cover'
}

export default class Home extends React.Component {

    render() {
        return (
          <div>
            <Navbar/>
            <div style = {backgroundStyle}>
              <span style = {{color: 'white', fontSize: '80px', fontFamily: 'futura', marginTop: '120px', position: 'absolute'}}>Vantage</span>
              <span style = {{color: 'white', fontSize: '40px', fontFamily: 'futura', marginTop: '190px', position: 'absolute'}}>Like what you drive.</span>
              <div style = {{alignSelf: 'center'}}>
                <Button size="massive" color='teal' onClick={()=>{this.context.router.push('/recommend')}}>
                  Let&#39;s get started
                  <FontIcon className="material-icons" style = {{ color: 'white', fontSize: '16px'}}>keyboard_arrow_right</FontIcon>
                  <FontIcon className="material-icons" style = {{ marginLeft: '-10px', color: 'white', fontSize: '16px'}}>keyboard_arrow_right</FontIcon>
                  </Button>
              </div>
            </div>
          </div>
        )
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
}

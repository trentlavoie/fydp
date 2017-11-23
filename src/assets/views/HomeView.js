import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';

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
              <div style = {{alignSelf: 'center'}}>
                <RaisedButton label="Click here to get started with your recommendation" secondary={true} style={style} onClick={()=>{this.context.router.push('/recommend');}}/>
              </div>
            </div>
          </div>
        )
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
}

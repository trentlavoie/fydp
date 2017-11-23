import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';
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
              <span style = {{fontSize: '80px', fontFamily: 'futura', marginTop: '120px', position: 'absolute'}}>Vantage</span>
              <span style = {{fontSize: '40px', fontFamily: 'futura', marginTop: '190px', position: 'absolute'}}>The Ultimate Car Recommendation Engine</span>
              <div style = {{alignSelf: 'center'}}>
                <Button size="huge" color='teal' onClick={()=>{this.context.router.push('/recommend')}}>Click here to get started with your recommendation</Button>
              </div>
            </div>
          </div>
        )
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
}

import React from 'react';
import Navbar from '../components/Navbar';
import RaisedButton from 'material-ui/RaisedButton';

const backgroundImage = 'https://i.stack.imgur.com/jRLAt.png';
const style = {
  margin: 12,
};

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  height: '800px',
  display: 'flex',
  justifyContent: 'center'
}

export default class Home extends React.Component {

    constructor() {
    	super()
    }

    render() {
        return (
          <div>
            <Navbar/>
            <div style = {backgroundStyle}>
              <div style = {{alignSelf: 'center'}}>
                <RaisedButton label="Click here to get started with your recommendation" secondary={true} style={style} />
              </div>
            </div>
          </div>
        )
    }
}

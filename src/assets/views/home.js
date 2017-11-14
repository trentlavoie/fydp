import React from 'react';
import Navbar from '../components/Navbar';

export default class Home extends React.Component {

    constructor() {
    	super()
    }

    render() {
        return (
          <div>
            <Navbar/>
            Home
          </div>
        )
    }
}

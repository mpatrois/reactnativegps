import React, { Component } from 'react';
import { Text } from 'react-native';

class InfoScreen extends Component {

    shouldComponentUpdate() {
      return false;
    }
  
    render() {
      return <Text>Info</Text>
    }
  
  }

export default InfoScreen;
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { AsyncStorage } from "react-native"

class NewPosition extends Component {
    static navigationOptions = {
        title: 'Ajouter une position',
    };
    constructor(props){
        super(props)
        // this.state.text = '';
        
        this.state = {
            text:'',
            crd:null,
        }

        var options = {
            enableHighAccuracy: false,
            timeout: 1000,
            maximumAge: 0
        };
            
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
            
        navigator.geolocation.getCurrentPosition((pos)=>{
            var crd = pos.coords;
            console.log(crd);
            // console.log('Your current position is:');
            // console.log(`Latitude : ${crd.latitude}`);
            // console.log(`Longitude: ${crd.longitude}`);
            // console.log(`More or less ${crd.accuracy} meters.`);
            this.setState({
                crd:crd
            })
        }, error, options);
        this.storePosition = this.storePosition.bind(this)

    }

    async storePosition(){
        // console.log('test')
        AsyncStorage.getItem('positions').then((positions)=>{
            // const positions = await AsyncStorage.getItem('positions');
            if (positions == null) {
                positions = []
            } else {
                positions = JSON.parse(positions)
            }
            positions.push({
                'text' : this.state.text,
                'crd': this.state.crd
            })
            AsyncStorage.setItem('positions', JSON.stringify(positions));
            console.log(positions)
        })

        // try {
        //     const positions = await AsyncStorage.getItem('positions');
        //     if (positions == null) {
        //         positions = []
        //     }
        //     positions.push({
        //         'text' : this.state.text,
        //         'crd': this.state.crd
        //     })
        //     console.log(positions);
        //     try {
        //         await AsyncStorage.setItem('postitions', positions);
        //       } catch (error) {
        //         // Error saving data
        //       }

        // } catch (error) {
        //     // Error retrieving data
        // }
    }

    render() {
        const { navigate } = this.props.navigation;
        return  (     
        <View>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
            <Button
                title="Submit"
                onPress={() => 
                // navigate('Infos', { name: 'Jane' })
                    this.storePosition()
                }
            ></Button>
            <Button
                title="Go to Historique"
                onPress={() =>
                navigate('Historique', { name: 'Jane' })
                }
            ></Button>
        </View>
        )
    }
  
  }

export default NewPosition;
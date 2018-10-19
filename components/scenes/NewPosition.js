import React, { Component } from 'react';
import { View, Button, TextInput, TouchableOpacity, Text } from 'react-native';
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
            
        // navigator.geolocation.getCurrentPosition((pos)=>{
        //     var crd = pos.coords;
        //     console.log(crd);
        //     this.setState({
        //         crd:crd
        //     })
        // }, error, options);
        this.storePosition = this.storePosition.bind(this)

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            var crd = position.coords;
            console.log(crd);
            this.setState({
                crd:crd
            })
          }
        );
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
    }

    render() {
        const { navigate } = this.props.navigation;
        return  ( 
            <View style={{height: '100%', justifyContent: "space-between"}}>
                <View >
                    {
                        this.state.crd !== null ? (
                            <View>
                                <Text>La latitude est : {this.state.crd.latitude }</Text>
                                <Text>La longitude est : {this.state.crd.longitude }</Text>
                            </View>
                        ) : null
                    
                    }
                    <Text>La position est : longitude de {this.state.crd !== null ? this.state.crd.longitude : null} et latitude de {this.state.crd !== null ? this.state.crd.latitude : null}</Text>
                    <TextInput
                        style={{height: 250, borderColor: 'gray', borderWidth: 1, padding: 15, margin: 15, borderRadius: 8}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        multiline = {true}
                    />
                    <Button
                        title="Submit"
                        containerStyle={{ marginBottom: 100 }}
                        onPress={() => 
                            this.storePosition()
                        }
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent:"space-between"}}>
                    <View style={{width: '45%', alignItems: 'center', backgroundColor: 'powderblue', padding: 15}}>
                        <TouchableOpacity
                            onPress={() => 
                                this.storePosition()
                            }
                        >
                            <Text>New</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '45%', alignItems: 'center', backgroundColor: 'purple', padding: 15}}>
                       <TouchableOpacity
                            onPress={() =>
                                navigate('Historique', { name: 'Jane' })
                            }
                        >
                            <Text style={{color: 'white'}}>Go to Historique</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
  
  }

export default NewPosition;
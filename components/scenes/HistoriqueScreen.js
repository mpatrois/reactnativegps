import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AsyncStorage } from "react-native"
class HistoriqueScreen extends Component {
  
    static navigationOptions = {
        title: 'Historique',
    };

    constructor(props){
        super(props)
        
        this.state = {
            positions:[]
        }

        this.getPositions().then((positions)=>{
            if(positions!=null){
                this.setState({
                    positions: JSON.parse(positions)
                })
            }
        })

        this.getPositions = this.getPositions.bind(this)
        
    }

    async getPositions(){
        return AsyncStorage.getItem('positions');
    }

    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View>
                {this.state.positions.map(function(position, index){
                    return <View>
                        {
                            position.crd !== null ?
                            <Text key={ index }>{position.crd.latitude}
                            </Text> : null
                        }
                        <Text key={ index }>{position.text}
                        </Text>
                    </View>;
                })}
            </View>
        );
    }
}
  export default HistoriqueScreen;
import React from 'react';
import { StyleSheet, Text, View, Header, Button, AsyncStorage, TouchableOpacity,} from 'react-native';
import Timeline from '../../extensions/timeline';

export default class Path extends React.Component {

    constructor(){
        super()
        this.state = {
            ready: false,
        }
        //ist das JSON Format
    }

    componentWillMount() {
        this.getToken(); 
    }

    calcNextAppo() {
        return "20";
    }

    getToken = async () => {

        const token = await AsyncStorage.getItem('token');
        this.getAppo(token);

    }

    getAppo = (tok) => {

        fetch('http://147.87.116.42:54321/appointment/full', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'patid': '1',
                'token': tok,
            },
         })
        .then((response) => response.json())
        .then ((res) => {
            console.log(res);
            this.newData = res;
            this.setState ({ ready: true });
        })
        .done(); 

    }

    render() {
        if (!this.state.ready) {
            return null
        } else {       
            return (
                <View style={styles.container}>
                    <Text style={styles.text}> Ihr Ablauf ist wie folgt: </Text>
                    <View style={styles.pathCont}>

                        <Timeline 
                        style={styles.list}
                        data={this.newData}
                        circleSize={20}
                        circleColor='rgb(0,0,139)'
                        lineColor='rgb(0,0,139)'
                        descriptionStyle={{color:'gray'}}
                        showTime={false}
                        options={{
                            style:{paddingTop:0}
                        }}
                        innerCircle={'dot'}
                        />
                        
                    </View>
                    <Text style={styles.text}> Noch {this.calcNextAppo()} Tage bis zum nächsten Termin.</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        color: '#000',
    },
    pathCont: {
        flex: 1,
        padding: 20,
        paddingTop:15,
        backgroundColor:'white'
      },
      list: {
        flex: 1,
        marginTop:20,
      },
      btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
    },
});


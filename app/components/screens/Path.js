import React from 'react';
import { StyleSheet, Text, View, Header, Button, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import Timeline from '../../extensions/timeline';
import { convertTime } from '../helper';
import { returnToken } from '../auth';

export default class Path extends React.Component {

    constructor(){
        super()
        this.state = {
            ready: false,
         }
    }

    componentWillMount() {
        returnToken().then((token) => {
            this.getAppo(token);
        });
    }

    calcNextAppo = () => {
        
        let closestDate = '';
        var currentDate = new Date();
        let tempCloseMs = 999999999999999;
        var one_day = 1000*60*60*24;

        for(let aid of this.newData) {
            //console.log("aid: " + aid.startdate);
            var tempDate = new Date(aid.startdate);
            
            if(tempDate.getTime() > currentDate) {
                var diff = tempDate.getTime() - currentDate.getTime();
                if (diff < tempCloseMs) {
                    tempCloseMs = diff;
                }
            }
        }
        //console.log("closest ms: " + tempCloseMs);
        //console.log("in days: " + Math.ceil(tempCloseMs / one_day));
        return Math.ceil(tempCloseMs / one_day);
    }

    checkDates = () => {
        for(let aid of this.newData) {
            if(aid.modified === true) {
                Alert.alert(
                    'Achtung Datumswechsel!',
                    'Das Datum für den Termin "' + aid.name + '" hat auf das Datum ' + convertTime(aid.startdate) + ' gewechselt.',
                    [
                      {text: 'Später', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Verstanden', onPress: () => returnToken().then((token) => { this.setModifiedFalse(token, aid.aid)})},
                    ],
                    { cancelable: false }
                  )
            }
        }
    }

    setModifiedFalse = (token, aid) => {

        fetch('http://147.87.117.66:1234/appointment/'+aid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body: JSON.stringify({
                        'modified': 'false'
                })
        })
        .then((response) => response.json())
        .then ((res) => {
        })
        .done(); 
    }

    myCallback = (dataFromChild) => {
        this.props.navigation.navigate('Termin', {dataFromChild});
    }

    getAppo = (tok) => {

            fetch('http://147.87.117.66:1234/appointment/full', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': tok,
                },
            })
            .then((response) => response.json())
            .then ((res) => {
                console.log("Daten geholt!");
                this.newData = res;
                this.setState ({ ready: true });
                this.checkDates();
            })
            .done();
    }

    render() {
        if (!this.state.ready) {
            return null;
        } else {       
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTxt}> Ihr Ablauf ist wie folgt: </Text>
                    </View>

                    <View style={styles.pathCont}>
                        <Timeline 
                        navigation={this.props.navigation}
                        callbackFromParent={this.myCallback}
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

                    <View style={styles.bottom}>
                        <Text style={styles.bottomTxt}> Noch {this.calcNextAppo()} Tage bis zum nächsten Termin.</Text>
                    </View>
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
    },
    header: {
        justifyContent :'center',
        alignItems:'center',
        paddingVertical: 15,
     },
    headerTxt: {
        fontSize:18,
    },
    bottom: {
        justifyContent :'center',
        alignItems:'center',
        paddingVertical: 20,
        borderTopColor: 'black',
        borderTopWidth: 1,
    },
    bottomTxt: {
        fontSize:18,
    },
});


import React from 'react';
import { StyleSheet, Text, View, Header, Button, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import Timeline from '../../extensions/timeline';

var appDates = [];

export default class Path extends React.Component {

    constructor(){
        super()
        this.state = {
            ready: false,
            fetched: false,
         }
    }

    componentWillMount() {
        this.getToken();
    }

    calcNextAppo = () => {
        this.checkDates();

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

    convertTime(dateString) {
        let day,month,year,hour,minute;
        
        year = dateString.slice(0,4);
        month = dateString.slice(5,7);
        day = dateString.slice(8,10);
        hour = dateString.slice(11,13);
        minute = dateString.slice(14,16);
        
        return day + "." + month + "." + year + " " + hour + ":" + minute;
    }

    checkDates = () => {
        for(let aid of this.newData) {
            if(aid.modified === true) {
                Alert.alert(
                    'Achtung Datumswechsel!',
                    'Das Datum für den Termin "' + aid.name + '" hat auf das Datum ' + this.convertTime(aid.startdate) + ' gewechselt.',
                    [
                      {text: 'Später', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Verstanden', onPress: () => console.log('ok pressed')},
                    ],
                    { cancelable: false }
                  )
            }
        }
    }

    getToken() {
        AsyncStorage.getItem("token").then((token) => {
            this.getAppo(token);
        })
    }

    myCallback = (dataFromChild) => {
        this.props.navigation.navigate('Appointment', {dataFromChild});
    }

    getAppo = (tok) => {

            fetch('http://147.87.116.42:54321/appointment/full', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': tok,
                },
            })
            .then((response) => response.json())
            .then ((res) => {
                console.log(res);
                //console.log("Daten geholt!");
                this.newData = res;
                this.setState ({ ready: true });
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


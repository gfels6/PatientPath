import React from 'react';
import { StyleSheet, Text, View, Header, Button, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import Timeline from '../../extensions/timeline';
import { convertTime } from '../helper';
import { returnToken } from '../auth';

export default class Path extends React.Component {
    /* author: gfels6
    ** View für die Pfadansicht
    */

    constructor(){
        super()
        this.state = {
            ready: false,
         }
    }

    // Direkter Aufruf bevor Rendering
    componentWillMount() {
        returnToken().then((token) => {
            this.getAppointment(token);
        });
    }

    // Berechnung der Anzahl Tage bis zum nächsten Termin
    // Ist noch nicht ganz korrekt, da ein Runden geschieht.
    calcNextAppo = () => {
        
        let closestDate = '';
        var currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        let tempCloseMs = 999999999999999;
        var one_day = 1000*60*60*24;

        for(let aid of this.newData) {
            var tempDate = new Date(aid.startdate);
            tempDate.setHours((tempDate.getTimezoneOffset()/-60),0,0,0);
            //console.log(tempDate);
            
            if(tempDate.getTime() > currentDate.getTime()) {
                var diff = tempDate.getTime() - currentDate.getTime();
                if (diff < tempCloseMs) {
                    tempCloseMs = diff;
                }
            }
        }
        //console.log("closest ms: " + tempCloseMs);
        //console.log("in days: " + Math.ceil(tempCloseMs / one_day));
        return Math.round(tempCloseMs / one_day);
    }

    // Alle Termine werden auf Änderungen getestet.
    // modified & olddate !== null   >>  Neuer Termin
    // modified & olddate === null   >>  Terminwechsel
    // modified & canceled == true   >>  Termin gecanceled
    checkDates = () => {
        for(let aid of this.newData) {
            if(aid.modified === true && aid.olddate !== null) {
                Alert.alert(
                    'Achtung Datumswechsel!',
                    'Das Datum für den Termin "' + aid.name + '" hat vom ' + convertTime(aid.olddate) + ' auf das Datum ' + convertTime(aid.startdate) + ' gewechselt.',
                    [
                      {text: 'Später', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Verstanden', onPress: () => returnToken().then((token) => { this.setModifiedFalse(token, aid.aid)})},
                    ],
                    { cancelable: false }
                  )
            } else if(aid.modified === true && aid.olddate === null) {
                Alert.alert(
                    'Achtung neuer Termin!',
                    'Es wurde ein neuer Termin "' + aid.name + '" für den ' + convertTime(aid.startdate) + ' erfasst.',
                    [
                      {text: 'Später', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Verstanden', onPress: () => returnToken().then((token) => { this.setModifiedFalse(token, aid.aid)})},
                    ],
                    { cancelable: false }
                )
            } else if(aid.modified === true && aid.deleted === true) {
                Alert.alert(
                    'Achtung Terminlöschung!',
                    'Der Termin "' + aid.name + '" am ' + convertTime(aid.startdate) + ' wurde gelöscht.',
                    [
                      {text: 'Später', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'Verstanden', onPress: () => returnToken().then((token) => { this.setModifiedFalse(token, aid.aid)})},
                    ],
                    { cancelable: false }
                )
            }
        }
    }

    // Setzen des Modified flag auf false
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

    // Callback von timeline.js zur Übergabe von allen Terminen
    myCallback = (dataFromChild) => {
        this.props.navigation.navigate('Termin', {dataFromChild});
    }

    // Get von allen Appointments zu dieser Person
    getAppointment = (token) => {

            fetch('http://147.87.117.66:1234/appointment/full', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
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

    // Wird erst gerendert nach dem getAppointment Fetch
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


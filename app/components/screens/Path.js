import React from 'react';
import { StyleSheet, Text, View, Header, Button, AsyncStorage, TouchableOpacity,} from 'react-native';
import Timeline from 'react-native-timeline-listview';

export default class Path extends React.Component {

    constructor(){
        super()
        this.state = {
            ready: false,
        }
        //ist das JSON Format
        this.appointments = [
            {
                aid: 2,
                name: "Untersuchung Hausarzt",
                description: "Untersuchung wegen starken Hüftschmerzen",
                startdate: "2018-06-05T08:00:00.000Z",
                enddate: "2018-06-05T08:45:00.000Z",
                patid: 1,
                instid: 1,
                practid: null,
                episodeid: 1,
                chklstid: null,
                createdAt: "2018-03-30T14:24:24.000Z",
                updatedAt: "2018-03-30T16:54:56.000Z"
            },
            {
                aid: 2,
                name: "Radiologiecenter",
                description: "MRI der Hüfte",
                startdate: "2018-06-05T08:00:00.000Z",
                enddate: "2018-06-05T08:45:00.000Z",
                patid: 1,
                instid: 1,
                practid: null,
                episodeid: 1,
                chklstid: null,
                createdAt: "2018-03-30T14:24:24.000Z",
                updatedAt: "2018-03-30T16:54:56.000Z"
            },
            {
                aid: 2,
                name: "Untersuchung Hüftspezialist",
                description: "Abklärungen Operation",
                startdate: "2018-06-05T08:00:00.000Z",
                enddate: "2018-06-05T08:45:00.000Z",
                patid: 1,
                instid: 1,
                practid: null,
                episodeid: 1,
                chklstid: null,
                createdAt: "2018-03-30T14:24:24.000Z",
                updatedAt: "2018-03-30T16:54:56.000Z"
            },
            {
                aid: 2,
                name: "Spitaleintritt",
                description: "",
                startdate: "2018-06-05T08:00:00.000Z",
                enddate: "2018-06-05T08:45:00.000Z",
                patid: 1,
                instid: 1,
                practid: null,
                episodeid: 1,
                chklstid: null,
                createdAt: "2018-03-30T14:24:24.000Z",
                updatedAt: "2018-03-30T16:54:56.000Z"
            }
        ]
    }

    componentWillMount() {
        this.getToken(); 
    }

    getToken = async () => {

        const token = await AsyncStorage.getItem('token');
        this.getAppo(token);

    }

    getAppo = (tok) => {

        fetch('http://147.87.116.42:54321/appointment', {
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
                        timeContainerStyle={{minWidth:52, marginTop: -5}}
                        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                        descriptionStyle={{color:'gray'}}
                        showTime={false}
                        options={{
                            style:{paddingTop:0}
                        }}
                        innerCircle={'dot'}
                        />
                        
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
        marginTop:20,
      },
      btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
    },
});


import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Timeline from 'react-native-timeline-listview'

export default class Path extends React.Component {

    constructor(){
        super()
        this.data = [
          {time: '09:00', title: 'Hausarzt', description: ''},
          {time: '10:45', title: 'Radiologiecenter', description: ''},
          {time: '12:00', title: 'Spezialist', description: ''},
          {time: '14:00', title: 'Spitaleintritt', description: ''},
          {time: '16:30', title: 'Spitalaustritt', description: ''}
        ]
      } 

    render() {
    return (
            <View style={styles.container}>
                <Text style={styles.text}> Ihr Ablauf ist wie folgt: </Text>
                <View style={styles.pathCont}>

                    <Timeline 
                    style={styles.list}
                    data={this.data}
                    circleSize={20}
                    circleColor='rgb(0,0,139)'
                    lineColor='rgb(0,0,139)'
                    timeContainerStyle={{minWidth:52, marginTop: -5}}
                    timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                    descriptionStyle={{color:'gray'}}
                    showTime={false}
                    options={{
                        style:{paddingTop:5}
                    }}
                    innerCircle={'dot'}
                    />
                    
                </View>
            </View>
    );
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
});


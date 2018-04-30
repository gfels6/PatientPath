import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Appointment extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: () => null
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

    render() {
    
    const {params} = this.props.navigation.state;
    console.log("works? " + params.dataFromChild.aid);

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}> {params.dataFromChild.name}</Text>
                </View>

                <View style={styles.appData}>
                    <Text style={styles.text}> Beschreibung: {params.dataFromChild.description}</Text>
                    <Text style={styles.text}> Startdatum: {this.convertTime(params.dataFromChild.startdate)}</Text>
                    <Text style={styles.text}> Enddatum: {this.convertTime(params.dataFromChild.enddate)}</Text>
                </View>

                <View style={styles.practicioner}>
                    <Text style={styles.head}> Fachperson </Text>
                    <Text style={styles.text}> Rolle: {params.dataFromChild.practicioner.role}</Text>
                    <Text style={styles.text}> Name: {params.dataFromChild.practicioner.title} {params.dataFromChild.practicioner.firstname} {params.dataFromChild.practicioner.lastname}</Text>
                    <Text style={styles.text}> Email: {params.dataFromChild.practicioner.email}</Text>
                </View>

                <View style={styles.institution}>
                    <Text style={styles.head}> Institution </Text>
                    <Text style={styles.text}> Name: {params.dataFromChild.institution.name}</Text>
                    <Text style={styles.text}> Adresse: {params.dataFromChild.institution.address} </Text>
                    <Text style={styles.text}> Telefon: {params.dataFromChild.institution.phone}</Text>
                </View>

                <View style={styles.buttonCont}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            alert("Noch nicht implementiert! :(")
                        }}>
                        <Text style={styles.buttonText}>Termin verschieben</Text>
                    </TouchableOpacity>
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
    title: {
        fontSize:16,
        fontWeight: "bold",
    },
    header: {
        justifyContent :'center',
        alignItems:'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    appData: {

    },
    practicioner: {
        marginVertical: 20,
    },
    institution: {
        
    },
    buttonCont: {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
      },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    }
});
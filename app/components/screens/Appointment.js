import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { returnToken } from '../auth';
import { convertTime } from '../helper';

export default class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeRequest: false,
        }
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    componentWillMount(){
        this.setState ({ changeRequest: this.props.navigation.state.params.dataFromChild.changerequest });
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.navigate('Pfad');
        return true;
    }

    changeRequest = () => {
        let aid = this.props.navigation.state.params.dataFromChild.aid;

        if (this.state.changeRequest) {
            return (<Text style={styles.boldText}>Terminverschiebung beantragt!</Text>);
        } else {
            return (<TouchableOpacity style={styles.button}
            onPress={() => returnToken().then((token) => {
                this.setChangeRequest(token, aid);
            })}>
            <Text style={styles.buttonText}>Termin verschieben</Text>
            </TouchableOpacity>);
        }
    }

    setChangeRequest = (token, aid) => {
        console.log('pid: ' + aid);
        fetch('http://147.87.117.66:1234/appointment/'+aid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body: JSON.stringify({
                        'changerequest': 'true'
                })
        })
        .then((response) => response.json())
        .then ((res) => {
                console.log(res);
                this.setState ({ changeRequest: true });
        })
        .done();
    }

    render() {
    
    const {params} = this.props.navigation.state;

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}> {params.dataFromChild.name}</Text>
                </View>

                <View style={styles.appData}>
                    <Text style={styles.text}> Beschreibung: {params.dataFromChild.description}</Text>
                    <Text style={styles.text}> Startdatum: {convertTime(params.dataFromChild.startdate)}</Text>
                    <Text style={styles.text}> Enddatum: {convertTime(params.dataFromChild.enddate)}</Text>
                </View>

                <View style={styles.practicioner}>
                    <Text style={styles.head}> Fachperson </Text>
                    <Text style={styles.text}> Rolle: {params.dataFromChild.practitioner.role}</Text>
                    <Text style={styles.text}> Name: {params.dataFromChild.practitioner.title} {params.dataFromChild.practitioner.firstname} {params.dataFromChild.practitioner.lastname}</Text>
                    <Text style={styles.text}> Email: {params.dataFromChild.practitioner.email}</Text>
                </View>

                <View style={styles.institution}>
                    <Text style={styles.head}> Institution </Text>
                    <Text style={styles.text}> Name: {params.dataFromChild.institution.name}</Text>
                    <Text style={styles.text}> Adresse: {params.dataFromChild.institution.address} </Text>
                    <Text style={styles.text}> Telefon: {params.dataFromChild.institution.phone}</Text>
                </View>

                <View style={styles.buttonCont}>
                    {this.changeRequest()}
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
        fontSize: 16,
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
        color:'#fff',
        textAlign:'center',
    },
    boldText: {
        fontSize:16,
        fontWeight:'500',
        color:'#000',
        textAlign:'center',
    },
    head: {
        fontWeight: "bold",
        fontSize: 16,
    }
});
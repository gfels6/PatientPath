import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, BackHandler, TouchableHighlight } from 'react-native';
import { returnToken } from '../auth';
import { convertTime } from '../helper';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';

export default class Appointment extends React.Component {
    /* author: gfels6
    ** View für Terminansicht
    */

    constructor(props) {
        super(props);
        this.state = {
            changeRequest: false,
            modalVisible: false,
            hasChecklist: false,
            ready: false,
        }
    }

    // wird somit nicht im DrawerMenü als Eintrag angezeigt
    static navigationOptions = {
        drawerLabel: () => null
    }

    // Falls eine Checkliste angehängt ist, wird diese gefechted und das ready flag für das rendering gesetzt.
    componentWillMount(){
        this.setState ({ changeRequest: this.props.navigation.state.params.dataFromChild.changerequest });
        if(this.props.navigation.state.params.dataFromChild.chklstid != null){
            this.setState ({ hasChecklist: true });
            returnToken().then((token) => {
                this.getChecklistData(token,this.props.navigation.state.params.dataFromChild.chklstid);
            });
        }else{
            this.setState ({ ready: true });
        }

    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    // Workaround für AndroidBackButton
    onBackButtonPressAndroid = () => {
        this.props.navigation.navigate('Pfad');
        return true;
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    // Toggle von changeRequest, entweder Button oder Text JSX
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

    // Setzen von ChangeRequest True in der DB und im State
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

    // Get von der Checklist. Wird in props 'checklist' gespeichert
    getChecklistData = (token, cid) => {

        fetch('http://147.87.117.66:1234/checklist/'+cid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
        })
        .then((response) => response.json())
        .then ((res) => {
            console.log("Checklist geholt!");
            //console.log(res);
            this.checklist = res;
            this.setState ({ ready: true });
        })
        .done();
    }

    // Falls eine Checkliste vorhanden ist, soll der Button für das Modal angezeigt werden
    _renderChecklistButton() {
        if(this.state.hasChecklist == true){
            return (<View style={styles.buttonCont}>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    this.setModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Checkliste anzeigen</Text>
            </TouchableOpacity>
            </View>)
        }
    }

    // Falls eine Checkliste vorhanden ist, soll das Modal erstellt werden.
    _renderChecklistModal() {
        if(this.state.hasChecklist == true){
            return (
                <Modal
                    isVisible={this.state.modalVisible}>
                    <View style={styles.modalContent}>
                    <Text style={styles.text}>Checkliste</Text>

                    {this._renderChecklistItems()}

                    <TouchableOpacity onPress={() => {this.setModalVisible(false);}}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Close</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </Modal>
            )
        }
    }

    // Mit der map function werden alle Checklist Items in Checkboxen gerendert
    _renderChecklistItems() {

        return this.checklist.checklistitems.map((data) => {
             return (
                <CheckBox
                key={data.chklstitemid}
                title={data.name}
                checked={data.checked}
                onPress={() => data.checked = !data.checked}
                />
            );
        });
    }

    render() {
    
    const {params} = this.props.navigation.state;
    if (!this.state.ready) {
        return null;
    } else {  
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}> {params.dataFromChild.name}</Text>
                </View>

                <View style={styles.appData}>
                    <Text style={styles.text}>{params.dataFromChild.description}</Text>
                    <Text style={styles.text}>Startdatum: {convertTime(params.dataFromChild.startdate)}</Text>
                    <Text style={styles.text}>Enddatum: {convertTime(params.dataFromChild.enddate)}</Text>
                </View>

                <View style={styles.practicioner}>
                    <Text style={styles.head}>Fachperson </Text>
                    <Text style={styles.text}>Rolle: {params.dataFromChild.practitioner.role}</Text>
                    <Text style={styles.text}>Name: {params.dataFromChild.practitioner.title} {params.dataFromChild.practitioner.firstname} {params.dataFromChild.practitioner.lastname}</Text>
                    <Text style={styles.text}>Email: {params.dataFromChild.practitioner.email}</Text>
                </View>

                <View style={styles.institution}>
                    <Text style={styles.head}>Institution </Text>
                    <Text style={styles.text}>Name: {params.dataFromChild.institution.name}</Text>
                    <Text style={styles.text}>Adresse: {params.dataFromChild.institution.address} </Text>
                    <Text style={styles.text}>Telefon: {params.dataFromChild.institution.phone}</Text>
                </View>

                {this._renderChecklistButton()}

                <View style={styles.buttonCont}>
                    {this.changeRequest()}
                </View>

                {this._renderChecklistModal()}

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
        padding: 4
    },
    practicioner: {
        marginVertical: 10,
        padding: 4
    },
    institution: {
        padding: 4
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});
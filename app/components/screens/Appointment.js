import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class Appointment extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: () => null
   }

    render() {
    
    const {params} = this.props.navigation.state;
    console.log("works? " + params.dataFromChild.aid);

    
    return (
            <View style={styles.container}>
                <Text style={styles.text}> Appointment </Text>
                <Text style={styles.text}> Hier werden in Zukunft die Institutionen der User angezeigt </Text>
                <Text style={styles.text}> {params.dataFromChild.name}</Text>
                <Text style={styles.text}> {params.dataFromChild.startdate}</Text>
                <Text style={styles.text}> {params.dataFromChild.enddate}</Text>

                <Text style={styles.text}> {params.dataFromChild.practicioner.role}</Text>
                <Text style={styles.text}> {params.dataFromChild.practicioner.title} {params.dataFromChild.practicioner.firstname} {params.dataFromChild.practicioner.lastname}</Text>
                <Text style={styles.text}> {params.dataFromChild.practicioner.email}</Text>

                <Text style={styles.text}> {params.dataFromChild.institution.name}</Text>
                <Text style={styles.text}> {params.dataFromChild.institution.address} </Text>
                <Text style={styles.text}> {params.dataFromChild.institution.phone}</Text>
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
});
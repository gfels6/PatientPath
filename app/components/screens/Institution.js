import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';

export default class Institution extends React.Component {
    /* author: gfels6
    ** View für die Institutionsansicht
    ** Noch nicht implementiert
    */

    static navigationOptions = {
        drawerLabel: 'Institution',
    };

    render() {
    return (
            <View style={styles.container}>
                <Text style={styles.text}> Institution </Text>
                <Text style={styles.text}> Hier werden in Zukunft die Institutionen der User angezeigt </Text>
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


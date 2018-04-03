import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { onSignOut } from "../auth";

export default class LogOut extends React.Component {

    render() {
    return (
            <View style={styles.container}>
                <Text style={styles.text}> LogOut </Text>

                 <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        onSignOut().then(() => this.props.navigation.navigate('LoginScreen'))
                      }}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
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
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
    },
});

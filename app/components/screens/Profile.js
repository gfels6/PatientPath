import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { onSignOut } from "../auth";

export default class Profile extends React.Component {
    /* author: gfels6
    ** View für die Profilsicht & Ausloggen
    */

    render() {
    return (
            <View style={styles.container}>
                 <TouchableOpacity style={styles.button}
                    onPress={() => {
                        onSignOut().then(() => this.props.navigation.navigate('LoginScreen'))
                      }}>
                    <Text style={styles.buttonText}>Ausloggen</Text>
                </TouchableOpacity>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
      },
    text: {
        color: '#000',
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
        textAlign:'center'
      }
});

import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate('Profile');
        }
    }


    render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.header}> Registrieren </Text>
                <TextInput 
                    style={styles.textInput} placeholder='Username' 
                    underlineColorAndroid='transparent'
                />
                <TextInput 
                    style={styles.textInput} placeholder='Password' 
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                />

               <TextInput 
                    style={styles.textInput} placeholder='Password again' 
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.login}>
                    <Text>Registrieren</Text>
                </TouchableOpacity>

            </View>
      </KeyboardAvoidingView>
    );
    }

    signUp = () => {
        alert("signUp not implemented yet");
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
    },
    btn2: {
        alignSelf: 'stretch',
        backgroundColor: 'yellow',
        padding: 20,
        alignItems: 'center',
        marginTop: 10,
    }
});


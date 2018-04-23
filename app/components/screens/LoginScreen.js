import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, ToastAndroid} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { onSignIn } from "../auth";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.header}> LOGIN </Text>
                <TextInput 
                    style={styles.textInput} placeholder='Username' 
                    onChangeText={ (username) => this.setState({username}) }
                    underlineColorAndroid='transparent'
                />
                <TextInput 
                    style={styles.textInput} placeholder='Password' 
                    onChangeText={ (password) => this.setState({password}) }
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.logIn}>
                    <Text>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn2}
                    onPress={() => this.props.navigation.navigate("SignUp")}>
                    <Text>Sign UP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn2}
                    onPress={this.skip}>
                    <Text>Skip LogIn</Text>
                </TouchableOpacity>

            </View>
      </KeyboardAvoidingView>
    );
    }

    skip = () => {
        this.props.navigation.navigate('Path');
    }

    logIn = () => {
        
        fetch('http://147.87.116.42:54321/login/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then ((res) => {
            if (res.token) {
                AsyncStorage.setItem("TOKEN", res.token);
                console.log(res.token);
                this.props.navigation.navigate('Path');
                ToastAndroid.showWithGravity(
                    'Login erfolgreich!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
    
            }
            else {
                alert("Login nicht erfolgreich!");
            }
        })
        .done();
        
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


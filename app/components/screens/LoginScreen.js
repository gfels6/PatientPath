import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, ToastAndroid, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { isSignedIn } from "../auth";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
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
        .then ((resp) => {
            if (resp.token) {
                AsyncStorage.setItem('token', resp.token);
                console.log("result from loginfetch: " + resp.token);
                this.props.navigation.navigate('Path');
                ToastAndroid.showWithGravity(
                    'Login erfolgreich!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
    
            }
            else {
                alert("Login nicht erfolgreich. Benutzername oder Passwort falsch!");
            }
        })
        .done();
        
    }

    render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

            <View style={styles.container}>
                <View style={styles.picContainer}>
                    <Image  style={{width:70, height: 70}}
                        source={require('../../img/route.png')}/>
                    <Text style={styles.logoText}>Willkommen bei PatientPath!</Text>	
                </View>

                <View style={styles.formContainer}>
                    <TextInput 
                        style={styles.inputBox} placeholder='Benutzername' 
                        onChangeText={ (username) => this.setState({username}) }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor = "#ffffff" 
                    />
                    <TextInput 
                        style={styles.inputBox} placeholder='Passwort' 
                        onChangeText={ (password) => this.setState({password}) }
                        secureTextEntry={true}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor = "#ffffff"
                    />

                    <TouchableOpacity style={styles.button} onPress={this.logIn}>
                        <Text style={styles.buttonText}>Einloggen</Text>
                    </TouchableOpacity>

                </View>

	    		<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Noch kein Account?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Registrieren</Text></TouchableOpacity>
				</View>
			</View>	

      </KeyboardAvoidingView>
    );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    picContainer : {
        flexGrow: 1,
        justifyContent:'flex-end',
        alignItems: 'center'
      },
      logoText : {
          marginVertical: 15,
          fontSize:18,
          color:'rgba(255, 255, 255, 0.7)'
      },
      container : {
        backgroundColor:'#4682b4',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
      },
      signupTextCont : {
          flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
      },
      signupText: {
          color:'rgba(255,255,255,0.6)',
          fontSize:16
      },
      signupButton: {
          color:'#ffffff',
          fontSize:16,
          fontWeight:'500'
      },
      formContainer : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
      },
    
      inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
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


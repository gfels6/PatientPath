import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Image, Alert, ToastAndroid} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class LoginScreen extends React.Component {
    /* author: gfels6
    ** View für die Registrierung
    ** Noch nicht implementiert
    */

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            birthdate: '',
        }
    }

    signUp = () => {

        if(this.state.firstname == '' || this.state.lastname == '' || this.state.username == '' || this.state.password == '' || this.state.birthdate == ''){
            Alert.alert(
                'Fehlende Angaben',
                'Es wurden nicht alle Angaben ausgefüllt.',
                [
                  {text: 'Verstanden',},
                ],
                { cancelable: false }
              )
              
              return;
        }

        fetch('http://147.87.117.66:1234/signup/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                birthdate: this.state.birthdate,
            })
        })
        .then((response) => response.json())
        .then ((resp) => {
            console.log(resp);
            this.props.navigation.navigate('Login');
            ToastAndroid.showWithGravity(
                'Registrierung erfolgreich!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
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
                    <Text style={styles.logoText}>Registrierung für PatientPath!</Text>	
                </View>

                <View style={styles.formContainer}>
                    <TextInput 
                        style={styles.inputBox} placeholder='Vorname' 
                        onChangeText={ (firstname) => this.setState({firstname}) }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor = "#ffffff" 
                    />
                    <TextInput 
                        style={styles.inputBox} placeholder='Nachname' 
                        onChangeText={ (lastname) => this.setState({lastname}) }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor = "#ffffff" 
                    />
                    <TextInput 
                        style={styles.inputBox} placeholder='Geburtstag (yyyy-mm-dd)' 
                        onChangeText={ (birthdate) => this.setState({birthdate}) }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholderTextColor = "#ffffff" 
                    />
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
 
                    <TouchableOpacity style={styles.button} onPress={this.signUp}>
                        <Text style={styles.buttonText}>Registrieren</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.signupTextCont}>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Login') }>
                        <Text style={styles.signupButton}>Zurück zu Login</Text>
                    </TouchableOpacity>
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
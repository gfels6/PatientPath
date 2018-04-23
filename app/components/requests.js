import {AsyncStorage, ToastAndroid} from 'react-native';

/*

export function checkLogin(uname, passw) {
    return fetch('http://147.87.116.42:54321/login/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: uname,
            password: passw,
        })
    })
    .then(response => { return response.json();})
    .then(responseData => { return responseData;})




    fetch('http://147.87.116.42:54321/login/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: uname,
            password: password,
        })
    })
    .then((response) => response.json())
    .then ((res) => {
        if (res.token) {
            AsyncStorage.setItem("TOKEN", res.token);
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

*/
import React from "react";
import { Platform, StatusBar, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions,
} from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import SignUp from "./screens/SignUp";
import Path from "./screens/Path";
import Cal from "./screens/Cal";
import Institution from "./screens/Institution";
import Profile from "./screens/Profile";
import Appointment from "./screens/Appointment";

const DrawerButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {props.navigation.dispatch(DrawerActions.toggleDrawer())}}>
        <Image
          source={require('../img/hamburgerW.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};



export const SignedOut = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  SignUp: {
    screen: SignUp,
  },
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   },
);

const DrawerNav = createDrawerNavigator(
  {
    Pfad: {
      screen: Path,
      navigationOptions: {
        drawerLabel: "Pfad",
        title: "Pfadansicht",
      }
    },
    Kalender: {
      screen: Cal,
      navigationOptions: {
        drawerLabel: "Cal",
        title: "Call",
      }
    },
    Institution: {
      screen: Institution,
    },
    Profil: {
      screen: Profile,
    },
    Termin: {
      screen: Appointment,
    }
  },
  {
    initialRouteName: 'Pfad',
    drawerPosition: 'left',
  }
);

export const SignedIn = createStackNavigator(
  {
    Main: {
      screen: DrawerNav,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
      headerStyle: {
        backgroundColor: '#4682b4',
      },
      headerTitleStyle: {
          color: 'white',
      },
      headerBackTitleStyle: {
          color: 'white',
      },
      headerTintColor: 'white',
    }),
  }
);


export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
}; 

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});
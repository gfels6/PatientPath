import React from "react";
import { Platform, StatusBar, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  StackNavigator,
  SwitchNavigator,
  DrawerNavigator,
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
      <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerOpen')}}>
        <Image
          source={require('../img/hamburgerW.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
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

 /*
  const AppoStack = StackNavigator(
    {
      Appointment: { 
        screen: Appointment,
        title: "Pfad",
      },
    },
    {
      navigationOptions: ({navigation}) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
      }),
    }
  ); */

  const PathStack = StackNavigator(
  {
    Path: { 
      screen: Path,
      title: "Pfad",
    },
    Appointment: {
      screen: Appointment,
      title: "lol",
    }
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

    initialRouteName: 'Path',
  }
  );

  const InstitutionStack = StackNavigator(
  {
    Institution: { 
      screen: Institution,
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

  const CalStack = StackNavigator(
  {
    Cal: { 
      screen: Cal,
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

  const ProfileStack = StackNavigator(
  {
    Profile: { 
      screen: Profile,
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

export const SignedIn = DrawerNavigator(
  {
    Pfad: {
      screen: PathStack,
      title: "Pfad",
    },
    Kalender: {
      screen: CalStack,
    },
    Institution: {
      screen: InstitutionStack,
    },
    Profil: {
      screen: ProfileStack,
    },
  },
  {
    initialRouteName: 'Pfad',
    drawerPosition: 'left',
  }
);

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator(
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
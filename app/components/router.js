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

/* author: gfels6
** Hier wird das komplette Routing geregelt
** Menü, Header, etc.
*/


// Icon Oben Links im Header
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

// Navigation falls man ausgeloggt ist
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
        drawerLabel: "Pfadansicht",
      }
    },
    Kalender: {
      screen: Cal,
      navigationOptions: {
        drawerLabel: "Kalender",
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

// Workaround um ein Header zu erhalten
// Zurzeit sind im DrawerNav keine Header möglich
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

// Je nach LoginStatus wird entscheiden welcher Nav angezeigt wird
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
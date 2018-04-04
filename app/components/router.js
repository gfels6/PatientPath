import React from "react";
import { Platform, StatusBar, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator,
  DrawerNavigator,
} from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import SignUp from "./screens/SignUp";
import Path from "./screens/Path";
import Cal from "./screens/Cal";
import Institution from "./screens/Institution";
import LogOut from "./screens/LogOut";

const DrawerButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerOpen')}}>
        <Image
          source={require('../img/hamburger.png')}
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
    navigationOptions: {
      title: "LoginScreen",
      headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "SignUp",
      headerStyle
    }
  }
});

  const PathStack = StackNavigator(
  {
    Path: { 
      screen: Path,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerLeft: <DrawerButton navigation={navigation} />,
    }),
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
    }),
  }
  );

  const LogOutStack = StackNavigator(
  {
    LogOut: { 
      screen: LogOut,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
       headerLeft: <DrawerButton navigation={navigation} />,
  }),
  }
  );      

export const SignedIn = DrawerNavigator(
  {
    Path: {
      screen: PathStack,
    },
    Cal: {
      screen: CalStack,
    },
    Institution: {
      screen: InstitutionStack,
    },
    LogOut: {
      screen: LogOutStack,
    },
  },
  {
    initialRouteName: 'Path',
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
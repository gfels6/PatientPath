import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator,
  DrawerNavigator,
} from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import SignUp from "./screens/SignUp";
import Path from "./screens/Path";
import Calendar from "./screens/Calendar";
import Institution from "./screens/Institution";
import LogOut from "./screens/LogOut";

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

export const SignedIn = DrawerNavigator(
  {
    Path: {
      screen: Path,
    },
    Calendar: {
      screen: Calendar,
    },
    Institution: {
      screen: Institution,
    },
    LogOut: {
      screen: LogOut,
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
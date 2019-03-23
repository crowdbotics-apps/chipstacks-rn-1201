import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import { Text, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoadingScreen from './Loading';
import LoginScreen from './Login';
import ForgotPasswordScreen from './PasswordReset';
import SignupScreen from './Signup';
import ProfileScreen from './Profile';
import BankAccountScreen from './BankAccount';
import MainScreen from './Main';
import GameCreateScreen from './GameCreate';

import { DrawerMenu } from './../components';

const dm = Dimensions.get('screen');

const AuthNavigator = createStackNavigator(
  {
    login: {
      screen: LoginScreen
    },
    signup: {
      screen: SignupScreen
    },
    forgotpassword: {
      screen: ForgotPasswordScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'login'
  }
);

const MainTabNavigator = createStackNavigator(
  {
    main: {
      screen: MainScreen
    },
    gamecreate: {
      screen: GameCreateScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'main'
  }
);

const MainNavigator = createDrawerNavigator(
  {
    home: MainTabNavigator,
    profile: ProfileScreen,
    bank: BankAccountScreen
  },
  {
    drawerWidth: dm.width * 0.6,
    // eslint-disable-next-line react/display-name
    contentComponent: (props) => (
      <DrawerMenu currentScreen={props.navigation.state.routeName} {...props} />
    ),
    initialRouteName: 'home',
    contentOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 20,
        fontWeight: 'normal',
        fontStyle: 'normal',
        marginLeft: 0,
        paddingLeft: 0
      }
    }
  }
);

const MainStackNavigator = createStackNavigator(
  {
    mainroot: MainNavigator
  },
  {
    headerMode: 'none',
    initialRouteName: 'mainroot'
  }
);

const AppNavigator = createSwitchNavigator(
  {
    loading: LoadingScreen,
    auth: AuthNavigator,
    main: MainStackNavigator
  },
  {
    initialRouteName: 'loading'
  }
);

export default createAppContainer(AppNavigator);

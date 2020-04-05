import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import LoginScreen from './Screens/Auth/Login';
import RegisterScreen from './Screens/Auth/Register';

import {Root} from 'native-base';
import {YellowBox} from 'react-native';
import HomeChatScreen from './Screens/Home/Chat';
import HomeMapScreen from './Screens/Home/Map';
import HomeFriendScreen from './Screens/Home/Friend';
import HomeAccountScreen from './Screens/Home/Account';
import HomeScreen from './Screens/Home/Home';

YellowBox.ignoreWarnings(['Setting a timer', 'perform a React']);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MaterialTop = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#a8b8b7',
        tabStyle: {
          backgroundColor: '#425c5a',
        },
        style: {backgroundColor: '#425c5a', paddingTop: 50},
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={HomeMapScreen} />
      <Tab.Screen name="Friend" component={HomeFriendScreen} />
      <Tab.Screen name="Account" component={HomeAccountScreen} />
    </Tab.Navigator>
  );
};

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppContainer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="App"
        component={MaterialTop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={HomeChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
class Navigator extends Component {
  render() {
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="AppContainer"
              component={AppContainer}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}

export default Navigator;

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Screens/Auth/Login';
import Register from './Screens/Auth/Register';
import Home from './Screens/Home/Home';

import {Root} from 'native-base';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer', 'perform a React']);

const Stack = createStackNavigator();

class Navigator extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: 'Register Form',
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#71697A',
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}

export default Navigator;

import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';

import ChatScreen from '../../Screens/Home/Chat';
import MapScreen from '../../Screens/Home/Map';
import FriendScreen from '../../Screens/Home/Friend';
import AccountScreen from '../../Screens/Home/Account';

const Tab = createMaterialTopTabNavigator();

const TopNavbar = props => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chat"
        component={HomeChat}
        option={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: () => <Icon name="home" size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TopNavbar;

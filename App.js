import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import UserContent from './UserContent';
import Login from './Login';
import Buttons from './Buttons';
import ListContent from './ListContent';
import ItemContent from './ItemContent';
import UI from './ui';
import Profile from './profile';

const Stack = createStackNavigator({
  //Home: { screen: Buttons },
	Home: { screen: Profile },
  Users: { screen: UserContent },
	Lists: { screen: ListContent },
	Items: { screen: ItemContent },
	Profile: { screen: Profile },
	},
	{
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: 'orangered',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			flex: 1,
		},
	}
	}
);

const Drawer = createDrawerNavigator({
	Screen1: {
		screen: Buttons,
	},
});

const App = createAppContainer(Stack);
export default App;

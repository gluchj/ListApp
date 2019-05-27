import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import UserContent from './UserContent';
import Login from './Login';
import ListContent from './ListContent';
import ItemContent from './ItemContent';
import UI from './ui';
import Profile from './profile';


const Stack = createStackNavigator({
	Home: { screen: UI },
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
	Profile: { screen: Profile },
	Stack: Stack,
	},
	{
		initialRouteName: 'Stack',
	},
);

const App = createAppContainer(Drawer);
export default App;
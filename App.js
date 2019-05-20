import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserContent from './UserContent';
import Login from './Login';
import Buttons from './Buttons';
import ListContent from './ListContent';
import ItemContent from './ItemContent';
import UI from './ui';

const Stack = createStackNavigator({
  Home: { screen: Buttons },
  Users: { screen: UserContent },
	Lists: { screen: ListContent },
	Items: { screen: ItemContent },
	UI: { screen: UI },
});

const App = createAppContainer(Stack);
export default App;

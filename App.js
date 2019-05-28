import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import UserContent from './UserContent';
import Login from './Login';
import ListContent from './ListContent';
import ItemContent from './ItemContent';
import UI from './ui';
import Profile from './profile';
import Buttons from './Buttons';

/* add all screens to StackNavigator */
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

const CustomDrawerComponent = (props) => (
  <ScrollView>
		<Text>Welcome</Text>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/* add screen stack to DrawerNavigator */
const Drawer = createDrawerNavigator({
	Profile: { screen: Profile },
	Stack: Stack,
	},
	{
		initialRouteName: 'Stack',
		//contentComponent: Buttons,
	},
);

const App = createAppContainer(Drawer);
export default App;
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import ListContent from './ListContent';
import ItemContent from './ItemContent';
import UI from './ui';
import Profile from './profile';
import ManageList from './ManageList';
import CustomDrawerComponent from './CustomDrawerComponent';

/* add screens to StackNavigator */
const Stack = createStackNavigator({
	Lists: { screen: ListContent },
	Items: { screen: ItemContent },
	ManageList: { screen: ManageList },
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

/* add screen stack & Profile screen to DrawerNavigator */
const Drawer = createDrawerNavigator({
	Profile: { screen: Profile },
	Stack: Stack,
	},
	{
		//initialRouteName: 'Stack',
		contentComponent: CustomDrawerComponent,
	},
);

/* create RootStack, add Login screen and all other stacks to it */
const RootStack = createStackNavigator({
	Home: {screen: UI },
	Drawer: {
		screen: Drawer,
		navigationOptions: { header: null }
	}
});

/* create custom nav drawer with profile screen and logout option */
/*
const CustomDrawerComponent = (props) => (
  <ScrollView>
		<Text>Welcome {this.props.navigation.state.params.userName} </Text>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = createAppContainer(RootStack);
export default App;
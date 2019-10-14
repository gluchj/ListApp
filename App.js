/**
 	* app.js imports all components, creates stacknavigator and drawernavigator
  * exports app container
	* 
	* joel gluch, joel.gluch@gmail.com
  **/

import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import ListContent from './ListContent';
import ItemContent from './ItemContent';
import UI from './ui';
import Profile from './profile';
import About from './About';
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
	About: { screen: About },
	Stack: Stack,
	},
	{
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

/* create App container and export */
const App = createAppContainer(RootStack);
export default App;
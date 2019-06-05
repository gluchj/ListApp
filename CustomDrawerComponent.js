import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//<ImageBackground source={require('./assets/icon.png')} style={{ width: 280, height: 220}}></ImageBackground>

export default class CustomDrawerComponent extends Component {


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>
						List
						<Text style={{color:'slategray'}}>.App
						</Text>
					</Text>
				</View>
				
				<View style={{ flexDirection: 'row', marginLeft: 20,}}>	
					<Icon 
						name="account-circle"
						size={26}
						color="darkgrey"
					/>	
					<Text style={styles.menuitem} onPress={ () => { this.props.navigation.navigate('Profile') }}>
						Profile
					</Text>
				</View>
				
				<View style={{ flexDirection: 'row', marginLeft: 20, }}>	
					<Icon 
						name="info"
						size={26}
						color="darkgrey"
					/>	
					<Text style={styles.menuitem}>
						About
					</Text>
				</View>
				
				<View style={{ flexDirection: 'row', marginLeft: 20, }}>	
					<Icon 
						name="power-settings-new"
						size={26}
						color="darkgrey"
					/>	
					<Text style={styles.menuitem}>
						Logout
					</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	header: {
		paddingTop: 20,
		marginBottom: 25,
		height: 150,
		width: '100%',
		backgroundColor: 'orangered',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 35,
	},
	menuitem: {
		color: '#2a2a2a',
		width: '90%',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 25,
		marginLeft: 10,
	}
});
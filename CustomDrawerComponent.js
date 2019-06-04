import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

export default class CustomDrawerComponent extends Component {


	render() {
		return (
			<View style={styles.container}>
				<View style={{ width: '100%', height: 23, backgroundColor: 'orangered' }}/>
				<View style={styles.header}>
					<ImageBackground source={require('./assets/icon.png')} style={{ width: 280, height: 220}}>
					</ImageBackground>
				</View>
				<Text>Menu Item 1</Text>
				<Text>Menu Item 2</Text>
				<Text>Menu Item 3</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	header: {
		margin: 15,
		height: 230,
	},
});
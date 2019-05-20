import React, { Component, Linking }from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '' }
	}
	
	_handleNameChange = (username) => {
		this.setState({username});
	}
	
	_onButtonPress = () => {
		Alert.alert('You entered ' + this.state.username);
	}
	
	render() {
    return (
		<View style={styles.container}>
			{/* Application title text */}
			<Text style={styles.title}>
				List
				<Text style={{color:'gray'}}>.App
				</Text>
			</Text>
		
			<Input
				label='Username'
				placeholder='joe@example.com'
				onChangeText={this._handleNameChange}
			/>
			<Input
				label='Password'
				placeholder='Enter password'
			/>
			<Input
				label='Server'
				placeholder='https://hostname.com:port/rest/api'
				//value='http://67.172.87.92:8080/rest/api/users/'
			/>
			<Button
				title='LOGIN'
				buttonStyle={styles.button}
				titleStyle={{width: '100%'}}
				onPress={this._onButtonPress}
			/>
			<Text style={{color: 'blue', fontSize: 16}} onPress={ () => Linking.openURL('#')}>
				Not a Member?
			</Text>
		</View>
		);
	}	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
		marginTop: 50,
		padding: 12,
    //justifyContent: 'center',
  },
	title: {
		color: 'orangered',
		fontWeight: 'bold',
		fontSize: 35,
		paddingBottom: 30
	},
	button: {
		backgroundColor: 'orangered',
		width: '80%',
		marginTop: 25,
		marginBottom: 20,
	}
});
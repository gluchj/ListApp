import React, {Component }from 'react';
import { StyleSheet, Text, TextInput, Button } from 'react-native';
import { Alert, View, Image, Keyboard } from 'react-native';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '' }
		this.state = { password: '' }
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this._onPressButton = this._onPressButton.bind(this);
	}
	
	handleNameChange(name) {
		this.setState({ name });
	}
	
	handlePasswordChange(password) {
	this.setState({ password });
	}
	
	_onPressButton() {
		Alert.alert('Your username & password are: ' 
				+ this.state.name + " & " + this.state.password )
		this.props.navigation.navigate(
      	'Content', {});
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
			
			{/* username & password input fields */}
				<TextInput
					style={styles.input}
					placeholder="Username"
					onBlur={Keyboard.dismiss}
					value={this.state.name}
					onChangeText={this.handleNameChange}
				/>
				<TextInput 
					style={styles.input}
					secureTextEntry={true}
					placeholder="Password"
					onBlur={Keyboard.dismiss}
					value={this.state.password}
					onChangeText={this.handlePasswordChange}
				/>
				
				<View style={{width: "80%" }}>
					<Button
						onPress={this._onPressButton}			
						title="LOGIN"
						color="orangered"
					/>
				</View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
	
	title: {
		color: 'orangered',
		fontWeight: 'bold',
		fontSize: 35,
		paddingBottom: 30
	},
	
	input: {
		height: 40,
		width: "80%",
		borderColor: 'gray',
		borderWidth: 1,
		margin: 15,
		paddingLeft: 10,
		fontSize: 18
	},
});

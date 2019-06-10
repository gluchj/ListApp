import React, {Component }from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView, KeyboardAvoidingView } from 'react-native';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
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

			<KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}> 
			<View style={{ justifyContent: 'flex-end' }}>
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
				/>
				<TextInput 
					style={styles.input}
					placeholder="Password"
				/>
				
				<View style={{width: "80%" }}>
					<Button
						onPress={this._onPressButton}			
						title="LOGIN"
						color="orangered"
					/>
				</View>
			</View>
			</KeyboardAvoidingView>
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
		paddingTop: 100,
		paddingBottom: 130
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

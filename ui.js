import React, { Component, Linking }from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isLoading: false,
		}
	}
	
	_handleNameChange = (username) => {
		this.setState({username});
	}
	
	_onButtonPress = () => {
		this.setState({ isLoading: true });
		return fetch('http://67.172.87.92:8080/rest/api/users/' + this.state.username + '/lists/')
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.data === undefined || responseJson.data.length == 0) {
					this.setState({ isLoading: false });
				}
				else {
					this.setState({ isLoading: false });
					this.props.navigation.navigate('Lists', {data: responseJson.data, user: this.state.username});
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}
	
	render() {
		
		if(this.state.isLoading) {
			return(
				<View style={styles.container}>
					<ActivityIndicator size="large"/>
				</View>
			)
		}
		
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
				placeholder='Enter username'
				containerStyle={{ marginBottom: 15 }}
				onChangeText={this._handleNameChange}
			/>
			<Input
				label='Password'
				placeholder='Enter password'
				containerStyle={{ marginBottom: 15 }}
				secureTextEntry={true}
			/>
			<Input
				label='Server'
				placeholder='https://hostname.com:port/rest/api'
				containerStyle={{ marginBottom: 15 }}
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
  },
	title: {
		color: 'orangered',
		fontWeight: 'bold',
		fontSize: 35,
		paddingBottom: 45
	},
	button: {
		backgroundColor: 'orangered',
		width: '80%',
		marginTop: 35,
		marginBottom: 20,
	}
});
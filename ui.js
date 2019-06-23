import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage, KeyboardAvoidingView, Linking } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
//Server Address = 'http://67.172.87.92:8080/rest/api' + /users/

export default class ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isLoading: false,
			checked: false,
			endpoint: '',
		}
	}
	
	/* check for saved preferences */
	componentDidMount() {
		this.getData();
	}
	
	/* store username and server address with AsyncStorage */
	storeData = async () => {
		try {
			await AsyncStorage.setItem('@user_name', this.state.username)
			await AsyncStorage.setItem('@end_point', this.state.endpoint)
		} catch (e) {
			// saving error
		}
	}
	
	/* retrieve username and server address from AsyncStorage */
	getData = async () => {
		try {
			const user = await AsyncStorage.getItem('@user_name')
			const srvr = await AsyncStorage.getItem('@end_point')
			if(user !== null) {
				// value previously stored
				this.setState({ username: user, checked: true, })
			}
			if(srvr !== null) {
				this.setState({ endpoint: srvr, })
			}
		} catch(e) {
			// error reading value
		}
	}
	
	/* reset AsyncStorage saved values to '' */
	forgetData = async () => {
		try {
			await AsyncStorage.removeItem('@user_name');
			await AsyncStorage.removeItem('@end_point');
		} catch (e) {
			// saving error
		}
	}

	/* onChangeText of username input field */
	_handleNameChange = (username) => {
		this.setState({username});
	}
	
	/* onChangeText of server input field */
	_handleServerChange = (endpoint) => {
		this.setState({endpoint});
	}
	
	/* onPress for remember settings checkbox */
	_boxChecked = () => {
		this.setState({checked: !this.state.checked})
	}
	
	/* called on login, check if username exists, nav to List screen if so */
	_onButtonPress = () => {
		this.setState({ isLoading: true });
		if(this.state.checked) {
			this.storeData();
		}
		else {
			this.forgetData();
		}
		return fetch(this.state.endpoint + '/users/' + this.state.username)
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.data === undefined || responseJson.data.length == 0 || responseJson.data.length > 1) {
					this.setState({ isLoading: false });
				}
				else {
					this.setState({ isLoading: false });
					global.user = this.state.username;
					global.endpoint = this.state.endpoint;
					this.props.navigation.navigate('Lists', { user: responseJson.data[0], endpoint: this.state.endpoint });
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}
	
	/* set screen header */
	static navigationOptions = {
		headerStyle: {
			backgroundColor: 'orangered',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			flex: 1,
		},
	}
	
	/* render activity indicator or login screen */
	render() {
		if(this.state.isLoading) {
			return(
				<View style={styles.container}>
					<ActivityIndicator size="large"/>
				</View>
			)
		}
    return (

		<KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
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
					value={this.state.username}
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
					value={this.state.endpoint}
					onChangeText={this._handleServerChange}
				/>
				<CheckBox
					center
					checkedColor='green'
					title='Remember Settings'
					checked={this.state.checked}
					onPress={this._boxChecked}
				/>
				<Button
					title='LOGIN'
					buttonStyle={styles.button}
					titleStyle={{width: '100%'}}
					onPress={this._onButtonPress}
				/>
				<Text style={{color: 'blue', fontSize: 16}} onPress={ () => Linking.openURL('https://listapp.jrg-prod.com/webclient/')}>
					Not a Member?
				</Text>
				<View style={{ flex: 1 }} />
			</View>
		</KeyboardAvoidingView>
		);
	}	
}

const styles = StyleSheet.create({
  container: {
		justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
		marginTop: 35,
		padding: 15,
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
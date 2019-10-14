/**
	* The Profile component displays user details screen for
	* viewing and editing profile data.
	* 
	* joel gluch, joel.gluch@gmail.com
  **/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';

export default class drawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			updateDialogVisible: false,
			endpoint: global.endpoint,
			username: global.user,
			user: '',
		}
	}
	
	/* fetch user date or nav back to login screen if user is null */
	componentDidMount() {
		this.fetchData();
	}
	
	/* retreiieve user data for specified username and setState in 'user' */
	fetchData() {
		this.setState({ isLoading: true });
		return fetch(this.state.endpoint + '/users/' + this.state.username)
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.data === undefined || responseJson.data.length == 0 || responseJson.data.length > 1) {
					this.setState({ isLoading: false });
				}
				else {
					this.setState({ user: responseJson.data[0] });
					this.setState({ isLoading: false });
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}
	
	/* display updateDialogVisible windows */
	handleUpdate = () => {
		this.setState({ updateDialogVisible: true });
	}
	
	/* route user back to Lists screen */
	handleBack = () => {
		this.props.navigation.navigate('Lists');
	}

	/* display updateDialogVisible windows */
	handleYes = () => {
		this.setState({ updateDialogVisible: false, isLoading: true });
		fetch(this.state.endpoint + '/users/' + this.state.username, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify(this.state.user)								
		})
		.then((responseJson) => {
			this.fetchData();
			this.setState({ isLoading: false });
		})
		.catch((error) => {
			console.error(error);
			this.setState({ isLoading: false });
		});
	}
	
	/* hide updateDialogVisible windows */
	handleNo = () => {
		this.setState({ updateDialogVisible: false });
	}
	
	/* onChangeText for first name input */
	_handlefNameChange = (fname) => {
		this.setState(prevState => ({ user: { ...prevState.user, fname: fname } }))
	}
	
	/* onChangeText for last name input */
	_handlelNameChange = (lname) => {
		this.setState(prevState => ({ user: { ...prevState.user, lname: lname } }))
	}
	
	/* onChangeText for email input */
	_handleEmailChange = (email) => {
		this.setState(prevState => ({ user: { ...prevState.user, email: email } }))
	}
	
	/* onChangeText for password input */
	_handlePasswordChange = (password) => {
		this.setState(prevState => ({ user: { ...prevState.user, password: password } }))
	}

	/* remove default navigation header */
	static navigationOptions = {
		header: null
	};
	
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
			<View style={ styles.top }>
				<Icon name='user-circle' size={80} color='#FFF' />
				<View style={{ flexDirection: 'column', paddingLeft: 15 }}>
					<Text style={styles.title}>
						User Profile
					</Text>
					<Text style={styles.name}>
						{this.state.user.username}
					</Text>
				</View>
			</View>
			<View style={{ margin: 15, marginBottom: 30, }}>
				<Input
					label='First'
					placeholder='Enter your firstname'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.user.fname}
					onChangeText={this._handlefNameChange}
				/>
				<Input
					label='Last'
					placeholder='Enter your lastname'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.user.lname}
					onChangeText={this._handlelNameChange}
				/>
				<Input
					label='Email'
					placeholder='Enter your email address'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.user.email}
					onChangeText={this._handleEmailChange}
				/>
				<Input
					label='Password'
					secureTextEntry={true}
					placeholder='Enter password'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.user.password}
					onChangeText={this._handlePasswordChange}
					secureTextEntry={true}
				/>
			</View>
			<View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
				<Button
					type='outline'
					title='Back'
					buttonStyle={{ }}
					titleStyle={{width: '40%'}}
					onPress={this.handleBack}
				/>
				<Button
					type='outline'
					title='Update'
					buttonStyle={{ }}
					titleStyle={{width: '40%'}}
					onPress={this.handleUpdate}
				/>
			</View>
			
			{/* confirm update dialog box */}
			<View>
				<Dialog.Container visible={this.state.updateDialogVisible}>
					<Dialog.Title>Update Profile</Dialog.Title>
					<Dialog.Description>
						Save profile changes?
					</Dialog.Description>
					<Dialog.Button label="No" onPress={this.handleNo} />
					<Dialog.Button label="Yes" onPress={this.handleYes} />
				</Dialog.Container>
			</View>
		</View>
		);
	}	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
		margin: 0,
		padding: 0,
  },
	title: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 30,
	},
	name: {
		color: '#EEE82C',
		fontSize: 20,
	},
	top: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'orangered',
		paddingTop: 60,
		paddingBottom: 30,
		paddingLeft: 15,
		marginBottom: 30,
	}
});
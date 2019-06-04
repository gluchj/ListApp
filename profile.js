import React, { Component }from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
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
			fname: '',
			lname: '',
			email: '',
			password: '',
		}
	}
	
	/* fetch user date or nav back to login screen if user is null */
	componentDidMount() {
	//	if(global.username == null) {
	//		this.props.navigation.navigate('UI');
	//	}
	//	else {
			this.fetchData();
			this.setState({ fname: user.fname, lname: user.lname, email: user.email, password: user.password });
			console.log(this.state.user.fname);
			console.log(this.state.fname);
	//	}
	}
	
	/* display updateDialogVisible windows */
	handleUpdate = () => {
		this.setState({ updateDialogVisible: true });
	}
	
	handleCancel = () => {
		this.props.navigation.navigate('Lists');
	}

	/* display updateDialogVisible windows */
	handleYes = () => {
		this.setState({ updateDialogVisible: false, isLoading: true });

		fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/' + this.state.list, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify ({ "fname": this.state.fname,
															"lname": this.state.lname,
															"email": this.state.email,
															"password": this.state.password })								
		})
		.then((responseJson) => {
			this.setState({ fname: '', lname: '', email: '', password: '', });
			this.fetchData();
			this.setState({ isLoading: false });
		})
		.catch((error) => {
			this.setState({ fname: '', lname: '', email: '', password: '', });
			console.error(error);
			this.setState({ isLoading: false });
		});
	}
	
		/* display updateDialogVisible windows */
	handleNo = () => {
		this.setState({ updateDialogVisible: false });
	}
	
	_handlefNameChange = (fname) => {
		this.setState({fname});
	}
	
	_handlelNameChange = (lname) => {
		this.setState({lname});
	}
	
	_handleEamilChange = (email) => {
		this.setState({email});
	}
	
	_handlelNameChange = (password) => {
		this.setState({password});
	}
	
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
					value={this.state.fname}
					onChangeText={this._handlefNameChange}
				/>
				<Input
					label='Last'
					placeholder='Enter your lastname'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.lname}
					onChangeText={this._handlelNameChange}
				/>
				<Input
					label='Email'
					placeholder='Enter your email address'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.email}
					onChangeText={this._handleEmailChange}
				/>
				<Input
					label='Password'
					secureTextEntry={true}
					placeholder='Enter password'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.password}
					onChangeText={this._handlePasswordChange}
					secureTextEntry={true}
				/>
			</View>
			<View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
				<Button
					type='outline'
					title='Cancel'
					buttonStyle={{ }}
					titleStyle={{width: '40%'}}
					onPress={this.handleCancel}
				/>
				<Button
					type='outline'
					title='Update'
					buttonStyle={{ }}
					titleStyle={{width: '40%'}}
					onPress={this.handleUpdate}
				/>
			</View>
			
			{/* confirm list delete dialog box */}
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
		//width: Dimensions.get("window").width * 0.8,
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
		//marginTop: 50,
		margin: 0,
		padding: 0,
		//padding: 12,
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
		//justifyContent: 'space-evenly',
		backgroundColor: 'orangered',
		paddingTop: 60,
		paddingBottom: 30,
		paddingLeft: 15,
		marginBottom: 30,
	}
});
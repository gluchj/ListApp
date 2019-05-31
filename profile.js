import React, { Component }from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class drawer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			endpoint: global.endpoint,
			username: global.user,
			user: '',
		}
	}
	
	componentDidMount() {
		this.fetchData();
	}
	
	handleUpdate = () => {
		//this.props.navigation.openDrawer();
	}
	
	handleCancel = () => {
		this.props.navigation.navigate('Lists');
	}
	
	_handleNameChange = (username) => {
		this.setState({username});
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

/*	
	_onButtonPress = () => {
		this.setState({ isLoading: true });
		return fetch('http://67.172.87.92:8080/rest/api/users/' + this.state.username)
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.data === undefined || responseJson.data.length == 0 || responseJson.data.length > 1) {
					this.setState({ isLoading: false });
				}
				else {
					this.setState({ isLoading: false });
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}
*/

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
					onChangeText={this._handleNameChange}
				/>
				<Input
					label='Last'
					placeholder='Enter your lastname'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.user.lname}
					onChangeText={this._handleNameChange}
				/>
				<Input
					label='Email'
					placeholder='Enter your email address'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.user.email}
					onChangeText={this._handleNameChange}
				/>
				<Input
					label='Password'
					secureTextEntry={true}
					placeholder='Enter password'
					containerStyle={{ marginBottom: 15 }}
					value={this.state.user.password}
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
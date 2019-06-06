import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from 'react-native-dialog';
//<ImageBackground source={require('./assets/icon.png')} style={{ width: 280, height: 220}}></ImageBackground>

export default class CustomDrawerComponent extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			logoutDialogVisible: false,
		}
	}
	
	/* show logout confirmation dialog box */
	_pressLogout = () => {
		this.setState({ logoutDialogVisible: true });
	}
	
	/* hide logout dialog box on cancel */
	handleCancel = () => {
		this.setState({ 
			logoutDialogVisible: false,
		});
	}
	
	/* exit application */
	handleLogout = () => {
		user.global = '';
		this.props.navigation.navigate('Home');
	}
	
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
				
				{/* Profile menu link */}
				<TouchableHighlight 
					underlayColor='#dddddd'
					onPress={ () => this.props.navigation.navigate('Profile')}
				>
					<View style={{ flexDirection: 'row', marginLeft: 20}}>	
						<Icon 
							name="account-circle"
							size={26}
							color="darkgrey"
						/>	
						<Text style={styles.menuitem}>
							Profile
						</Text>
					</View>
				</TouchableHighlight>	
				
				{/* About menu link */}
				<View style={{ flexDirection: 'row', marginLeft: 20}}>	
					<Icon 
						name="info"
						size={26}
						color="darkgrey"
					/>	
					<Text style={styles.menuitem}>
						About
					</Text>
				</View>

				{/* Logout menu link */}
				<TouchableHighlight 
					underlayColor='#dddddd'
					onPress={this._pressLogout}
				>
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
				</TouchableHighlight>

				{/* confirm logout dialog box */}
				<View>
					<Dialog.Container visible={this.state.logoutDialogVisible}>
						<Dialog.Title>Item delete</Dialog.Title>
						<Dialog.Description>
							Are you sure you want to logout?
						</Dialog.Description>
						<Text 
							style={{ 
								fontSize: 16,
								color: 'red',
								marginLeft: 13 
							}}>
							{this.state.item_text}
						</Text>
						<Dialog.Button label="Cancel" onPress={this.handleCancel} />
						<Dialog.Button label="Logout" onPress={this.handleLogout} />
					</Dialog.Container>
				</View>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#dddddd',
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
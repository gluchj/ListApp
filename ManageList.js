import React from 'react';
import { KeyboardAvoidingView, StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { ListItem, Button, Input, Card } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ManageList extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = { 
			isLoading: true,
			deleteDialogVisible: false,
			username: params.user.username,
			endpoint: params.endpoint,
			list: params.list,
			dataSource: '',
			user: '',
		}
	}
	
	/* Load Flatlist with user 'List' data */	
	componentDidMount() {
		this.fetchData();
	}
	
	/* fetch Lists for the selected user */
	fetchData() {
		this.setState({ isLoading: true });
		return fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/' + this.state.list.listID + '/members')
			.then((response) => response.json())
			.then((responseJson) => {
				//if (responseJson.data === undefined || responseJson.data.length == 0) {
				if (responseJson.data === undefined) {
					this.setState({ isLoading: false });
				}
				else {
					this.setState({ dataSource: responseJson.data });
					this.setState({ isLoading: false });
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}

	/* onChangeText for share with new member input */
	changeName = (name) => {
		this.setState({ user: name });
	}
	
	/* show delete user from list dialog box */
	handleDeleteDialog(u) {
		this.setState({ user: u });
		this.setState({ deleteDialogVisible: true });
	}
	
	/* hide dialogs and set user to null on cancel */
	handleCancel = () => {
		this.setState({ 
			deleteDialogVisible: false,
			user: '',
		});
	}
	
	/* remove user from list via api call */
	handleDelete = () => {
		this.setState({ isLoading: true });
		this.setState({ deleteDialogVisible: false });
		return fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/' + this.state.list.listID + '/members', {
			method: 'DELETE',
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
	
	/* add user to list via api call */
	handleUpdate = () => {
		this.setState({ isLoading: true });
		return fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/' + this.state.list.listID + '/members', {
			method: 'PUT',
			headers: { 'Content-Type': 'text/plain', },
			body: this.state.user								
		})
		.then((responseJson) => {
			this.setState({ user: '' });
			this.fetchData();
			this.setState({ isLoading: false });
		})
		.catch((error) => {
			this.setState({ user: '' });
			console.error(error);
			this.setState({ isLoading: false });
		});
	}

	/* returns the remove link for each shared user */
	renderRightElement(u) {
		return (
		<Text
			style={{color: 'red'}}
			onPress={ () => this.handleDeleteDialog(u) }
		>
			Remove
		</Text>
		);
	}

	/* navigationOptions is used to set topbar icons & actions */
	static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Share Settings',
		}
	}

	/* renders API fetch data once retrieved */
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

						{/* topmost card - list details */}
						<Card
							title='LIST'
							titleStyle={{ fontSize: 16 }} >
							<View style={{flexDirection: 'column'}}>
								<View style={{flexDirection: 'row', alignItems: 'center' }}>
									<Text style={{ color: 'lightgrey', fontSize: 14, fontWeight: 'bold', margin: 6,}}>
										NAME:
									</Text>
									<Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', margin: 6, }}>
										{this.state.list.list_name}
									</Text>
								</View>
								<View style={{flexDirection: 'row', alignItems: 'center' }}>
									<Text style={{ color: 'lightgrey', fontSize: 14, fontWeight: 'bold', margin: 6,}}>
										LIST ID:
									</Text>
									<Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', margin: 6, }}>
										{this.state.list.listID}
									</Text>
								</View>
							</View>
						</Card>
						
						{/* current list members card */}
						<Card	title='USERS' titleStyle={{ fontSize: 16, }}>
						{
							this.state.dataSource.map((u) => {
								return (
									<ListItem
										key={u.userID}
										title={u.username}
										style={{ alignItems: 'center', }}
										leftIcon={{ name: 'account-circle' }}						
										rightElement={this.renderRightElement(u)}
									/>
								);
							})
						}
						</Card>

						{/* share with new user card */}
						<Card>
							<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<Input
									placeholder='Add new user'
									containerStyle={{ width: '80%' }}
									onChangeText={this.changeName}
								/>
								<Icon
									name='plus'
									size={30}
									color='green'
									onPress={this.handleUpdate}
								/>
							</View>
						</Card>
						
						{/* confirm list delete dialog box */}
						<View>
							<Dialog.Container visible={this.state.deleteDialogVisible}>
								<Dialog.Title>Item delete</Dialog.Title>
								<Dialog.Description>
									Are you sure you want to remove this user?
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
								<Dialog.Button label="Delete" onPress={this.handleDelete} />
							</Dialog.Container>
						</View>
					<View style={{ flex : 1, marginBottom: 80 }} />
				</View>
			</KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'gainsboro',
  },
	paragraph: {
		fontSize: 16,
		marginBottom: 6,
		marginLeft: 12,
	}
});

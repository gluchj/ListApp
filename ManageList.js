import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { ListItem, Button, Input, Card } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ManageList extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = { 
			isLoading: true,
			username: params.user.username,
			list: params.list,
			dataSource: '',
		}
	}
	
	/* Load Flatlist with user 'List' data */	
	componentDidMount() {
		this.fetchData();
	//	this.props.navigation.setParams({ addList: this._addButtonPress });
	}
	
	/* fetch Lists for the selected user */
	fetchData() {
		this.setState({ isLoading: true });
		return fetch('http://67.172.87.92:8080/rest/api/users/' + this.state.username + '/lists/' + this.state.list.listID + '/members')
			.then((response) => response.json())
			.then((responseJson) => {
				//if (responseJson.data === undefined || responseJson.data.length == 0) {
				if (responseJson.data === undefined) {
					this.setState({ isLoading: false });
				}
				else {
					this.setState({ dataSource: responseJson.data });
					this.setState({ isLoading: false });
					//this.props.navigation.navigate('Lists', {data: responseJson.data, user: this.state.username});
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}

	/* load next screen passing user touch selection */
	_selectItem(item) {
		this.props.navigation.navigate('Items', {
			user: this.state.username,
			list: item.listID
		});
	}

	_longPressItem(item) {
		this.setState({ isVisible: true });
		this.setState({ selectedItem: item });
	}
	
	handleDeleteDialog = () => {
		this.setState({ isVisible: false });
		this.setState({ deleteDialogVisible: true });
	}
	
	_addButtonPress = () => {
		this.setState({ addListDialogVisible: true });
	}
	
	handleCancel = () => {
		this.setState({ 
			addListDialogVisible: false,
			deleteDialogVisible: false,
			isVisible: false,
			selectedItem: '',
		});
	}
	
	handleDelete = () => {
		this.setState({ isLoading: true });
		this.setState({ deleteDialogVisible: false });
		return fetch('http://67.172.87.92:8080/rest/api/users/' + this.state.username + '/lists/' + this.state.selectedItem.listID, {
			method: 'DELETE',
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

	/* returns the remove link for each shared user */
	renderRightElement() {
		return (
		<Text
			style={{color: 'red'}}
			onPress={ () => { } }
		>
			Remove
		</Text>
		);
	}

	/* navigationOptions is used to set topbar icons & actions */
	static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Manage List',
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
      <View style={styles.container}>
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
				
				<Card	title='USERS' titleStyle={{ fontSize: 16, }}>
				{
					this.state.dataSource.map((u) => {
						return (
							<ListItem
								key={u.userID}
								title={u.username}
								style={{ alignItems: 'center', }}
								leftIcon={{ name: 'account-circle' }}						
								rightElement={this.renderRightElement()}
							/>
						);
					})
				}
				</Card>
			
				<Card>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Input
							placeholder='Add new user'
							containerStyle={{ width: '80%' }}
						/>
						<Icon
							name='plus'
							size={30}
							color='green'

							onPress={this.handleUpdate}
						/>
					</View>
				</Card>
			
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
	paragraph: {
		fontSize: 16,
		marginBottom: 6,
		marginLeft: 12,
	}
});

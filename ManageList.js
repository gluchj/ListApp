import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { ListItem, Button, Input, Card } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ManageList extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = { 
			isLoading: false,
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
		return fetch('http://67.172.87.92:8080/rest/api/users/')
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
					title='List Info'>
					<Text>List ID: {this.state.list.listID}</Text>
					<Text>List Name: {this.state.list.list_name}</Text>
				</Card>
				
				<Card	title='Sharing'>
				{
					this.state.dataSource.map((u, i) => {
						return (
							<listItem
								key={i}
								title={u.username}
							/>
						);
					})
				}
				</Card>
			
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C0',
  },
});

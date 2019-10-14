/**
	* ListContent component displays items from a list for
	* viewing, sharing, and deleting.
	* 
	* joel gluch, joel.gluch@gmail.com
  **/

import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { ListItem, Button, Input } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';

export default class ListContent extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = { 
			isLoading: false,
			isVisible: false,
			username: params.user.username,
			endpoint: params.endpoint,
			dataSource: '',
			deleteDialogVisible: false,
			addListDialogVisible: false,
			listname: '',
			selectedItem: '',
		}
	}
	
	/* Load Flatlist with user 'List' data */	
	componentDidMount() {
		this.fetchData();
		this.props.navigation.setParams({ addList: this._addButtonPress });
	}
	
	/* fetch Lists for the selected user */
	fetchData() {
		this.setState({ isLoading: true });
		return fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/')
			.then((response) => response.json())
			.then((responseJson) => {
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

	/* load next screen passing user touch selection */
	_selectItem(item) {
		this.props.navigation.navigate('Items', {
			user: this.state.username,
			list: item.listID,
			endpoint: this.state.endpoint,
		});
	}

	/* display add List dialog box on + press */
	_addButtonPress = () => {
		this.setState({ addListDialogVisible: true });
	}

	/* display list options dialog (share, delete, cancel) on long press */
	_longPressItem(item) {
		this.setState({ isVisible: true });
		this.setState({ selectedItem: item });
	}

	/* display share modal when user presses "share" button */
	_manageList = () => {
	this.setState({ isVisible: false });
		this.props.navigation.navigate('ManageList', {
			user: this.state.username,
			list: this.state.selectedItem,
			endpoint: this.state.endpoint,
		});
	}
	
	/* display list deletion confirmation box */
	handleDeleteDialog = () => {
		this.setState({ isVisible: false });
		this.setState({ deleteDialogVisible: true });
	}

	/* any cancel button press hides all dialogs/modals */
	handleCancel = () => {
		this.setState({ 
			addListDialogVisible: false,
			deleteDialogVisible: false,
			isVisible: false,
			selectedItem: '',
		});
	}
	
	/* perform rest call to endpoint for new list creation */
	handleCreate = () => {
		this.setState({ isLoading: true });
		this.setState({ addListDialogVisible: false });
		fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify ({ "listName": this.state.listname })
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
	
	/* perform rest call to endpoint for list deletion */
	handleDelete = () => {
		this.setState({ isLoading: true });
		this.setState({ deleteDialogVisible: false });
		return fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/' + encodeURIComponent(this.state.selectedItem.listID), {
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
	
	/* onChangeText handler for new list input box */
	changeText = (listname) => {
		this.setState({ listname: listname });
	}
	
	/* defines the separator line used by ItemSeparatorComponent */
	renderSeparator = () => {
		return (
			<View style={{height: 1, width: "92%", backgroundColor: "orangered"}}
			/>
		);
	};

	/* navigationOptions is used to set topbar icons & actions */
	static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Lists',
      headerLeft: 
				<Icon 
					name="list"
					size={25}
					color="#FFF"
					style= {{ marginLeft: 18 }}
					onPress = {navigation.toggleDrawer} 
				/>,
      headerRight: (
        <Icon
					name="plus"
					size={25}
					color="#FFF"
					style= {{ marginRight: 18 }}
					onPress={navigation.getParam('addList')}
				/>
      ),
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
				<NavigationEvents
					onWillFocus={payload => this.fetchData()}
				/>
			
				<FlatList
					data={ this.state.dataSource }
					keyExtractor={ item => item.listID }
					renderItem={({item}) => (
						<TouchableHighlight 
							underlayColor='#dddddd'
							onPress={ () => this._selectItem(item)}
							onLongPress={ () => this._longPressItem(item)}
						>
							<ListItem
								title={ `${item.list_name}` }
								titleStyle={ styles.list }
							/>
						</TouchableHighlight>
					)}
					ItemSeparatorComponent={this.renderSeparator}
				/>
				{/* list options menu for share and delete */}
				<Modal 
					isVisible={this.state.isVisible}
					avoidKeyboard={true}
					backdropColor={'#000'}
					backdropOpacity={.7}
					style={{ padding: 0 }}
				>	
					<View style={styles.content}>
						<Button
							type='outline'
							title='Share'
							buttonStyle={{ marginTop: 15, marginBottom: 15, }}
							titleStyle={{width: '80%'}}
							onPress={this._manageList}
						/>
						<Button
							type='outline'
							title='Delete'
							buttonStyle={{ marginTop: 15, marginBottom: 15, }}
							titleStyle={{width: '80%',  color: 'red'}}
							onPress={this.handleDeleteDialog}
						/>
						<Button
							type='outline'
							title='Cancel'
							buttonStyle={{ marginTop: 15, marginBottom: 15, }}
							titleStyle={{width: '80%'}}
							onPress={this.handleCancel}
						/>
					</View>
				</Modal>	
				
				 {/* add new list input dialog box */}
				<View>
					<Dialog.Container visible={this.state.addListDialogVisible}>
						<Dialog.Title>Create List</Dialog.Title>
						<Dialog.Input
							onChangeText={this.changeText}
							placeholder='Enter new list name'
							style={{ 
								borderColor: 'black',
								borderBottomWidth: 1, 
								fontSize: 16,
							}}
						/>
						<Dialog.Button label="Cancel" onPress={this.handleCancel} />
						<Dialog.Button label="Create" onPress={this.handleCreate} />
					</Dialog.Container>
				</View>
				
				{/* confirm list delete dialog box */}
				<View>
					<Dialog.Container visible={this.state.deleteDialogVisible}>
						<Dialog.Title>List delete</Dialog.Title>
						<Dialog.Description>
							Are you sure you want to delete this list and all items in it?
						</Dialog.Description>
						<Dialog.Button label="Cancel" onPress={this.handleCancel} />
						<Dialog.Button label="Delete" onPress={this.handleDelete} />
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
  },
	list: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#474A51',
	},
	content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

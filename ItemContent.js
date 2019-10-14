/**
	* ItemContent component displays item details screen for
	* creating, editing an item from a list.
	* 
	* joel gluch, joel.gluch@gmail.com
  **/

import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { Button, ListItem, Overlay, Input, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import Dialog from 'react-native-dialog';
import Modal from 'react-native-modal';


export default class ItemContent extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = {
			isLoading: false,
			isVisible: false,
			deleteDialogVisible: false,
			isUpdate: false,
			username: params.user,
			endpoint: params.endpoint,
			list: params.list,
			dataSource: '',
			item_text: '',
			qty: '',
			note: '',
		}
	}
	
	/* Load Flatlist with user 'List' data */	
	componentDidMount() {
		this.fetchItems();
	}
	
	/* fetchItems() retrieves all items for the selected list */
	fetchItems() {
		this.setState({ isLoading: true });
		return fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/' + this.state.list)
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
	
	/* onChangeText for item_text (name) input */
	changeItemName = (name) => {
		this.setState({ item_text: name });
	}
	
	/* onChangeText for item qty input */
	changeItemQty = (qty) => {
		this.setState({ qty: qty});
	}
	
	/* onChangeText for item note input */
	changeItemNote = (note) => {
		this.setState({ note: note });
	}
	
	/* load next screen passing user touch selection */
	_selectItem(item) {
		//this.setState({ selectedItem: item });
		this.setState({ item_text: item.item_text, qty: item.qty, note: item.note });
		this.setState({ isVisible: true, });
		this.setState({ isUpdate: true, });
	}
	
	/* show new item modal when + is clicked */
	_addItem() {
		this.setState({ isVisible: true, });
	}
	
	/* hide all modal/dialog boxes on cancel */
	handleCancel = () => {
		this.setState({ isVisible: false, });
		this.setState({ deleteDialogVisible: false, });
		this.setState({ isUpdate: false, });
		//this.setState({ selectedItem: '' });
		this.setState({ item_text: '', qty: '', note: '' });
	}
	
	/* api call to delete selected item */
	handleDelete = () => {
		this.setState({ isLoading: true });
		this.setState({ deleteDialogVisible: false });
		return fetch(this.state.endpoint + '/users/' + this.state.username
								  + '/lists/' + this.state.list + '/' + encodeURIComponent(this.state.item_text), {
			method: 'DELETE',
		})
		.then((responseJson) => {
			this.setState({ item_text: '', qty: '', note: '' });
			this.fetchItems();
			this.setState({ isLoading: false });
		})
		.catch((error) => {
			this.setState({ item_text: '', qty: '', note: '' });
			console.error(error);
			this.setState({ isLoading: false });
		});
	}
	
	/* api call to add item (POST) or update item (PUT) */
	handleCreate = () => {
  	let Method = 'POST';
		this.setState({ isLoading: true });
		this.setState({ isVisible: false });
		if(this.state.isUpdate) {
			Method = 'PUT';
		}
		fetch(this.state.endpoint + '/users/' + this.state.username + '/lists/' + this.state.list, {
			method: Method,
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify ({ "listID": this.state.list,
															"itemText": this.state.item_text,
															"qty": this.state.qty,
															"note": this.state.note })								
		})
		.then((responseJson) => {
			this.setState({ item_text: '', qty: '', note: '' });
			this.fetchItems();
			this.setState({ isLoading: false });
			this.setState({ isUpdate: false });
		})
		.catch((error) => {
			this.setState({ item_text: '', qty: '', note: '' });
			console.error(error);
			this.setState({ isLoading: false });
			this.setState({ isUpdate: false });
		});
	}

	/* display item details modal with selected item */
	_longPressItem(item) {
		this.setState({ deleteDialogVisible: true });
		//this.setState({ selectedItem: item });
		this.setState({ item_text: item.item_text, qty: item.qty, note: item.note });
	}
	
	/* defines the separator line used by ItemSeparatorComponent */
	renderSeparator = () => {
		return (
			<View style={{height: 1, width: "92%", backgroundColor: "orangered"}}/>
		);
	};
	
	/* set topbar nav options i.e. just the title in this case */
	static navigationOptions = { title: 'Items', };
	
	/* renders API fetch data once retrieved */
  render() {
		if(this.state.isLoading) {
			return(
				<View style={styles.container}>
					<ActivityIndicator/>
				</View>
			)
		}
		
    return (
      <View style={styles.container}>
				<FlatList
					data={ this.state.dataSource }
					keyExtractor={ item => item.item_text }
					renderItem={({item}) => (
						<TouchableHighlight 
							underlayColor='#dddddd' 
							onPress={ () => this._selectItem(item)}
							onLongPress={ () => this._longPressItem(item)}
						>
							<ListItem
								title={ `${item.item_text} (qty: ${item.qty})` }
								subtitle={ item.note }
							/>
						</TouchableHighlight>
					)}
					ItemSeparatorComponent={this.renderSeparator}
				/>
				{/* modal to add/update item with details */}
				<Modal 
					isVisible={this.state.isVisible}
					avoidKeyboard={true}
					backdropColor={'white'}
					backdropOpacity={1.0}
					coverScreen={false}
				>	
					<View style={{ flex: 1}}>
						<Input
							label='Item'
							onChangeText={this.changeItemName}
							value={this.state.item_text}
							editable={!this.state.isUpdate}
							containerStyle={{ marginBottom: 25, borderColor: 'black', }}
						/>
						<Input
							label='Qty'
							onChangeText={this.changeItemQty}
							value={this.state.qty}
							containerStyle={{ marginBottom: 25, borderColor: 'black', }}
						/>
						<Input
							label='Note'
							onChangeText={this.changeItemNote}
							value={this.state.note}
							containerStyle={{ marginBottom: 25, borderColor: 'black', }}
						/>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<Button
								title='Cancel'
								buttonStyle={{ backgroundColor: 'red', }}
								titleStyle={{width: '45%'}}
								onPress={this.handleCancel}
							/>
							<Button
								title='Submit'
								buttonStyle={{ backgroundColor: 'blue', }}
								titleStyle={{width: '45%'}}
								onPress={this.handleCreate}
							/>
						</View>
					</View>
				</Modal>

				{/* confirm list delete dialog box */}
				<View>
					<Dialog.Container visible={this.state.deleteDialogVisible}>
						<Dialog.Title>Item delete</Dialog.Title>
						<Dialog.Description>
							Are you sure you want to delete the below item?
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
				
				{/* floating + button to add new item to list */}
				<ActionButton buttonColor='orangered' onPress={ () => this._addItem()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

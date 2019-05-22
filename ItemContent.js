import React from 'react';
import { ScrollView, StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { Button, ListItem, Overlay, Input } from 'react-native-elements';
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
			username: params.user,
			list: params.list,
			dataSource: '',
			selectedItem: '',
		}
	}
	
	/* Load Flatlist with user 'List' data */	
	componentDidMount() {
		this.fetchItems();
	}
	
	/* fetchItems() retrieves all items for the selected list */
	fetchItems() {
		this.setState({ isLoading: true });
		return fetch('http://67.172.87.92:8080/rest/api/users/' + this.state.username + '/lists/' + this.state.list)
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
	
	/* load next screen passing user touch selection */
	_selectItem(item) {
		this.setState({ selectedItem: item });
		this.setState({ isVisible: true, });
	}
	
	_addItem() {
		this.setState({ isVisible: true, });
	}
	
	handleCancel = () => {
		this.setState({ isVisible: false, });
		this.setState({ deleteDialogVisible: false, });
	}
	
	handleDelete = () => {
		/*TODO add item to list, close dialog box */
	}
	
	handleCreate = () => {
/*		this.setState({ isLoading: true });
		this.setState({ isVisible: false });
		fetch('http://67.172.87.92:8080/rest/api/users/' + this.state.username + '/lists/' + this.state.list, {
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
		});   */
	}
	
	_onButtonPress = () => {
		this.setState({ isVisible: false, });
	}
	
	_longPressItem(item) {
		this.setState({ deleteDialogVisible: true });
		this.setState({ selectedItem: item });
	}
	
	/* defines the separator line used by ItemSeparatorComponent */
	renderSeparator = () => {
		return (
			<View style={{height: 1, width: "92%", backgroundColor: "orangered"}}/>
		);
	};
	
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
								title={ ` ${item.item_text} (qty: ${item.qty})` }
								subtitle={ item.note }
							/>
						</TouchableHighlight>
					)}
					ItemSeparatorComponent={this.renderSeparator}
				/>
				
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
							value={this.state.selectedItem.item_text}
							containerStyle={{ marginBottom: 25, borderColor: 'black', }}
						/>
						<Input
							label='Qty'
							value={this.state.selectedItem.qty}
							containerStyle={{ marginBottom: 25, borderColor: 'black', }}
						/>
						<Input
							label='Note'
							value={this.state.selectedItem.note}
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
						<Dialog.Title>List delete</Dialog.Title>
						<Dialog.Description>
							Are you sure you want to delete this list and all items in it?
						</Dialog.Description>
						<Dialog.Button label="Cancel" onPress={this.handleCancel} />
						<Dialog.Button label="Delete" onPress={this.handleDelete} />
					</Dialog.Container>
				</View>

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

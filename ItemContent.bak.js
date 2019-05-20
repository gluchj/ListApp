import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Alert, TouchableHighlight } from 'react-native';
import { Header, ListItem, Overlay, Input } from 'react-native-elements';

export default class ItemContent extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = {
			isLoading: false,
			isVisible: false,
			username: params.user,
			list: params.listID,
			dataSource: params.data
		}
	}
	
	/* load next screen passing user touch selection */
	_selectItem(item) {
		Alert.alert("listID: " + item.listID + "\nItem: " + item.item_text + "\nQty: " + item.qty + "\nNote: " + item.note);
	}
	
	/* defines the separator line used by ItemSeparatorComponent */
	renderSeparator = () => {
		return (
			<View style={{height: 1, width: "92%", backgroundColor: "orangered"}}
			/>
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
				
				<Header
					placement="left"
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'List Application', style: {color: '#fff'} }}
					rightComponent={{ icon: 'home', color: '#fff' }}
					containerStyle={{ backgroundColor: 'orangered', }}
				/>
				
				<FlatList
					data={ this.state.dataSource }
					keyExtractor={ item => item.item_text }
					renderItem={({item}) => (
						<TouchableHighlight underlayColor='#dddddd' onPress={ () => this._selectItem(item)}>
							<ListItem
								title={ ` ${item.item_text} (qty: ${item.qty})` }
								subtitle={ item.note }
							/>
						</TouchableHighlight>
					)}
					ItemSeparatorComponent={this.renderSeparator}
				/>
				
				<Overlay isVisible={this.state.isVisible} style={styles.overlay}>
					<Text>This is the item</Text>
				</Overlay>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
	overlay: {
		flex: 1,
	},
});

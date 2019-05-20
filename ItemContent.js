import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { Button, ListItem, Overlay, Input } from 'react-native-elements';

export default class ItemContent extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = {
			isLoading: false,
			isVisible: false,
			username: params.user,
			list: params.listID,
			dataSource: params.data,
			selectedItem: '',
		}
	}
	
	/* load next screen passing user touch selection */
	_selectItem(item) {
		this.setState({ selectedItem: item });
		this.setState({ isVisible: true, });
	}
	
	_onButtonPress = () => {
		this.setState({ isVisible: false, });
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
					<View style={styles.container}>
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
						<Button
							title='Submit'
							buttonStyle={styles.button}
							titleStyle={{width: '100%'}}
							onPress={this._onButtonPress}
						/>
					</View>
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

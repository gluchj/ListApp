import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { Header, ListItem, Overlay, Input } from 'react-native-elements';

export default class ItemContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLoading: true}
		this.state = {isVisible: false}
	}
	
	/* executes fetch to API endpoint on load */
	componentDidMount() {
		const { params } = this.props.navigation.state;
		return fetch('http://67.172.87.92:8080/rest/api/users/' + params.user + '/lists/' + params.list)
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson.data);
				this.setState({
					isLoading: false,
					dataSource: responseJson.data,
				})
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	/* load next screen passing user touch selection */
	_selectItem(item) {
		//this.setState({ isVisible: true });
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
					leftComponent={{ icon: 'home', color: '#fff' }}
					centerComponent={{ text: 'List Application', style: {color: '#fff'} }}
					rightComponent={{ icon: 'menu', color: '#fff' }}
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

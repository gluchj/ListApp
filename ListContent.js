import React from 'react';
import { Alert, StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListContent extends React.Component {
	constructor(props) {
		super(props);
		const { params } = this.props.navigation.state;
		this.state = { 
			isLoading: false,
			username: params.user,
			dataSource: params.data
		}
	}
	
	/* load next screen passing user touch selection */
	_selectItem(item) {
		this.setState({ isLoading: true });
		return fetch('http://67.172.87.92:8080/rest/api/users/' + this.state.username + '/lists/' + item.listID)
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.data === undefined || responseJson.data.length == 0) {
					this.setState({ isLoading: false });
				}
				else {
					this.setState({ isLoading: false });
					this.props.navigation.navigate('Items', 
						{
							data: responseJson.data, 
							user: this.state.username,
							list: item.listID
						});
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}
	
	/* defines the separator line used by ItemSeparatorComponent */
	renderSeparator = () => {
		return (
			<View style={{height: 1, width: "92%", backgroundColor: "orangered"}}
			/>
		);
	};
	
	static navigationOptions = {
		header: null
	

//		headerTitle: 'Lists',
//		headerLeft: (<Button
//								title="Home"
//									color="orangered"
//									icon={
//										<Icon
//											name="list"
//											size={18}
//											color="white"
//										/>
//									}
//								/>
//			<Button	
//				onPress={ () => Alert.alert('This is a button!')}
//				title="Info"
//			/>
//		),
	};
	
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
			
				<Header
					placement="left"
					leftComponent={{ icon: 'menu', color: '#fff' }}
					centerComponent={{ text: 'List Application', style: {color: '#fff', fontSize: 20} }}
					rightComponent={{ icon: 'home', color: '#fff' }}
					containerStyle={{ backgroundColor: 'orangered', }}
				/>
			
				<FlatList
					data={ this.state.dataSource }
					keyExtractor={ item => item.listID }
					renderItem={({item}) => (
						<TouchableHighlight underlayColor='#dddddd' onPress={ () => this._selectItem(item)}>
							<ListItem
								title={ `${item.listID}: ${item.list_name}` }
							/>
						</TouchableHighlight>
					)}
					ItemSeparatorComponent={this.renderSeparator}
				/>
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

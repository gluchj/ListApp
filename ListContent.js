import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { Header, ListItem } from 'react-native-elements';

export default class ListContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLoading: true}
	}
	
	/* executes fetch to API endpoint on load */
	componentDidMount() {
		const { params } = this.props.navigation.state;
		return fetch('http://67.172.87.92:8080/rest/api/users/' + params.user + '/lists')
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
		const { params } = this.props.navigation.state;
		this.props.navigation.navigate('Items', {list: item.listID, user: params.user});
	}
	
	/* defines the separator line used by ItemSeparatorComponent */
	renderSeparator = () => {
		return (
			<View style={{height: 1, width: "92%", backgroundColor: "orangered"}}
			/>
		);
	};
	
	static navigationOptions = { title: 'Lists', };
	
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

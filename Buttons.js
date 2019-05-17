import React, {Component }from 'react';
import { StyleSheet, Text, TextInput, Button } from 'react-native';
import { Alert, View, Image, Keyboard } from 'react-native';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this._onPressButton = this._onPressButton.bind(this);
	}
	
	_onPressButton(navStr) {
		this.props.navigation.navigate(navStr, {});
	}

	static navigationOptions = { title: 'Buttons Page', };

	render() {
    return (
      <View style={styles.container}>
				<View style={{width: "80%", height: "100%", justifyContent: 'space-evenly'}}>
					
					<Button
						onPress={ () => this._onPressButton('Users')}			
						title="Users"
						color="orangered"
					/>
					
					<Button
						onPress={ () => this._onPressButton('Lists')}		
						title="Lists"
						color="blue"
					/>
					
					<Button
						onPress={this._onPressButton}			
						title="Items"
						color="gray"
					/>
					
					<Button
						onPress={this._onPressButton}			
						title="Nothing"
						color="purple"
					/>
					
				</View>	
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

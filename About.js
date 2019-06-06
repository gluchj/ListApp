import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { Text, View, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class About extends Component {

	/* Navigate back to Lists page */
	handleBack = () => {
		this.props.navigation.navigate('Lists');
	}
	
	render() {
		return (
			<View style={styles.container}>
				
				<ImageBackground
					source={require('./assets/splash.png')}
					style={{ width: '100%', height: '100%', }}
					imageStyle={{opacity: 0.25}}>
					
					<View style={styles.page}>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text style={{ color: 'darkgrey', fontSize: 22, }}>
								Title:
							</Text>
							<Text style={{ color: 'orangered', fontWeight: 'bold', fontSize: 28, paddingLeft: 10 }}>
								List.App
							</Text>
						</View>
						
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text style={{ color: 'darkgrey', fontSize: 16, }}>
								Version:
							</Text>
							<Text style={{ color: 'orangered', fontWeight: 'bold', fontSize: 22, paddingLeft: 10 }}>
								1.0.0
							</Text>
						</View>
						
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text style={{ color: 'darkgrey', fontSize: 16, }}>
								Author:
							</Text>
							<Text style={{ color: 'orangered', fontWeight: 'bold', fontSize: 22, paddingLeft: 10 }}>
								Joel Gluch
							</Text>
						</View>
						
						<View style={{marginTop: 400, marginBottom: 25}}>
							<Text style={{ color: 'orangered', fontWeight: 'bold', fontSize: 18, paddingLeft: 10 }}>
								joel.gluch@gmail.com
							</Text>
						</View>
						<Button
							type='outline'
							title='Back'
							buttonStyle={{ }}
							titleStyle={{width: '40%'}}
							onPress={this.handleBack}
						/>
					</View>
				</ImageBackground>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#dddddd',
	},
	page: {
		padding: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
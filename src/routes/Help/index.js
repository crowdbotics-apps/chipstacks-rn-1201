import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import PropTypes from 'prop-types';

import { AppContext, Navbar } from 'app/components';

import styles from './style';

class HelpScreen extends Component {
  leftHandler = () => {
    this.props.navigation.goBack();
  };

  handleEmailClick = () => {
    Linking.canOpenURL('mailto:admin@lensengage.com').then(() => {
      Linking.openURL('mailto:admin@lensengage.com');
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-arrow-back"
          leftHandler={this.leftHandler}
          title="Help"
        />
        <View style={styles.content}>
          <Text style={styles.text}>
            Please contact{' '}
            <Text style={styles.email} onPress={this.handleEmailClick}>
              admin@lensengage.com
            </Text>{' '}
            if you have any questions or suggestions
          </Text>
        </View>
      </View>
    );
  }
}

HelpScreen.contextType = AppContext;

HelpScreen.propTypes = {
  navigation: PropTypes.object
};

export default HelpScreen;

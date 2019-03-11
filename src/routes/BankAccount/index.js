import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import PropTypes from 'prop-types';

import { AppContext, Navbar } from 'app/components';

import styles from './style';

class BankAccountScreen extends Component {
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
          title="Bank Account"
        />
        <View style={styles.content} />
      </View>
    );
  }
}

BankAccountScreen.contextType = AppContext;

BankAccountScreen.propTypes = {
  navigation: PropTypes.object
};

export default BankAccountScreen;

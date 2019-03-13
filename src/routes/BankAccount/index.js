import React, { Component } from 'react';
import { View, Text, Linking, WebView } from 'react-native';
import PropTypes from 'prop-types';
import PlaidAuthenticator from 'react-native-plaid-link';
import { AppContext, Navbar } from 'app/components';
import { PLAID_PUBLIC_KEY, PLAID_ENV, PLAID_PRODUCT } from 'app/constant';
import styles from './style';

class BankAccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }
  leftHandler = () => {
    this.props.navigation.goBack();
  };

  onMessage = (data) => {
    this.setState({ data });
    console.log(data);
  };

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey={PLAID_PUBLIC_KEY}
        env={PLAID_ENV}
        product={PLAID_PRODUCT}
        clientName="Catalin Miron"
        selectAccount={true}
      />
    );
  }

  renderDetails() {
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-arrow-back"
          leftHandler={this.leftHandler}
          title="Bank Account"
        />
        <View style={styles.content}>
          <View style={styles.container}>
            <Text>
              Institution: {this.state.data.metadata.institution.name}
            </Text>
            <Text>
              Institution ID:{' '}
              {this.state.data.metadata.institution.institution_id}
            </Text>
            <Text>Token: {this.state.data.metadata.public_token}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    switch (this.state.data.action) {
      case 'plaid_link-undefined::connected':
        return this.renderDetails();
      case 'plaid_link-undefined::exit':
        return this.props.navigation.goBack();
      default:
        return this.renderLogin();
    }
  }
}

BankAccountScreen.contextType = AppContext;

BankAccountScreen.propTypes = {
  navigation: PropTypes.object
};

export default BankAccountScreen;

import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppContext, Button, Navbar } from 'app/components';

const dm = Dimensions.get('screen');

import styles from './style';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    this.reload();
  }

  reload = async () => {
    await this.context.showLoading();

    this.context.hideLoading();
  };

  leftHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  goToGameCreate = () => {
    this.props.navigation.navigate('gamecreate');
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-menu"
          leftHandler={this.leftHandler}
          title="Dashboard"
        />
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.signupBtn}
            textStyle={styles.signup}
            text="Host Game"
            icon="plus"
            onPress={this.goToGameCreate}
          />
        </View>
      </View>
    );
  }
}

MainScreen.contextType = AppContext;

MainScreen.propTypes = {
  navigation: PropTypes.object
};

export default MainScreen;

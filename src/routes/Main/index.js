import React, { Component } from 'react';
import { View, Dimensions, Text, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import { AppContext, Button, Navbar } from 'app/components';
import { GameController } from 'app/controllers';

import LogoIcon from 'app/assets/images/logo.png';
const dm = Dimensions.get('screen');

import styles from './style';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    };
  }

  async componentDidMount() {
    this.reload();
  }

  reload = async () => {
    await this.context.showLoading();
    const games = await GameController.getGames();
    console.log(games);
    await this.setState({ games });
    this.context.hideLoading();
  };

  rightHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  goToGameCreate = () => {
    this.props.navigation.navigate('gamecreate');
  };

  renderGameRow(item) {
    console.log(item);
    return (
      <View style={styles.listItem} key={item.id}>
        <Avatar
          rounded
          title={item.name}
          style={styles.avatar}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
          }}
        />
        <View style={styles.listRight}>
          <Text style={styles.itemText}>
            {item.admin.firstName + ' ' + item.admin.lastName}
            is invited you to play 5/10 Dealer choice at {item.place}{' '}
            {item.createdAt}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { games } = this.state;
    return (
      <View style={styles.container}>
        <Navbar
          right="ios-settings"
          left="ios-notifications"
          rightHandler={this.rightHandler}
          title="Dashboard"
        />

        {games.length === 0 ? (
          <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
        ) : (
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={styles.balance} />
              <View style={styles.history} />
            </View>
            <View style={styles.bottom}>
              <View style={styles.list} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                containerStyle={styles.signupBtn}
                textStyle={styles.signup}
                text="Host Game"
                icon="plus"
                onPress={this.goToGameCreate}
              />
            </View>
            <View style={styles.gameList}>
              <FlatList
                data={games}
                renderItem={({ item }) => this.renderGameRow(item)}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

MainScreen.contextType = AppContext;

MainScreen.propTypes = {
  navigation: PropTypes.object
};

export default MainScreen;

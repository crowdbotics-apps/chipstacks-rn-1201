import React, { Component } from 'react';
import { View, Dimensions, Text, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import firebase from 'react-native-firebase';
import { AppContext, Button, Navbar } from 'app/components';
import { GameController } from 'app/controllers';
import LogoIcon from 'app/assets/images/logo.png';
import styles from './style';

const Auth = firebase.auth();
const uid = Auth.currentUser.uid;
const dm = Dimensions.get('screen');
class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      loading: false
    };
  }

  async componentDidMount() {
    this.reload();
  }

  reload = async () => {
    await this.context.showLoading();
    await this.setState({ loading: true });
    let games = [];
    const allGames = await GameController.getGames();
    allGames &&
      allGames.length !== 0 &&
      (await allGames.map(async (game) => {
        if (game.admin.id === uid) {
          return games.push(game);
        } else {
          let myGame = false;
          game.players &&
            game.players.length !== 0 &&
            (await game.players.map(async (player) => {
              if (player.userId === uid) {
                myGame = true;
              }
            }));
          if (myGame) {
            return games.push(game);
          }
        }
      }));
    await this.setState({ games });
    await this.setState({ loading: false });
    this.context.hideLoading();
  };

  rightHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  accept = async (game) => {
    await this.context.showLoading();
    await GameController.acceptGame(game);
    await this.reload();
    this.context.hideLoading();
  };

  decline = async (game) => {
    await this.context.showLoading();
    await GameController.declineGame(game);
    await this.reload();
    this.context.hideLoading();
  };

  goToGameCreate = () => {
    this.props.navigation.navigate('gamecreate');
  };

  renderGameRow(item) {
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
            {`${item.admin.firstName} ${
              item.admin.lastName
            } is invited you to play 5/10 Dealer choice at ${
              item.place
            } The Country Club ${item.date} ${item.time}`}
          </Text>
          <View style={styles.acceptContainer}>
            <Button
              containerStyle={styles.acceptBtn}
              textStyle={styles.accept}
              text="Accept"
              onPress={() => this.accept(item)}
            />
            <Button
              containerStyle={styles.declineBtn}
              textStyle={styles.decline}
              text="Decline"
              onPress={() => this.decline(item)}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { games, loading } = this.state;
    return (
      <View style={styles.container}>
        <Navbar
          right="ios-settings"
          left="ios-notifications"
          rightHandler={this.rightHandler}
          title="Dashboard"
        />

        {!loading && (
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={styles.balance}>
                <Text style={styles.topText}>Balance</Text>
              </View>
              <View style={styles.history}>
                <Text style={styles.topText}>History</Text>
              </View>
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
            {games.length === 0 ? (
              <Image
                source={LogoIcon}
                style={styles.logo}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.gameList}>
                <FlatList
                  data={games}
                  renderItem={({ item }) => this.renderGameRow(item)}
                />
              </View>
            )}
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

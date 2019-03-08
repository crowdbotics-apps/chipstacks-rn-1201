import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import { AppContext, Navbar } from 'app/components';
import { CampaignController, AnswerController } from 'app/controllers';

import styles from './style';

import NoLogoImage from 'app/assets/images/logo.png';

class RewardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPoints: 0,
      data: []
    };

    this.props.navigation.addListener('willFocus', async (payload) => {
      await this.reload();
    });
  }

  leftHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  reload = async () => {
    this.context.showLoading();
    let data = await CampaignController.getCampaigns();
    let tasks = data.map((campaign) => {
      return AnswerController.getAnswerByUserCampaign(campaign.id);
    });
    let answers = await Promise.all(tasks);
    data = data.map((campaign, index) => ({
      ...campaign,
      answer: answers[index]
    }));
    data = data.filter((campaign) => {
      if (!campaign.answer) return false;
      return campaign.answer.complete;
    });
    let totalPoints = 0;
    data.map((campaign) => {
      totalPoints += campaign.answer.reward;
    });
    this.setState({ data, totalPoints });
    this.context.hideLoading();
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.logoContainer}>
          {item.logo ? (
            <FastImage
              source={{ uri: item.logo }}
              style={styles.logo}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Image
              source={NoLogoImage}
              style={styles.logo}
              resizeMode="cover"
            />
          )}
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.reward}>{item.answer.reward}pts</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-menu"
          leftHandler={this.leftHandler}
          title="Rewards"
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Total: {this.state.totalPoints} points
          </Text>
          <FlatList
            style={styles.list}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            extraData={this.state}
          />
        </View>
      </View>
    );
  }
}

RewardScreen.contextType = AppContext;

RewardScreen.propTypes = {
  navigation: PropTypes.object
};

export default RewardScreen;

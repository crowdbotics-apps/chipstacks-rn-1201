import React, { Component } from 'react';
import { View, FlatList, Image, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

let dm = Dimensions.get('screen');

import { AppContext, Navbar, Button } from 'app/components';
import { CampaignController, AnswerController } from 'app/controllers';

import styles from './style';

import NoLogoImage from 'app/assets/images/logo.png';

class ContestScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      campaigns: [],
      answers: [],
      completeness: [],
      campaignsData: [],
      answersData: [],
      completenessData: []
    };
  }

  async componentDidMount() {
    let campaigns = await CampaignController.getCampaigns();

    this.setState({ campaigns }, async () => {
      await this.reload();
    });
  }

  reload = async () => {
    this.context.showLoading();
    let tasks = this.state.campaigns.map((campaign) => {
      return AnswerController.getAnswerByUserCampaign(campaign.id);
    });
    let answersData = await Promise.all(tasks);

    // calculating completeness for campaign answers
    let completeness = [];
    answersData.map((item) => {
      if (!item) {
        completeness.push(0);
        return;
      }
      let answers = item.answers;
      let count = 0;
      Object.keys(answers).forEach((key) => {
        if (answers[key] === '') {
          return;
        }
        if (answers[key] === -1) {
          return;
        }
        if (answers[key].length === 0) {
          return;
        }
        count++;
      });
      completeness.push(count / Object.keys(answers).length);
    });

    this.setState(
      {
        completeness,
        answers: answersData
      },
      () => {
        this.filter();
      }
    );
    this.context.hideLoading();
  };

  filter = () => {
    let { campaigns, answers, completeness, selectedTab } = this.state;
    let selCampaignsData = [],
      selAnswersData = [],
      selCompletenessData = [];
    campaigns.map((campaign, index) => {
      if (selectedTab === 0 && completeness[index]) return;
      selCampaignsData.push(campaign);
      selAnswersData.push(answers[index]);
      selCompletenessData.push(completeness[index]);
      return;
    });
    this.setState({
      campaignsData: selCampaignsData,
      answersData: selAnswersData,
      completenessData: selCompletenessData
    });
  };

  leftHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  handleTabChange = (index) => {
    this.setState({ selectedTab: index }, () => {
      this.filter();
    });
  };

  handleCampaignPress = (campaign) => () => {
    this.props.navigation.navigate('contestdetails', {
      campaign,
      reload: this.reload
    });
  };

  renderCampaign = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.item_name}>{item.name}</Text>

        {item.logo ? (
          <FastImage
            source={{ uri: item.logo }}
            style={styles.item_logo}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Image
            source={NoLogoImage}
            style={styles.item_logo}
            resizeMode="cover"
          />
        )}
        <Progress.Bar
          progress={this.state.completenessData[index]}
          width={dm.width / 2 - 30}
          height={10}
          color="#81A8D2"
          borderColor="#81A8D2"
        />
        <Text style={styles.item_point}>
          {this.state.answersData[index]
            ? `${this.state.answersData[index].reward} / ${
                item.total_points
              } points`
            : `0 / ${item.total_points} points`}
        </Text>
        <Button
          containerStyle={styles.item_button}
          text={
            this.state.answersData[index]
              ? this.state.answersData[index].complete
                ? 'Completed'
                : 'Proceed'
              : 'Proceed'
          }
          textStyle={styles.item_buttontext}
          onPress={this.handleCampaignPress(item)}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-menu"
          leftHandler={this.leftHandler}
          title="Contests"
        />
        <SegmentedControlTab
          values={['New', 'All']}
          selectedIndex={this.state.selectedTab}
          onTabPress={this.handleTabChange}
          tabsContainerStyle={styles.tabContainer}
          tabStyle={styles.tab}
          activeTabStyle={styles.activeTab}
        />
        <FlatList
          style={styles.list}
          numColumns={2}
          data={this.state.campaignsData}
          keyExtractor={(item) => item.id}
          renderItem={this.renderCampaign}
          extraData={this.state}
        />
      </View>
    );
  }
}

ContestScreen.contextType = AppContext;

ContestScreen.propTypes = {
  navigation: PropTypes.object
};

export default ContestScreen;

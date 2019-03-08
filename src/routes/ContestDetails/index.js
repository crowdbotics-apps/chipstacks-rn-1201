import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { CheckBox } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

import { AppContext, Navbar, Button } from 'app/components';
import { CampaignController, AnswerController } from 'app/controllers';

import styles from './style';

import NoLogoImage from 'app/assets/images/logo.png';

class ContestDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      mediaStates: [],
      answers: {},
      complete: false
    };

    this.players = {};
  }

  async componentDidMount() {
    let campaignId = this.props.navigation.state.params.campaign.id;
    let data = await CampaignController.getCampaignById(campaignId);
    let answersData = await AnswerController.getAnswerByUserCampaign(
      campaignId
    );
    let answers = {},
      complete = false;
    if (answersData) {
      answers = answersData['answers'];
      complete = answersData['complete'];
    } else {
      answers = {};
      data.questions.map((question, index) => {
        switch (question.type) {
          case 0:
            answers[`${index}`] = '';
            break;
          case 1:
            answers[`${index}`] = -1;
            break;
          case 2:
            answers[`${index}`] = [];
            break;
          default:
            break;
        }
        return;
      });
    }
    let mediaStates = Array(data.questions.length).fill(true);
    this.setState({
      data,
      answers,
      complete,
      mediaStates
    });
  }

  leftHandler = () => {
    this.props.navigation.goBack();
  };

  handleSubmit = async () => {
    let { data, answers } = this.state;
    let complete = true;
    let count = 0;
    data.questions.map((question, index) => {
      switch (question.type) {
        case 0:
          if (answers[index] === '') {
            complete = false;
            return;
          }
          break;
        case 1:
          if (answers[index] === -1) {
            complete = false;
            return;
          }
          break;
        case 2:
          if (answers[index].length === 0) {
            complete = false;
            return;
          }
          break;
        default:
          break;
      }
      count++;
    });
    let reward = parseInt(
      (count / Object.keys(answers).length) *
        this.props.navigation.state.params.campaign.total_points
    );
    await AnswerController.updateAnswers(
      this.props.navigation.state.params.campaign.id,
      answers,
      reward,
      complete
    );
    await this.props.navigation.state.params.reload();
    this.props.navigation.goBack();
  };

  playVideo = (index) => () => {
    let { mediaStates } = this.state;
    mediaStates[index] = false;
    this.setState({ mediaStates });
    this.players[`${index}`].seek(0);
    this.players[`${index}`].presentFullscreenPlayer();
  };

  stopVideo = (index) => () => {
    let { mediaStates } = this.state;
    mediaStates[index] = true;
    this.setState({ mediaStates });
  };

  handleRadioClick = (qIndex, radioIndex) => () => {
    let { answers } = this.state;
    answers[qIndex] = radioIndex;
    this.setState({ answers });
  };

  handleCheckClick = (qIndex, checkIndex) => () => {
    let { answers } = this.state;
    let index = answers[qIndex].findIndex((item) => item === checkIndex);
    if (index === -1) {
      answers[qIndex].push(checkIndex);
    } else {
      answers[qIndex].splice(index, 1);
    }
    this.setState({ answers });
  };

  handleOpenQuestionChange = (qIndex) => (value) => {
    let { answers } = this.state;
    answers[qIndex] = value;
    this.setState({ answers });
  };

  renderQuestion = (question, index) => {
    return (
      <View key={`${index}`} style={styles.questionItem}>
        <Text style={styles.qLabel}>
          <Text style={styles.qQuestionDetails}>{question.question}</Text>
        </Text>
        {question.media_type &&
          (question.media_type.includes('image/') ? (
            <FastImage
              source={{ uri: question.media }}
              style={styles.qImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <View style={styles.qVideoContainer} />
          ))}
        {question.type === 0 && (
          <TextInput
            style={styles.qAnswerInput}
            placeholder="Type your answer here"
            value={this.state.answers[index]}
            onChangeText={this.handleOpenQuestionChange(index)}
          />
        )}

        {question.type === 1 && (
          <View style={styles.qRadio}>
            {question.answers.map((answer, answerIndex) => (
              <CheckBox
                key={answerIndex}
                title={answer}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={answerIndex === this.state.answers[index]}
                onPress={this.handleRadioClick(index, answerIndex)}
                containerStyle={styles.qRadio}
              />
            ))}
          </View>
        )}
        {question.type === 2 && (
          <View style={styles.qCheck}>
            {question.answers.map((answer, checkIndex) => (
              <CheckBox
                key={checkIndex}
                title={answer}
                checked={this.state.answers[index].includes(checkIndex)}
                onPress={this.handleCheckClick(index, checkIndex)}
                containerStyle={styles.qCheck}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  render() {
    let { data } = this.state;

    return (
      <View style={styles.container}>
        <Navbar
          left="ios-arrow-back"
          leftHandler={this.leftHandler}
          title="Answers"
        />
        {data && (
          <KeyboardAwareScrollView style={styles.scrollContainer}>
            <View style={styles.content}>
              <Text style={styles.title}>{data.name}</Text>
              <FastImage
                style={styles.logo}
                source={data.logo ? { uri: data.logo } : NoLogoImage}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.dateContainer}>
                <View style={styles.from}>
                  <Text style={styles.label}>Start</Text>
                  <Text style={styles.date}>
                    {moment(data.from).format('YYYY-MM-DD')}
                  </Text>
                </View>
                <View style={styles.to}>
                  <Text style={styles.label}>End</Text>
                  <Text style={styles.date}>
                    {moment(data.to).format('YYYY-MM-DD')}
                  </Text>
                </View>
              </View>
              <View style={styles.qContainer}>
                {data.questions.map((question, index) =>
                  this.renderQuestion(question, index)
                )}
              </View>
              {!this.state.complete && (
                <Button
                  containerStyle={styles.submitBtn}
                  textStyle={styles.submit}
                  text="Submit"
                  onPress={this.handleSubmit}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    );
  }
}

ContestDetailsScreen.contextType = AppContext;

ContestDetailsScreen.propTypes = {
  navigation: PropTypes.object
};

export default ContestDetailsScreen;

import React from 'react';
import { View, Image, TextInput, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';

import { AuthController } from 'app/controllers';
import { AppContext, Button } from 'app/components';
import { alert } from 'app/utils/Alert';

import styles from './style';

class GameCreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      buyin: '',
      rebuy: '',
      fee: ''
    };
  }

  inputChanged = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  login = async () => {
    let { email, password } = this.state;

    if (password.length < 6) {
      alert('Password should be longer than 6 letters!');
      return;
    }

    try {
      this.context.showLoading();
      let user = await AuthController.login({
        email,
        password
      });
      if (!user.user.emailVerified) {
        await AuthController.sendEmailVerification();
        alert('Verification email is sent. Please verify email first.');
      } else {
        this.props.navigation.navigate('main');
      }
      this.context.hideLoading();
    } catch (error) {
      this.context.hideLoading();
      alert(error.message);
    }
  };

  render() {
    return (
      <ScrollView>
        <View contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <View style={styles.newGame}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Create New Game</Text>
              </View>
              <View style={styles.rowContent}>
                <View style={styles.column}>
                  <DatePicker
                    showIcon={false}
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="Start date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2026-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                    }}
                    style={{
                      marginTop: 20
                    }}
                    onDateChange={(date) => {
                      this.setState({ date: date });
                    }}
                  />
                  <DatePicker
                    showIcon={false}
                    is24Hour={true}
                    style={{ width: 200 }}
                    date={this.state.time}
                    mode="time"
                    placeholder="Start time"
                    format="HH:MM"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                    }}
                    style={{
                      marginTop: 20
                    }}
                    onDateChange={(time) => {
                      this.setState({ time: time });
                    }}
                  />
                </View>
                <View style={styles.column}>
                  <TextInput
                    style={styles.input}
                    placeholder="Buy In*"
                    value={this.state.buyin}
                    autoCapitalize="none"
                    keyboardType={'numeric'}
                    onChangeText={(value) => this.inputChanged('buyin', value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Rebuy*"
                    value={this.state.rebuy}
                    autoCapitalize="none"
                    keyboardType={'numeric'}
                    onChangeText={(value) => this.inputChanged('rebuy', value)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Game Fee"
                    value={this.state.fee}
                    autoCapitalize="none"
                    keyboardType={'numeric'}
                    onChangeText={(value) => this.inputChanged('fee', value)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.newGame}>
              <View style={styles.title}>
                <Text style={styles.titleText}>List of Players</Text>
              </View>
              <View style={styles.rowContent} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
GameCreateScreen.contextType = AppContext;

GameCreateScreen.propTypes = {
  navigation: PropTypes.object
};

export default GameCreateScreen;

import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import MultiSelect from 'react-native-multiple-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GameController, UserController } from 'app/controllers';
import { AppContext, Button } from 'app/components';
import { alert } from 'app/utils/Alert';

import styles from './style';
import Colors from '../../theme/Colors';

const dm = Dimensions.get('screen');
class GameCreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      buyin: '',
      rebuy: '',
      fee: '',
      selectedItems: [],
      items: []
    };
  }

  async componentDidMount() {
    let items = [];
    await this.setState({ loading: true });
    await this.context.showLoading();
    const players = await UserController.getUsers();
    players &&
      players.length !== 0 &&
      (await players.map((user, index) => {
        return (
          user.active &&
          items.push({
            id: index,
            email: user.email,
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`
          })
        );
      }));

    const today = this.getToday();
    await this.setState({ minDate: today });
    await this.setState({ items });

    this.context.hideLoading();
    await this.setState({ loading: false });
  }

  onSelectedItemsChange = async (selectedItems) => {
    this.setState({ selectedItems });
    console.log(this.state.selectedItems);
    let players = [];
    selectedItems &&
      selectedItems.length !== 0 &&
      (await selectedItems.map(async (item) => {
        await this.state.items.map(async (user) => {
          if (user.userId === item) {
            user.status = 0; // invited; 1 - accepted
            players.push(user);
          }
        });
      }));

    await this.setState({ players });
    console.log(players);
  };

  inputChanged = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  create = async () => {
    let { date, time, buyin, rebuy, selectedItems } = this.state;
    if (date === '') {
      alert('Date can`t be zero');
      return;
    }

    if (time === '') {
      alert('Time can`t be zero');
      return;
    }

    if (!buyin || buyin <= 0) {
      alert('Buy In can`t be zero');
      return;
    }

    if (!rebuy || rebuy <= 0) {
      alert('Rebuy can`t be zero');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please invite players');
      return;
    }

    try {
      this.context.showLoading();
      const data = await this.state;
      await GameController.addGame(data);

      this.props.navigation.navigate('main');

      this.context.hideLoading();
    } catch (error) {
      this.context.hideLoading();
      alert(error.message);
    }
  };

  getToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    let tt = yyyy + '-' + mm + '-' + dd;
    return tt;
  }

  cancel = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { loading, items, selectedItems } = this.state;

    return (
      !loading && (
        <ScrollView>
          <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
              <View style={styles.newGame}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>Create New Game</Text>
                </View>
                <View style={styles.rowContent}>
                  <View style={styles.column}>
                    <TextInput
                      style={{
                        width: dm.width * 0.4,
                        height: 40,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: '#000',
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        fontSize: 16,
                        marginBottom: 20
                      }}
                      placeholder="Game Name*"
                      value={this.state.name}
                      autoCapitalize="none"
                      onChangeText={(value) => this.inputChanged('name', value)}
                    />
                    <DatePicker
                      showIcon={false}
                      style={{
                        width: dm.width * 0.4
                      }}
                      date={this.state.date}
                      mode="date"
                      placeholder="Start date"
                      format="YYYY-MM-DD"
                      minDate={this.state.minDate}
                      maxDate="2026-06-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={(date) => {
                        this.setState({ date: date });
                      }}
                    />
                    <DatePicker
                      showIcon={false}
                      is24Hour={true}
                      style={{ width: dm.width * 0.4, marginTop: 20 }}
                      date={this.state.time}
                      mode="time"
                      placeholder="Start time"
                      format="HH:MM"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
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
                      onChangeText={(value) =>
                        this.inputChanged('buyin', value)
                      }
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Rebuy*"
                      value={this.state.rebuy}
                      autoCapitalize="none"
                      keyboardType={'numeric'}
                      onChangeText={(value) =>
                        this.inputChanged('rebuy', value)
                      }
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
                <View style={styles.rowContent}>
                  <View style={{ flex: 1, margin: 24 }}>
                    <MultiSelect
                      hideTags
                      items={items}
                      uniqueKey="userId"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={selectedItems}
                      selectText="Select players"
                      searchInputPlaceholderText="Search Players..."
                      onChangeInput={(text) => console.log(text)}
                      altFontFamily=""
                      tagRemoveIconColor="red"
                      tagBorderColor={Colors.ButtonColor}
                      tagTextColor={Colors.ButtonColor}
                      selectedItemTextColor={Colors.ButtonColor}
                      selectedItemIconColor={Colors.ButtonColor}
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: '#CCC' }}
                      submitButtonColor={Colors.ButtonColor}
                      submitButtonText="Add"
                    />
                    <View>
                      {this.multiSelect &&
                        this.multiSelect.getSelectedItemsExt(selectedItems)}
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.rowContent}>
                <View style={styles.buttonColumn}>
                  <Button
                    containerStyle={styles.createBtn}
                    textStyle={styles.login}
                    text="Create"
                    onPress={this.create}
                  />
                </View>
                <View style={styles.buttonColumn}>
                  <Button
                    containerStyle={styles.cancelBtn}
                    textStyle={styles.login}
                    text="Cancel"
                    onPress={this.cancel}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      )
    );
  }
}
GameCreateScreen.contextType = AppContext;

GameCreateScreen.propTypes = {
  navigation: PropTypes.object
};

export default GameCreateScreen;

import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';

import { AppContext, Navbar } from 'app/components';
import { AuthController } from 'app/controllers';
import { alert } from 'app/utils/Alert';

import styles from './style';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpswd: ''
    };

    // this.props.navigation.addListener('didFocus', this.onFocus);
  }

  async componentDidMount() {
    this.context.showLoading();
    const user = await AuthController.me();
    await this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      confirmpswd: ''
    });
    this.context.hideLoading();
  }

  // onFocus = (payload) => {
  //   let curUser = firebase.auth().currentUser;
  //   this.setState({
  //     firstName: curUser.displayName,
  //     email: curUser.email,
  //     password: '',
  //     confirmpswd: ''
  //   });
  // };

  leftHandler = () => {
    this.props.navigation.goBack();
  };

  rightHandler = async () => {
    if (!this.validate()) {
      return;
    }
    try {
      this.context.showLoading();
      await AuthController.updateUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password
      });
      this.context.hideLoading();
      this.props.navigation.goBack();
    } catch (error) {
      this.context.hideLoading();
      alert(error.message);
    }
  };

  validate = () => {
    let { firstName, password, confirmpswd } = this.state;
    if (!firstName) {
      alert("First Name can't be empty!");
      return false;
    }
    if ((!password && confirmpswd) || (password && !confirmpswd)) {
      alert("Password can't be empty!");
      return false;
    }
    if (password !== confirmpswd) {
      alert("Password doesn't match!");
      return false;
    }
    if (password.length < 6 && password.length > 0) {
      alert('Password should be longer than 6 letters!');
      return false;
    }
    return true;
  };

  inputChanged = (key) => (text) => {
    this.setState({ [key]: text });
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Navbar
            left="ios-arrow-back"
            leftHandler={this.leftHandler}
            title="Profile"
            right="Done"
            rightHandler={this.rightHandler}
          />
          <View style={styles.content}>
            <View style={styles.item}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Type first name here"
                // autoFocus={true}
                autoCapitalize="none"
                value={this.state.firstName}
                onChangeText={this.inputChanged('firstName')}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Type last name here"
                // autoFocus={true}
                autoCapitalize="none"
                value={this.state.lastName}
                onChangeText={this.inputChanged('lastName')}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, styles.disabled]}
                autoCapitalize="none"
                editable={false}
                value={this.state.email}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={this.inputChanged('password')}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.confirmpswd}
                onChangeText={this.inputChanged('confirmpswd')}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

ProfileScreen.contextType = AppContext;

ProfileScreen.propTypes = {
  navigation: PropTypes.object
};

export default ProfileScreen;

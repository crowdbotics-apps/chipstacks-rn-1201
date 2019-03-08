import React from 'react';
import { View, Image, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthController } from 'app/controllers';
import { AppContext, Button } from 'app/components';
import { alert } from 'app/utils/Alert';

import styles from './style';
import LogoIcon from 'app/assets/images/logo.png';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  inputChanged = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  goToSignUp = () => {
    this.props.navigation.navigate('signup');
  };

  goToForgotpswd = () => {
    this.props.navigation.navigate('forgotpassword');
  };

  login = async () => {
    let { email, password } = this.state;
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
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={this.state.email}
              autoCapitalize="none"
              onChangeText={(value) => this.inputChanged('email', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={this.state.password}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(value) => this.inputChanged('password', value)}
            />
            <Button
              containerStyle={styles.loginBtn}
              textStyle={styles.login}
              text="Log In"
              onPress={this.login}
            />
            <Button
              containerStyle={styles.forgotpswdBtn}
              textStyle={styles.forgotpswd}
              text="Forgot password?"
              onPress={this.goToForgotpswd}
            />
            <View style={styles.signupContainer}>
              <Text style={styles.description}>Do not have an account? </Text>
              <Button
                containerStyle={styles.signupBtn}
                textStyle={styles.signup}
                text="Sign Up"
                onPress={this.goToSignUp}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
LoginScreen.contextType = AppContext;

LoginScreen.propTypes = {
  navigation: PropTypes.object
};

export default LoginScreen;

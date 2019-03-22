import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
class Button extends Component {
  render() {
    const {
      containerStyle,
      text,
      textStyle,
      disabled,
      onPress,
      icon
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[containerStyle, styles.btnContainer]}
        onPress={onPress}
      >
        <Text style={textStyle}>
          {icon && <Icon name={icon} size={12} color="#000000" />}
          {'  '}
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  containerStyle: PropTypes.object,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Button;

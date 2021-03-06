import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import ThemeStyle from '../../theme/ThemeStyle';

class Navbar extends Component {
  render() {
    let { left, right, leftHandler, rightHandler, title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {left && (
            <TouchableOpacity style={styles.btn} onPress={leftHandler}>
              <Ionicons name={left} style={styles.left} size={24} />
            </TouchableOpacity>
          )}
        </View>
        <Avatar
          rounded
          title={title}
          style={styles.avatar}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
          }}
        />
        <View style={styles.rightContainer}>
          {right && (
            <TouchableOpacity style={styles.btn} onPress={rightHandler}>
              <Ionicons name={right} style={styles.right} size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    height: ThemeStyle.NavbarHeight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  leftContainer: {
    width: 60,
    alignItems: 'flex-start'
  },
  btn: {
    padding: 5
  },
  left: {
    fontSize: 22
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center'
  },
  rightContainer: {
    width: 60,
    alignItems: 'flex-end'
  },
  right: {
    fontSize: 22
  }
});

Navbar.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  title: PropTypes.string,
  leftHandler: PropTypes.func,
  rightHandler: PropTypes.func
};

export default Navbar;

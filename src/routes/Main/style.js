import { Dimensions, StyleSheet } from 'react-native';

let dm = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  top: {
    width: dm.width * 0.9,
    height: dm.height * 0.15,
    margin: dm.width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },
  balance: {
    backgroundColor: 'blue',
    width: dm.width * 0.43
  },
  history: {
    backgroundColor: 'green',
    width: dm.width * 0.43
  },
  bottom: {},
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: 40,
    alignSelf: 'center'
  },
  item_button: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#81A8D2'
  },
  item_buttontext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
});

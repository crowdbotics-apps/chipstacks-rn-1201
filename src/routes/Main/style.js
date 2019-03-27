import { Dimensions, StyleSheet } from 'react-native';
import ThemeStyle from '../../theme/ThemeStyle';

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
    margin: ThemeStyle.ContainerPadding,
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
    paddingHorizontal: 10,
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
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: dm.width * 0.6,
    height: dm.width * 0.6
  },
  gameList: {
    padding: ThemeStyle.ContainerPadding
  },
  listItem: {
    height: 100,
    borderBottomColor: '#ccc',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    flexDirection: 'row'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 25,
    justifyContent: 'center'
  },
  listRight: {
    width: dm.width * 0.8 - 100
  },
  itemText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../theme/Colors';

const dm = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  input: {
    width: dm.width * 0.3,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20
  },
  title: {
    marginTop: 50,
    width: '100%',
    height: 50,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000'
  },
  rowContent: {
    flexDirection: 'row'
  },
  column: {
    flex: 1
  }
});

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    alignSelf: 'center'
  },
  label: {
    fontSize: 24,
    color: '#555'
  },
  list: {
    marginTop: 20
  },
  item: {
    alignSelf: 'stretch',
    height: 75,
    marginBottom: 10,
    backgroundColor: '#81A8D2',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,

    shadowColor: '#555',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  logo: {
    width: 50,
    height: 50
  },
  name: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: '#fff'
  },
  reward: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10
  }
});

import { Dimensions, StyleSheet } from 'react-native';

let dm = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    alignSelf: 'center'
  },
  logo: {
    width: dm.width - 40,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  from: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center'
  },
  to: {
    flex: 1,
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    color: '#555'
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5
  },
  qContainer: {
    flex: 1
  },
  questionItem: {
    marginVertical: 20
  },
  qLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#555'
  },
  qImage: {
    width: dm.width - 40,
    height: 200,
    marginVertical: 10
  },
  qVideoContainer: {
    width: dm.width - 40,
    height: 200,
    marginVertical: 10
  },
  qVideo: {
    width: dm.width - 40,
    height: 200
  },
  qVideoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qVideoPlayBtn: {
    fontSize: 50,
    color: '#fff'
  },
  qQuestion: {
    fontSize: 18
  },
  qQuestionDetails: {
    fontWeight: '600'
  },
  qAnswerInput: {
    alignSelf: 'stretch',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    marginVertical: 5
  },
  qRadio: {
    marginVertical: 5
  },
  qRadioBtn: {
    marginBottom: 5
  },
  qCheck: {
    marginVertical: 5
  },
  submitBtn: {
    marginTop: 25,
    marginBottom: 25,
    alignSelf: 'center',
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#81A8D2'
  },
  submit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  }
});

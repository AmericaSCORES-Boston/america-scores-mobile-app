import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  containerPadding: {
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30
  },
  grayBg: {
    backgroundColor: "#EEEEF3"
  },
  whiteBg: {
    backgroundColor: "#FFFFFF"
  },
  white: {
    color: 'white'
  },
  textCenter: {
    alignSelf: 'center'
  },
  textAlignRight: {
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  loginButton: {
    marginTop: 30
  },
  largerText: {
    fontSize: 45
  },
  inputGroup: {
    paddingLeft: 15,
    backgroundColor: "#FFFFFF"
  },
  fillContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  mediumMarginTop: {
    marginTop: 20
  },
  disabled: {
    backgroundColor: "#CCC"
  },
  flexRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  flexRowLeft: {
    justifyContent: 'flex-start'
  },
  flexRowRight: {
    justifyContent: 'flex-end'
  },
  flexFull: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  flexAlignCenter: {
    alignItems: 'center'
  },
  flexAlignEnd: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  smallVerticalMargin: {
    marginVertical: 10
  },
  mediumVerticalMargin: {
    marginVertical: 25
  }
});

export default styles;
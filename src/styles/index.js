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
  errorRed: {
    color: '#ed2f2f'
  },
  bold: {
    fontWeight: 'bold'
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
  smallMarginTop: {
    marginTop: 5
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
  },
  gridList: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
      overflow:'hidden',
     // backgroundColor: 'skyblue',
     // height:400
  },


  gridItem: {
    backgroundColor: '#FFF',
    margin: 5,
    width: 70,
    height: 50,
    borderRadius: 5,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Added by Bhupendra
  /*  containerPacer: {
        marginTop: 65,
    },
    containerPacerPadding: {
        paddingTop: 15,
        paddingLeft: 30,
        paddingRight: 30
    },
    mediumMarginTopPacer: {
        marginTop: 20
    },

  largeText: {
    fontSize: 48
  }*/
});

export default styles;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  textThemed: {
    color: '#70db84',
  },
  textDanger: {
    color: '#EB4C3C',
  },
  container: {
    paddingRight: 24,
    paddingLeft: 24,
  },
  formLabel: {
    fontWeight: '700',
    marginBottom: 5,
  },
  formControl: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 20,
    height: 48,
    borderRadius: 5,
    marginBottom: 20,
  },
  btnThemed: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#404893',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  btnThemedRed: {
    backgroundColor: '#DA4040',
  },
  btnThemedOutline: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: '#39DE7A',
    borderWidth: 1,
    textAlign: 'center',
    alignItems: 'center',
    // padding: 12,
  },
  btnThemedTitle: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold'
  },
  alertDanger: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#EB4C3C',
    backgroundColor: 'rgba(218,64,64,0.7)',
    // backgroundColor: 'rgba(235,76,60,0.1)',
    // color: '#EB4C3C',
    // backgroundColor: '#DA4040',
    color: '#fff',
    marginBottom: 20,
  },
  alertInfo: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  logoutBtn: {
    marginLeft: 'auto',
    marginRight: 14,
  },
  logoutBtnText: {
    color: '#817D8E',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  closeBtn: {
    // borderRadius: 40,
    borderRadius: 10,
    // backgroundColor: '#555',
    borderColor: '#666',
    borderWidth: 2,
    // display: 'flex',
    // fontSize: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 40,
    // height: 40,
  },
});

export {styles};

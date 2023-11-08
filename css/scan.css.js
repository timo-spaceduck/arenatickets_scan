import {StyleSheet} from 'react-native';

const scanStyles = StyleSheet.create({
  QRWrapperStyle: {
    height: '100%',
    // marginTop: 20,
    marginBottom: 0,
  },
  QRShadow: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    zIndex: 5,
  },
  // QRBack: {
  //   backgroundColor: 'rgba(0,0,0,0.3)',
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   width: '100%',
  //   height: '100%'
  // },
  QRContainerStyle: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 3,
  },
  QRCameraStyle: {
    height: '100%',
    overflow: 'hidden',
  },
  QRMarkerStyle: {
    //   borderColor: 'red',
    //   borderRadius: 10,
  },
  QRMarkerStyleScanned: {
    borderColor: '#64C465',
    // transform: 'scale(0.8)',
  },
  QRCameraContainerStyle: {},
  infoWrap: {
    marginTop: 20,
  },
  onlineTop: {
    width: 10,
    height: 10,
    backgroundColor: '#64C465',
    borderRadius: 10,
  },
  offlineTop: {
    width: 10,
    height: 10,
    backgroundColor: '#EB4C3C',
    borderRadius: 10,
  },
  centeredView: {
    height: '90%',
    width: '100%',
    padding: 20,
    marginTop: 60,
  },
  modalClose: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalTop: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  modalTopInvalid: {
    backgroundColor: '#DA4040',
  },
  modalTopValid: {
    backgroundColor: '#39DE7A',
  },
  modalH: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
  },
  modalSectionBlock: {
    marginTop: 18,
    borderBottomWidth: 4,
    borderColor: '#061B3B',
  },
  modalSectionHeader: {
    color: '#061B3B',
    fontWeight: '500',
    fontSize: 20,
  },
  modalSectionLine: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalSectionText: {
    fontSize: 20,
    // flex: 1,
    flexWrap: 'wrap',
    color: '#817D8E',
    fontWeight: '500',
  },
});

export {scanStyles};

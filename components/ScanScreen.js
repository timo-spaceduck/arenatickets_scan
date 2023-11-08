import React, {useEffect, useRef, useState} from 'react';
import {View, Image, Dimensions, Button} from 'react-native';
import {useSelector} from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {getUniqueId} from 'react-native-device-info';
import {scanStyles} from '../css/scan.css';
import {useNetInfo} from '@react-native-community/netinfo';
import 'moment/min/locales';
import {
  apiSendScans,
  apiCheckBarcodeHistory,
  apiGetValidatedSummary,
} from '../services/fetch.service';
import {
  addObjectToStorage,
  getObjectFromStorage,
} from '../services/async-storage.service';
import BackBtn from './parts/BackBtn';
import ScanResult from './parts/scanResult';

const ScanScreen = ({navigation}) => {
  const event = useSelector(state => state.event.event);
  const tickets = useSelector(state => state.event.tickets);
  const [ticket, setTicket] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [searched, setSearched] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [justScanned, setJustScanned] = useState(false);
  const [secondsToCancel, setSecondsToCancel] = useState(0);
  const [validatedBarcodesAmount, setValidatedBarcodesAmount] = useState(0);
  const [barcodeHistory, setBarcodeHistory] = useState([]);
  const [scans, setScans] = useState([]);
  const [wHeight, setWHeight] = useState(0);
  const timeoutToCancel = 500; // in seconds
  const netInfo = useNetInfo();
  const cancelTimer = useRef();

  useEffect(() => {
    async function start() {
      // navigation.setOptions({title: event.show.title.ru});
      // navigation.setOptions({
      //   headerRight: () => (
      //     <View
      //       style={[
      //         netInfo.isConnected
      //           ? scanStyles.onlineTop
      //           : scanStyles.offlineTop,
      //       ]}
      //     />
      //   ),
      // });
      let scansFromAsync = await getObjectFromStorage('scans', []);
      setScans(scansFromAsync);
      await loadValidationSummary();
      startScan();
    }
    start().then();
    // setTimeout(() => {
    //   scanned({data: '0000007040543'});
    // }, 1000);
  }, [navigation, event, netInfo]);

  useEffect(() => {
    if (secondsToCancel < 1) {
      clearCancelTimeout();
      setTicket(null);
      setBarcode(null);
      setSearched(false);
      if (netInfo.isConnected) {
        sendScans();
      }
      return;
    }
    if (secondsToCancel > 1 && !cancelTimer.current) {
      cancelTimer.current = setInterval(() => {
        setSecondsToCancel(secondsToCancel => secondsToCancel - 1);
      }, 1000);
    }
  }, [secondsToCancel]);

  const scanned = async code => {
    if (code.data === barcode) {
      return;
    }
    clearCancelTimeout();
    setBarcode(code.data);
    setJustScanned(true);
    setTimeout(() => {
      setJustScanned(false);
    }, 500);
    // console.log('scanned', code.data);
    let ticketFound = tickets.find(t => t.barcode == code.data);
    // console.log(ticketFound);
    setSearched(true);
    setTicket(ticketFound);
    if (!ticketFound) {
      setBarcodeHistory([]);
      return;
    }
    let obj = {
      barcode: ticketFound.barcode,
      date: new Date(),
    };
    let tmpScans = JSON.parse(JSON.stringify(scans));
    tmpScans.push(obj);
    setScans(tmpScans);
    await addObjectToStorage('scans', tmpScans);
    startCancelTimeout();
    if (netInfo.isConnected) {
      try {
        const barcodeScans = await apiCheckBarcodeHistory(event.id, code.data);
        setBarcodeHistory(
          barcodeScans && barcodeScans.data ? barcodeScans.data : [],
        );
      } catch (e) {
        setBarcodeHistory([]);
      }
    } else {
      setBarcodeHistory([]);
    }
  };

  const startCancelTimeout = () => {
    clearCancelTimeout();
    setSecondsToCancel(timeoutToCancel);
    console.log('created cancel interval');
  };

  const loadValidationSummary = async () => {
    const d = await apiGetValidatedSummary(event.id);
    if (d && d.data) {
      setValidatedBarcodesAmount(d.data.barcodes);
    }
  };

  const clearCancelTimeout = () => {
    clearInterval(cancelTimer.current);
    cancelTimer.current = null;
  };

  const sendScans = async () => {
    let scansFromAsync = await getObjectFromStorage('scans', []);
    let deviceId = await getUniqueId();
    if (scansFromAsync.length) {
      try {
        let res = await apiSendScans(event.id, {
          scans: scansFromAsync,
          device_id: deviceId,
        });
        if (res.data && res.data.validated) {
          setValidatedBarcodesAmount(res.data.validated);
        }
        if (res.success) {
          console.log('sync scans success');
          setScans([]);
          await addObjectToStorage('scans', []);
          setTicket(null);
          // stopTimer();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const cancelLastScan = async () => {
    let scansFromAsync = await getObjectFromStorage('scans', []);
    if (scansFromAsync && scansFromAsync.length) {
      scansFromAsync.pop();
      setScans(scansFromAsync);
      await addObjectToStorage('scans', scansFromAsync);
    }
    setTicket(null);
    setBarcode(null);
    setSearched(false);
  };

  const startScan = () => {
    setScanning(true);
    setTicket(null);
    setBarcode(null);
    setSearched(false);
  };

  const closeModal = () => {
    startCancelTimeout();
    if (netInfo.isConnected) {
      sendScans().then();
    }
    startScan();
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('screen').height;
  const markerWidth = windowWidth * 0.9;

  const onLayout = e => {
    setWHeight(e.nativeEvent.layout.height);
  };

  const customMarker = (
    <Image
      source={require('../images/qrMarker.png')}
      style={{
        width: markerWidth - 16,
        height: markerWidth - 16,
      }}
    />
  );

  return (
    <View style={[{display: 'flex', height: '100%'}]}>
      <BackBtn navigation={navigation} />
      {/*<Button*/}
      {/*  title="wrong"*/}
      {/*  onPress={() => scanned({data: '123'})}*/}
      {/*  style={{position: 'absolute', top: 20, right: 20}}*/}
      {/*/>*/}
      {/*<Button title='right' onPress={() => scanned({data:'0001292725811'})} style={{position: 'absolute', top: 20, right: 20}}/>*/}
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          position: 'relative',
        }}>
        {scanning && (
          <View style={scanStyles.QRWrapperStyle} onLayout={onLayout}>
            <View
              style={[
                scanStyles.QRShadow,
                {
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: (wHeight - markerWidth) / 2,
                },
              ]}
            />
            <View
              style={[
                scanStyles.QRShadow,
                {
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: (wHeight - markerWidth) / 2,
                },
              ]}
            />
            <View
              style={[
                scanStyles.QRShadow,
                {
                  left: 0,
                  top: (wHeight - markerWidth) / 2,
                  width: (windowWidth - markerWidth) / 2,
                  height: markerWidth,
                },
              ]}
            />
            <View
              style={[
                scanStyles.QRShadow,
                {
                  right: 0,
                  height: markerWidth,
                  width: (windowWidth - markerWidth) / 2,
                  top: (wHeight - markerWidth) / 2,
                },
              ]}
            />
            <QRCodeScanner
              containerStyle={scanStyles.QRContainerStyle}
              cameraStyle={scanStyles.QRCameraStyle}
              cameraContainerStyle={scanStyles.QRCameraContainerStyle}
              markerStyle={[
                scanStyles.QRMarkerStyle,
                justScanned ? scanStyles.QRMarkerStyleScanned : '',
              ]}
              customMarker={customMarker}
              topViewStyle={{flex: 0}}
              bottomViewStyle={{flex: 0}}
              cameraType={'back'}
              reactivate={true}
              reactivateTimeout={2000}
              showMarker={true}
              onRead={scanned}
              flashMode={RNCamera.Constants.FlashMode.auto}
            />
          </View>
        )}
        <ScanResult
          ticket={ticket}
          barcode={barcode}
          searched={searched}
          barcodeHistory={barcodeHistory}
          onRequestClose={closeModal}
        />
        {/*{searched && (*/}
        {/*  <View style={{marginTop: 20, flex: 0, marginBottom: 0}}>*/}
        {/*    {ticket && (*/}
        {/*      <View style={styles.alertInfo}>*/}
        {/*        <Text>Номер заказа: {ticket.order_id}</Text>*/}
        {/*        <TouchableOpacity*/}
        {/*          onPress={cancelLastScan}*/}
        {/*          style={[styles.btnThemedOutline, {marginTop: 20}]}>*/}
        {/*          <Text style={styles.textThemed}>*/}
        {/*            Отменить это сканирование ({secondsToCancel})*/}
        {/*          </Text>*/}
        {/*        </TouchableOpacity>*/}
        {/*      </View>*/}
        {/*    )}*/}
        {/*  </View>*/}
        {/*)}*/}
      </View>
      {/*<View>*/}
      {/*  {scans && scans.length && !scanning ? (*/}
      {/*    <View style={{marginBottom: 20}}>*/}
      {/*      <TouchableOpacity onPress={sendScans} style={styles.btnThemed}>*/}
      {/*        <Text style={styles.btnThemedTitle}>*/}
      {/*          Отправить на сервер ({scans.length})*/}
      {/*        </Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*    </View>*/}
      {/*  ) : null}*/}
      {/*</View>*/}
    </View>
  );
};

export default ScanScreen;

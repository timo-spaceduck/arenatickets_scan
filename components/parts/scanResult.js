import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../../css/general.css';
import {scanStyles} from '../../css/scan.css';
import i18n from '../../services/localization';
import {useSelector} from 'react-redux';
import Moment from 'moment/moment';
import {apiGetOrderDetails} from '../../services/fetch.service';

const ScanResult = ({
  ticket,
  barcode,
  barcodeHistory,
  searched,
  onRequestClose,
}) => {
  const event = useSelector(state => state.event.event);
  const [order, setOrder] = useState(null);

  const renderBarcodeItem = ({item}) => (
    <View
      style={{
        marginBottom: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: '#817D8E'}}>
        {Moment(item.created_at).format('HH:mm')}
      </Text>
      <Text style={{fontSize: 20, color: '#817D8E'}}>
        {item.direction === 'out' ? i18n.out : i18n.in}
      </Text>
    </View>
  );

  const getOrderDetails = async () => {
    if (!ticket.order_id) {
      return;
    }
    try {
      const data = await apiGetOrderDetails(ticket.order_id);
      setOrder(data?.data?.order || null);
    } catch (e) {
      console.log(e);
    }
  };

  const requestClose = () => {
    setOrder(null);
    onRequestClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={searched}
      onRequestClose={requestClose}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: '100%',
        }}>
        <View
          style={[
            scanStyles.modalTop,
            ticket && !barcodeHistory.length
              ? scanStyles.modalTopValid
              : scanStyles.modalTopInvalid,
          ]}>
          {ticket && !barcodeHistory.length ? (
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 157, height: 157, marginHorizontal: 'auto'}}
                resizeMode="contain"
                source={require('../../images/scanRight.png')}
              />
              <Text style={scanStyles.modalH}>{i18n.valid}</Text>
            </View>
          ) : null}
          {!ticket || barcodeHistory.length ? (
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 157, height: 157, marginHorizontal: 'auto'}}
                resizeMode="contain"
                source={require('../../images/scanWrong.png')}
              />
              <Text style={scanStyles.modalH}>
                {barcodeHistory.length ? i18n.already_scanned : i18n.invalid}
              </Text>
            </View>
          ) : null}
        </View>
        {!order ? (
          <View style={styles.container}>
            {ticket ? (
              <View style={{marginTop: 18}}>
                <Text style={scanStyles.modalSectionHeader}>
                  {ticket.fullSeatName}
                </Text>
                <Text style={scanStyles.modalSectionHeader}>
                  {ticket.price} KZT
                </Text>
              </View>
            ) : null}
            <View style={scanStyles.modalSectionBlock}>
              <Text style={scanStyles.modalSectionHeader}>
                {i18n.ticket_info}
              </Text>
            </View>
            <View style={scanStyles.modalSectionLine}>
              <Text style={[scanStyles.modalSectionText, {}]}>
                {i18n.event_name}
              </Text>
              <Text style={[scanStyles.modalSectionText, {}]}>
                {event.show.title.ru}
              </Text>
            </View>
            <View style={scanStyles.modalSectionLine}>
              <Text style={scanStyles.modalSectionText}>
                {i18n.ticket_number}
              </Text>
              {ticket ? (
                <TouchableOpacity onPress={getOrderDetails}>
                  <Text
                    style={[
                      scanStyles.modalSectionText,
                      {textDecorationLine: 'underline'},
                    ]}>
                    {barcode}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={scanStyles.modalSectionText}>{barcode}</Text>
              )}
            </View>
            <View style={scanStyles.modalSectionBlock}>
              <Text style={scanStyles.modalSectionHeader}>
                {i18n.scan_history}
              </Text>
            </View>
            <FlatList
              style={{height: 100, marginTop: 18}}
              data={barcodeHistory}
              renderItem={renderBarcodeItem}
              keyExtractor={({id}, index) => id}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setOrder(null)} style={{}}>
              <Image
                source={require('../../images/back.png')}
                style={{
                  width: 48,
                  height: 48,
                  borderColor: '#000',
                  borderWidth: 2,
                  borderRadius: 48,
                }}
              />
            </TouchableOpacity>
            <View style={scanStyles.modalSectionBlock}>
              <Text style={scanStyles.modalSectionHeader}>{i18n.client}</Text>
            </View>
            <View style={scanStyles.modalSectionLine}>
              <Text style={scanStyles.modalSectionText}>{i18n.name}</Text>
              <Text style={scanStyles.modalSectionText}>{order.name}</Text>
            </View>
            <View style={scanStyles.modalSectionLine}>
              <Text style={scanStyles.modalSectionText}>{i18n.phone}</Text>
              <Text style={scanStyles.modalSectionText}>{order.phone}</Text>
            </View>
            <View style={scanStyles.modalSectionLine}>
              <Text style={scanStyles.modalSectionText}>Email</Text>
              <Text style={scanStyles.modalSectionText}>{order.email}</Text>
            </View>
          </View>
        )}

        <View style={{paddingBottom: 32, paddingLeft: 20, paddingRight: 20}}>
          <TouchableOpacity
            onPress={requestClose}
            style={[
              styles.btnThemed,
              !(ticket && !barcodeHistory.length) ? styles.btnThemedRed : '',
            ]}>
            <Text style={styles.btnThemedTitle}>{i18n.continue}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ScanResult;

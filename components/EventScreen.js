import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from '../css/general.css';
import {useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import Moment from 'moment';
import 'moment/min/locales';
import {apiGetValidatedSummary} from '../services/fetch.service';
import i18n from '../services/localization';
import BackBtn from './parts/BackBtn';

const EventScreen = ({navigation}) => {
  const event = useSelector(state => state.event.event);
  const tickets = useSelector(state => state.event.tickets);
  const [validatedBarcodesAmount, setValidatedBarcodesAmount] = useState(0);
  const netInfo = useNetInfo();

  useEffect(() => {
    async function start() {
      await loadValidationSummary();
    }
    start();
  }, [navigation, event, netInfo]);

  const loadValidationSummary = async () => {
    const d = await apiGetValidatedSummary(event.id);
    if (d && d.data) {
      setValidatedBarcodesAmount(d.data.barcodes);
    }
  };

  const startScan = () => {
    navigation.navigate('Scan');
  };

  return (
    <View
      style={[
        {
          display: 'flex',
          height: '100%',
          backgroundColor: '#fff',
          justifyContent: 'space-between',
        },
      ]}>
      <View style={{flexGrow: 1}}>
        <BackBtn navigation={navigation} />
        <Image
          source={{uri: event.banner}}
          style={{width: '100%', flexGrow: 1}}
        />
      </View>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 16,
            color: '#0C2A44',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {event.show.title[i18n.getLanguage()]}
        </Text>
        <View style={{marginTop: 16}}>
          <Text style={{color: '#0C2A44'}}>
            {Moment(event.date).format('DD.MM, HH:mm')}
          </Text>
          <Text
            style={{
              marginTop: 8,
              textDecorationLine: 'underline',
              color: '#6D7F8F',
            }}>
            {event.show.venue.title[i18n.getLanguage()]}
          </Text>
          {tickets && (
            <View style={{marginTop: 12}}>
              <Text style={{color: '#6D7F8F'}}>
                {i18n.tickets_sold}: {tickets.length}
              </Text>
              <Text style={{color: '#6D7F8F'}}>
                {i18n.validated}: {validatedBarcodesAmount}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={{flex: 0, paddingBottom: 30, marginTop: 30}}>
        <TouchableOpacity onPress={startScan} style={styles.btnThemed}>
          <Text style={styles.btnThemedTitle}>{i18n.start_scan}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventScreen;

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {styles} from '../css/general.css';
import {apiGetEventCodes, apiLoadEvents} from '../services/fetch.service';
import {eventStyles} from '../css/events.css';
import {useDispatch} from 'react-redux';
import {setEvent, setTickets} from '../store/event.store';
import Moment from 'moment';
import 'moment/min/locales';
import {
  addObjectToStorage,
  getObjectFromStorage,
} from '../services/async-storage.service';
import {useNetInfo} from '@react-native-community/netinfo';
import i18n from '../services/localization';
import {deleteTokenThunk} from '../store/auth.store';

const EventListScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const loadEvents = async () => {
    console.log('isConnected', netInfo.isConnected);
    if (netInfo.isConnected !== false) {
      const res = await apiLoadEvents();
      if (res && res.data) {
        setData(res.data);
        await addObjectToStorage('events', res.data);
      }
    }
    setLoading(false);
    setIsRefreshing(false);
  };

  const eventSelected = async item => {
    setLoading(true);
    if (netInfo.isConnected) {
      dispatch(setEvent(item));
      await addObjectToStorage('event', item);
      const res = await apiGetEventCodes(item.id);
      dispatch(setTickets(res.data));
      await addObjectToStorage('tickets', res.data);
    } else {
      const latestEvent = await getObjectFromStorage('event', null);
      if (latestEvent && latestEvent.id === item.id) {
        // not connected, but has in local
        const tickets = await getObjectFromStorage('tickets', []);
        dispatch(setTickets(tickets));
      } else {
        // not connected and does not have in local
        Alert.alert(i18n.no_connection, '', [
          {
            text: 'Ок',
            style: 'cancel',
          },
        ]);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    navigation.navigate('Event');
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    loadEvents();
  };

  const handleLogout = () => {
    Alert.alert(i18n.are_you_sure_you_want_to_exit, '', [
      {
        text: i18n.cancel,
        style: 'cancel',
      },
      {text: i18n.yes, onPress: () => dispatch(deleteTokenThunk())},
    ]);
  };

  useEffect(() => {
    async function start() {
      await getObjectFromStorage('events', []);
      await loadEvents();
    }
    start();
  }, []);

  Moment.locale('ru');

  const Item = ({item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={eventStyles.cell}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.teaser}}
          style={{width: 156, height: 130, borderRadius: 12}}
        />
        <View style={{marginLeft: 20, width: '100%', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              flexShrink: 1,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                flex: 1,
                color: '#0C2A44',
                flexWrap: 'wrap',
                width: '100%',
              }}>
              {item.show.title[i18n.getLanguage()]}
            </Text>
          </View>

          <Text style={{marginTop: 15, color: '#0C2A44'}}>
            {Moment(item.date).format('DD.MM, HH:mm')}
          </Text>
          {item.show.venue && (
            <Text
              style={{
                marginTop: 7,
                color: '#6D7F8F',
                textDecorationLine: 'underline',
              }}>
              {item.show.venue.title[i18n.getLanguage()]}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => eventSelected(item)} />
  );

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{height: '100%', backgroundColor: 'white'}}>
          <TouchableOpacity
            style={[styles.logoutBtn, {marginTop: 20}]}
            title={i18n.logout}
            onPress={() => handleLogout()}>
            <Text style={styles.logoutBtnText}>{i18n.logout}</Text>
          </TouchableOpacity>
          <FlatList
            style={{marginTop: 24, flexGrow: 1}}
            data={data}
            renderItem={renderItem}
            keyExtractor={({id}, index) => id}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
          />
        </View>
      )}
    </View>
  );
};

export default EventListScreen;

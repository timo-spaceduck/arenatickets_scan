import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {apiLogin} from '../services/fetch.service';
import {styles} from '../css/general.css';
import {setToken} from '../services/token.service';
import {useDispatch} from 'react-redux';
import {setUser} from '../store/auth.store';
import InputWithIcon from './parts/InputWithIcon';
import SelectDropdown from 'react-native-select-dropdown';
import i18n from '../services/localization';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [lang, setLang] = useState('ru');
  const languages = ['RO', 'RU'];

  const login = async () => {
    setError(null);
    let res = await apiLogin(email, password);
    if (res && res.message) {
      setError(res.message);
    }
    if (res && res.data && res.data.token) {
      setToken(res.data.token);
      dispatch(setUser(res.data.user));
    }
  };

  return (
      <View style={[styles.container, {marginTop: 30, textAlign: 'center'}]}>
        <Image
          source={require('../images/logo.png')}
          resizeMode="contain"
          style={{width: 264, marginLeft: 'auto', marginEnd: 'auto'}}
        />
        <InputWithIcon
          value={email}
          image={require('../images/person.png')}
          onChangeText={v => setEmail(v)}
          placeholder="Email"
        />
        <InputWithIcon
          value={password}
          image={require('../images/lock.png')}
          secureTextEntry={true}
          onChangeText={v => setPassword(v)}
          placeholder={i18n.password}
        />
        {error && (
          <Text onPress={() => setError(null)} style={styles.alertDanger}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          style={[styles.btnThemed, {marginTop: 20}]}
          title={i18n.login}
          onPress={() => login()}>
          <Text style={styles.btnThemedTitle}> {i18n.login} </Text>
        </TouchableOpacity>
      </View>
  );
};

export default LoginScreen;

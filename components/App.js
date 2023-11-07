// import "../services/ignoreWarnings";
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import EventListScreen from './EventListScreen';
import ScanScreen from './ScanScreen';
import store from '../store/store';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {deleteTokenThunk, logout, setUser} from '../store/auth.store';
import {apiGetProfile} from '../services/fetch.service';
import i18n from "../services/localization";
import EventScreen from "./EventScreen";

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App: () => Node = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (user) {
      return;
    }
    const res = await apiGetProfile();
    if (res && res.data && res.data.user) {
      dispatch(setUser(res.data.user));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Events"
              component={EventListScreen}
              options={{
                title: '',
                // headerTransparent: true,
                headerShown: false,
                // headerBackground: 'transparent',
                orientation: 'portrait_up',
                // headerRight: () => (
                //   <Button onPress={handleLogout} title={i18n.logout}
                //           color="transparent"
                //           buttonTextColor="red"/>
                // ),
              }}
            />
            <Stack.Screen
              name="Event"
              options={{
                title: '',
                headerShown: false,
                orientation: 'portrait_up'
              }}
              component={EventScreen}
            />
            <Stack.Screen
              name="Scan"
              options={{
                title: '',
                orientation: 'portrait_up',
                headerShown: false
                // headerTransparent: true,
              }}
              component={ScanScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{
                title: '',
                orientation: 'portrait_up',
                headerShown: false
              }}
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppWrapper;

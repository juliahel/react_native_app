import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ArtistScreen from './screens/ArtistScreen';
import AlbumScreen from './screens/AlbumScreen';
import GenreScreen from './screens/GenreScreen';
import ContactScreen from './screens/ContactScreen';
import Footer from './footer';
import Header from './header';

import {View, Text} from 'react-native';

import {Auth, Hub} from 'aws-amplify';
import { ActivityIndicator } from 'react-native';

import SignInScreen from './src/screens/SignInScreen';
import AdminHomeScreen from './src/screens/AdminHomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState(undefined);
  
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  }
  
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    }
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}} >
        <ActivityIndicator/>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          cardStyle: { backgroundColor: '#F5EFE7' }, headerShown: false       
        }}>
        {user ? (
          <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        ) : (
          <>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{
            title: 'jepjep',
            headerTintColor: 'black',
            headerStyle: { 
              backgroundColor: '#F5EFE7',
              height: 50},
            headerTitleAlign: 'center',
            }}/>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          <Stack.Screen name="Login" component={SignInScreen} />
        <Stack.Screen name="Artists" component={ArtistScreen}/>
        <Stack.Screen name="Albums" component={AlbumScreen} />
        <Stack.Screen name="Genres" component={GenreScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
          </>
        )
        }
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default AppNavigator;


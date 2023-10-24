import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ArtistScreen from './screens/ArtistScreen';
import OneArtist from './screens/OneArtist';
import AlbumScreen from './screens/AlbumScreen';
import GenreScreen from './screens/GenreScreen';
import ContactScreen from './screens/ContactScreen';
import OneAlbum from './screens/OneAlbum';
// import Footer from './footer';
import CustomHeader from './header';

import {View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import {Auth, Hub} from 'aws-amplify';

import SignInScreen from './adminscreens/SignInScreen';
import AdminHomeScreen from './adminscreens/AdminHomeScreen';
import SignUpScreen from './adminscreens/SignUpScreen';
import ConfirmEmailScreen from './adminscreens/ConfirmEmailScreen';
import ForgotPasswordScreen from './adminscreens/ForgotPasswordScreen';
import NewPasswordScreen from './adminscreens/NewPasswordScreen';
import AddDataScreen from './adminscreens/AddDataScreen';

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
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          header: () => <CustomHeader />,
          cardStyle: { backgroundColor: '#F5EFE7' }
        }}>
        {user ? (
          <>
          <Stack.Screen name="AdminHome" options={{headerShown: false}} component={AdminHomeScreen} />
          <Stack.Screen name="AdminAdd" options={{headerShown: false}} component={AddDataScreen} />
          </>
        ) : (
          <>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{
            title: 'Welcome to VintageVinyls!',
            headerStyle: { 
              backgroundColor: '#F5EFE7',
              height: 50},
            headerTitleAlign: 'center',
            headerTintColor: '#213555',
            }}/>
          <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignInScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
          <Stack.Screen name="ConfirmEmail" options={{headerShown: false}} component={ConfirmEmailScreen} />
          <Stack.Screen name="ForgotPassword" options={{headerShown: false}} component={ForgotPasswordScreen} />
          <Stack.Screen name="NewPassword" options={{headerShown: false}} component={NewPasswordScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={SignInScreen} />
        <Stack.Screen name="Artists" component={ArtistScreen}
        options={{
          title: 'All artists',
          headerStyle: { 
            backgroundColor: '#F5EFE7',
            height: 50},
          headerTitleAlign: 'left',
          headerTintColor: '#213555',
          }}/>
        <Stack.Screen name="OneArtist" component={OneArtist}
        options={{
          title: 'Back to all artists',
          headerStyle: { 
            backgroundColor: '#F5EFE7',
            height: 50},
          headerTitleAlign: 'left',
          headerTintColor: '#213555',
          }}/>
        <Stack.Screen name="OneAlbum" component={OneAlbum}
        options={{
          title: 'Back to all artists',
          headerStyle: { 
            backgroundColor: '#F5EFE7',
            height: 50},
          headerTitleAlign: 'left',
          headerTintColor: '#213555',
          }}/>
        <Stack.Screen name="Albums" component={AlbumScreen}
        options={{
          title: 'All albums',
          headerStyle: { 
            backgroundColor: '#F5EFE7',
            height: 50},
          headerTitleAlign: 'left',
          headerTintColor: '#213555',
          }}/>
        <Stack.Screen name="Genres" component={GenreScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;


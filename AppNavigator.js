import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ArtistScreen from './screens/ArtistScreen';
import AlbumScreen from './screens/AlbumScreen';
import GenreScreen from './screens/GenreScreen';
import ContactScreen from './screens/ContactScreen';
import Footer from './footer';
import Header from './header';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyle: { backgroundColor: '#F5EFE7' }        
        }}>
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
          title: 'jepjep',
          headerTintColor: 'black',
          headerStyle: { 
            backgroundColor: '#F5EFE7',
            height: 50},
          headerTitleAlign: 'center',
        }}/>
        <Stack.Screen name="Artists" component={ArtistScreen}/>
        <Stack.Screen name="Albums" component={AlbumScreen} />
        <Stack.Screen name="Genres" component={GenreScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default AppNavigator;


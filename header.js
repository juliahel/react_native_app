import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import Logo from './assets/images/vv-logo.png';

const Header = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="bars" size={25} color="#213555" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert('This is the search function')}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}> */}
        <Icon name="search" size={25} color="#213555" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={Logo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Icon name="sign-in-alt" size={25} color="#213555" />
        </TouchableOpacity>
        <View style={styles.iconSpacer} />
        <TouchableOpacity onPress={() => Alert.alert('This is the shopping cart')}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}> */}
          <Icon name="shopping-cart" size={25} color="#213555" />
        </TouchableOpacity>
      </View>
      {isDrawerOpen && (
        <View style={styles.drawer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.drawerItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Artists')}>
            <Text style={styles.drawerItem}>Artists</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Albums')}>
            <Text style={styles.drawerItem}>Albums</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Genres')}>
            <Text style={styles.drawerItem}>Genres</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.drawerItem}>Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#D8C4B6',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacer: {
    width: 16,
  },
  logo: {
    width: 150,
    height: 110,
  },
  drawer: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#F5EFE7',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  drawerItem: {
    fontSize: 18,
    padding: 5,
  },
};

export default Header;

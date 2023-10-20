import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';

import Logo from './assets/images/vv-logo.png';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="bars" size={25} color="#213555" />
      </TouchableOpacity>
      <View style={styles.iconSpacer} />
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Icon name="search" size={25} color="#213555" />
      </TouchableOpacity>
      </View>
      {route.name !== 'Home' && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={20} color="#213555" style={styles.backButton}/>
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={Logo} style={styles.logo} />
      </TouchableOpacity>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Icon name="sign-in-alt" size={25} color="#213555" />
        </TouchableOpacity>
        <View style={styles.iconSpacer} />
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
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
    padding: 15,
    backgroundColor: '#D8C4B6',
  },
  leftSection: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacer: {
    width: 15,
  },
  logoContainer: {
    
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
  backButton: {
    position: 'absolute',
    top: 95,
    right: 75,
  },
};

export default Header;

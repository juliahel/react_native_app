import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import Logo from './assets/images/vv-logo.png';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={25} color="#213555" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={25} color="#213555" />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Icon name="sign-in-alt" size={25} color="#213555" />
        </TouchableOpacity>
        <View style={styles.iconSpacer} />
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
          <Icon name="shopping-cart" size={25} color="#213555" />
        </TouchableOpacity>
      </View>
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
};

export default Header;
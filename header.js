import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#213555" />
        </TouchableOpacity>
      <Text>LOGO</Text>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={24} color="#213555" />
        </TouchableOpacity>
        <View style={styles.iconSpacer} />
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
          <Icon name="shopping-cart" size={24} color="#213555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#D8C4B6',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacer: {
    width: 16,
  },
};

export default Header;
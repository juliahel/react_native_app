import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Icon name="search" size={24} color="#213555" />
      </TouchableOpacity>
      <Text>LOGO</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
        <Icon name="shopping-cart" size={24} color="#213555" />
      </TouchableOpacity>
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
  }
};

export default Header;

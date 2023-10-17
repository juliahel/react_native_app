import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.footerContainer}>

      <TouchableOpacity
        style={styles.footerLink}
        onPress={() => navigation.navigate('Artists')}>
        <Text style={styles.footerText}>Artists</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerLink}
        onPress={() => navigation.navigate('Albums')}>
        <Text style={styles.footerText}>Albums</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerLink}
        onPress={() => navigation.navigate('Genres')}>
        <Text style={styles.footerText}>Genres</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerLink}
        onPress={() => navigation.navigate('Contact')}>
        <Text style={styles.footerText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#D8C4B6',
      height: 60,
    },
    footerText: {
      fontSize: 16,
      color: '#213555',
      fontWeight: 'bold',
    },
  });

export default Footer;

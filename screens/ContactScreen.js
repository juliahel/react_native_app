import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Tähän logo</Text>
      <Text style={styles.title}>VintageVinyls</Text>
      <Text style={styles.subtitle}>+358 01 234 5678</Text>
      <Text style={styles.subtitle}>contact@vintagevinyls.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ContactScreen;
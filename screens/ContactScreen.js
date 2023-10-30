import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';

const ContactScreen = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    
    console.log('Message:', message);
    console.log('Email:', email);

    setMessage('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
      <Text style={styles.title}>VintageVinyls</Text>
      <Text>+358 01 234 5678</Text>
      <Text>contact@vintagevinyls.com</Text>
      </View>
    
      <Text style={styles.subtitle}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Your email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.largeInput}
        placeholder="Your message"
        multiline
        numberOfLines={4}
        textAlignVertical='top'
        value={message}
        onChangeText={text => setMessage(text)}
      />
      <CustomButton text="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  info: {
    alignItems: 'center',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  largeInput: {
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default ContactScreen;
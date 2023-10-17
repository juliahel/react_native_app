import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GenreScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List all genres</Text>
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

export default GenreScreen;
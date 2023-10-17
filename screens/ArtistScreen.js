import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArtistScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const apiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readdata';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toArtistPage = (artistId) => {
    navigation.navigate('OneArtist', { artistId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toArtistPage(item.id)}>
            <View style={styles.item}>
              <Text>kuva?</Text>
              <Text>Name: {item.name}</Text>
              <Text>Genre: {item.genre}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5EFE7'
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    marginRight: 8,
    width: 170,
    borderRadius: 8,
    elevation: 3,
  },
});

export default ArtistScreen;
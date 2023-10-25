import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AlbumScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const apiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readallalbums';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toAlbumPage = (albumId) => {
  navigation.navigate('OneAlbum', { albumId});
  };

  return (
    <View style={styles.container}>
    <Text style={{fontSize:20, alignSelf: 'center', fontWeight:'bold', color:'#213555', marginBottom:10}} >Albums</Text>
      <FlatList
        data={data.sort(function(a, b) {
          return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
         })
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>toAlbumPage(item.id)}>
            <View style={styles.item}>
            <Text style={{fontWeight:'bold'}} >{item.albumName}</Text>
              <Text>Artist name: {item.name}</Text>
              <Text>Year: {item.year}</Text>
              <Text style={{fontWeight:'bold'}} >{item.price} €</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  //tää on kesken
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 3,
  },
});

export default AlbumScreen;
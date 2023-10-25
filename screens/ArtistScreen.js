import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import artistImg1 from '../assets/images/artist/artist-img1.jpg';
import artistImg2 from '../assets/images/artist/artist-img2.jpg';
import artistImg3 from '../assets/images/artist/artist-img3.jpg';
import artistImg4 from '../assets/images/artist/artist-img4.jpg';
import artistImg5 from '../assets/images/artist/artist-img5.jpg';

const ArtistScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const apiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readdata';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        const artistImageIndex = responseData.map((item, index) => ({
          ...item,
          imageIndex: index % 5,
        }));
        setData(artistImageIndex);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toArtistPage = (artistId, artistImageSource) => {
    navigation.navigate('OneArtist', { artistId, artistImageSource });
  };
  
  const artistImages = [artistImg1, artistImg2, artistImg3, artistImg4, artistImg5];
  
  const getArtistImage = (imageIndex) => {
    return artistImages[imageIndex];
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, alignSelf: 'center', fontWeight:'bold', color:'#213555', marginBottom:10}} >Artists</Text>
      <FlatList
        data={data.sort(function(a, b) {
          return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
         })}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toArtistPage(item.id, getArtistImage(item.imageIndex))}>
            <View style={styles.item}>
              <Image source={getArtistImage(item.imageIndex)} style={styles.image} />
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
  image: {
    height: 100,
    width: "100%",
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default ArtistScreen;
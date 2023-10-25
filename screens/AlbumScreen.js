import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import albumImg1 from '../assets/images/album/album-img1.jpg';
import albumImg2 from '../assets/images/album/album-img2.jpg';
import albumImg3 from '../assets/images/album/album-img3.jpg';
import albumImg4 from '../assets/images/album/album-img4.jpg';
import albumImg5 from '../assets/images/album/album-img5.jpg';

const AlbumScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const apiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readallalbums';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        const albumImageIndex = responseData.map((item, index) => ({
          ...item,
          imageIndex: index % 5,
        }));
        setData(albumImageIndex);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toAlbumPage = (albumId, albumImageSource) => {
  navigation.navigate('OneAlbum', { albumId, albumImageSource});
  };

  const albumImages = [albumImg1, albumImg2, albumImg3, albumImg4, albumImg5];

  const getAlbumImage = (imageIndex) => {
    return albumImages[imageIndex];
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
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>toAlbumPage(item.id, getAlbumImage(item.imageIndex))}>
            <View style={styles.item}>
            <Image source={getAlbumImage(item.imageIndex)} style={styles.image} />
            <Text style={{fontWeight:'bold'}} >{item.albumName}</Text>
              <Text>Artist: {item.name}</Text>
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
    padding: 20,
    backgroundColor: '#F5EFE7'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    marginRight: 10,
    width: 170,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: "100%",
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default AlbumScreen;
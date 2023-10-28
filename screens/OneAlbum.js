import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, ScrollView } from 'react-native';

import CustomButton from '../components/CustomButton';

const OneAlbum = ({ route }) => {
  const { albumId, albumImageSource } = route.params;
  const [albumData, setAlbumData] = useState(null);
  const [album, setAlbum] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [albumgenre, setAlbumGenre] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const albumApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readalbum/${albumId}`;
    const allArtistsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readdata`;
    const allAlbumsApiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readallalbums';

    fetch(albumApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setAlbumData(responseData);
        console.log(albumData);
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });

      fetch(allArtistsApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setAllArtists(responseData);
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });

      fetch(allAlbumsApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setAlbum(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [albumId]);

  const addToCart = () => {
    setAddedToCart(true);
    Alert.alert('Album added to Shopping Cart');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {albumData ? (
        <>
            <Image source={albumImageSource} style={styles.albumImage} />
            <Text style={styles.artistTitle}>{albumData.albumName}</Text>
            <Text style={{fontSize:15, fontWeight: 'bold'}}>Album by: {albumData.name}</Text>
            <Text style={{fontSize:15}}>Genre: {albumData.genre}</Text>
            <View style={{width: '90%', margin:5}} >
              <Text style={{textAlign:'center'}} >Description:</Text>
              <Text style={{textAlign:'center'}}>{albumData.description}</Text>
            </View>
            {albumData.cond === 0 
            ? <Text>Condition: used </Text> 
            : <Text>Condition: new </Text>}
            <Text>Stock: {albumData.stock}</Text>
            <Text>Price: {albumData.price} €</Text>
      <View style={styles.addCart}>      
      {addedToCart ? (
        <CustomButton text="Added to Shopping Cart" />
      ) : (
        <CustomButton text="Add to Shopping Cart" onPress={addToCart} />
      )}
      </View>  
      </>

      ) : (
        <Text>Loading...</Text>
      )}

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:2,
    padding: 16,
    backgroundColor: '#F5EFE7',
    alignItems: 'center',
  },
  albumImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    marginRight: 8,
    width: 300,
    borderRadius: 8,
    elevation: 3,
  },
  artistTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  albumTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  related: {
    alignItems: 'center',
    width:'80%',
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addCart: {
    marginTop: 10,
  },
});

export default OneAlbum;
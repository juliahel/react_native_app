import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const OneAlbum = ({ route }) => {
  const { albumId } = route.params;
  const [albumData, setAlbumData] = useState(null);
  const [allArtists, setAllArtists] = useState([]);
  const [albumgenre, setAlbumGenre] = useState([]);

  useEffect(() => {
    const albumApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readalbum/${albumId}`;
    const allArtistsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readdata`;

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

  }, [albumId]);

  return (
    <View style={styles.container}>
      {albumData ? (
        <>
            <Text style={styles.title}>*Album image*</Text>
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
            <Text>Price: {albumData.price} €</Text>
            <Text></Text>
          <Text> </Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:2,
    padding: 16,
    backgroundColor: '#F5EFE7',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingBottom: 10,
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
});

export default OneAlbum;
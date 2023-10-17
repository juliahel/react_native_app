import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const OneArtist = ({ route }) => {
  const { artistId } = route.params;
  const [artistData, setArtistData] = useState(null);
  const [albums, setAlbums] = useState([]);

  //tää on kesken - siirto ehkä etusivulle
  //const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const artistApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readartist/${artistId}`;
    const albumsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readalbumdata`;

    fetch(artistApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setArtistData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });

    fetch(albumsApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        const artistAlbums = responseData.filter((album) => album.artistId === artistId);
        setAlbums(artistAlbums);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  }, [artistId]);

  return (
    <View style={styles.container}>
      {artistData ? (
        <>
          <Text style={styles.artistTitle}>{artistData.name}</Text>
          <Text style={styles.title}>*Artist image*</Text>
          <Text>Albums by {artistData.name}:</Text>
          <Text> </Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    <FlatList
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.albumTitle}>{item.albumName}</Text>
          <Text>Release year: {item.year}</Text>
        </View>
      )}
      
      //tää on kesken  - siirto ehkä etusivulle
      //numColumns={numColumns}
    />
    
    <View style={styles.related}>
      <Text style={styles.relatedTitle}>Related artists</Text>
      <Text>tähä vaik saman genren artistei</Text>
    </View>
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
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OneArtist;
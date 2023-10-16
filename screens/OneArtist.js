import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const OneArtist = ({ route }) => {
  const { artistId } = route.params;
  const [artistData, setArtistData] = useState(null);
  const [albums, setAlbums] = useState([]);

  //tää on kesken
  const [numColumns, setNumColumns] = useState(2);

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
      <Text style={styles.title}>Artist info</Text>
      {artistData ? (
        <>
          <Text>Artist ID: {artistData.id}</Text>
          <Text>Artist name: {artistData.name}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

    <FlatList
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.albumBox}>
          <Text style={styles.albumTitle}>Album Name: {item.albumName}</Text>
          <Text>Year: {item.year}</Text>
          <Text>ID: {item.id}</Text>
          <Text>Artist ID: {item.artistId}</Text>
        </View>
      )}

      //tää on kesken
      numColumns={numColumns}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:2,
    padding: 16,
    backgroundColor: '#F5EFE7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  albumBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OneArtist;
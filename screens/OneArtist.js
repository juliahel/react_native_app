import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const OneArtist = ({ route }) => {
  const { artistId } = route.params;
  const [artistData, setArtistData] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [artistGenre, setArtistGenre] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const artistApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readartist/${artistId}`;
    const albumsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readalbumdata`;
    const allArtistsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readdata`;

    fetch(artistApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setArtistData(responseData);
        setArtistGenre(responseData.genre);
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

    fetch(allArtistsApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setAllArtists(responseData);
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });
  }, [artistId]);

  const seeOtherArtists = () => {
    if (artistGenre) {
      const relatedArtists = allArtists.filter(
        (artist) => artist.genre === artistGenre && artist.id !== artistId
      );
      setRelatedArtists(relatedArtists);
    }
  };

  useEffect(() => {
    setRelatedArtists([]);
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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('OneAlbum', { albumId: item.id })}>
            <View style={styles.item}>
              <Text style={styles.albumTitle}>{item.albumName}</Text>
              <Text>Release year: {item.year}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <CustomButton text="See related artists" onPress={seeOtherArtists} />
      
      {relatedArtists.length > 0 ? (
        <FlatList
          data={relatedArtists}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('OneArtist', { artistId: item.id })}>
              <View style={styles.related}>
                <Text style={styles.relatedTitle}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : null}

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
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    elevation: 3,
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

});

export default OneArtist;
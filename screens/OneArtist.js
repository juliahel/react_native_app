import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

import albumImg1 from '../assets/images/album/album-img1.jpg';
import albumImg2 from '../assets/images/album/album-img2.jpg';
import albumImg3 from '../assets/images/album/album-img3.jpg';
import albumImg4 from '../assets/images/album/album-img4.jpg';
import albumImg5 from '../assets/images/album/album-img5.jpg';

const OneArtist = ({ route }) => {
  const { artistId, artistImageSource } = route.params;
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
        const albumImageIndex = artistAlbums.map((item, index) => ({
          ...item,
          imageIndex: index % 5,
        }));
    
        setAlbums(albumImageIndex);
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

  const toAlbumPage = (albumId, albumImageSource) => {
    navigation.navigate('OneAlbum', { albumId, albumImageSource});
    };
  
    const albumImages = [albumImg1, albumImg2, albumImg3, albumImg4, albumImg5];
  
    const getAlbumImage = (imageIndex) => {
      return albumImages[imageIndex];
    };

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
          <Image source={artistImageSource} style={styles.artistImage} />
          <Text style={styles.artistTitle}>{artistData.name}</Text>
          <Text>Albums by {artistData.name}:</Text>
          <Text> </Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>toAlbumPage(item.id, getAlbumImage(item.imageIndex))}>
            <View style={styles.item}>
            <Image source={getAlbumImage(item.imageIndex)} style={styles.albumImage} />
              <Text style={styles.albumTitle}>{item.albumName}</Text>
              <Text style={styles.albumText}>{item.year}</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate('OneArtist', { artistId: item.id, artistImageSource })}>
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
  artistImage: {
    width: "90%",
    height: 200,
    marginBottom: 20,
  },
  albumImage: {
    height: 60,
    width: "100%",
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 9,
    marginBottom: 16,
    marginRight: 8,
    width: 110,
    borderRadius: 8,
    elevation: 3,
  },
  artistTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  albumTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  albumText: {
    fontSize: 11,
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
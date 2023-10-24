import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';

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

  const seeOtherArtists = () => {
    const otherArtists = allArtists.filter((album) => album.genre === albumData.genre);
    setAlbumGenre(otherArtists);
    const newgenre = albumgenre.genre;
    console.log(newgenre);
  }

  return (
    <View style={styles.container}>
      {albumData ? (
        <>
            <Text style={styles.title}>*Album image*</Text>
            <Text style={styles.artistTitle}>{albumData.albumName}</Text>
            <Text style={{fontSize:15, fontWeight: 'bold'}}>Album by: {albumData.name}</Text>
            <Text style={{fontSize:15}}>Genre: {albumData.genre}</Text>
            <Text style={{width: '90%'}} >Description: {albumData.description}</Text>
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
    <View style={styles.button} >
      <CustomButton onPress={seeOtherArtists} text="See related artists" />
      {/* tähän pitäisi vielä keksiä joku suodatin joka jättää näyttämättä tämän artistin */}
    </View>
    <FlatList
      data={albumgenre}
      keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (    
        <View style={styles.item}>
          <Text style={styles.albumTitle}>{item.name}</Text>
          <Text>*Artist image*</Text>
        </View>
      )}
    
      //tää on kesken  - siirto ehkä etusivulle
      //numColumns={numColumns}
    />
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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OneArtist = ({ route }) => {
  const { artistId } = route.params;
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://fishservice.ey.r.appspot.com/rest/vinylservice/readartist/${artistId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setArtistData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5EFE7'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default OneArtist;
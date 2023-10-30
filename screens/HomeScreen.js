import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import albumImg1 from '../assets/images/album/album-img1.jpg';
import albumImg2 from '../assets/images/album/album-img2.jpg';
import albumImg3 from '../assets/images/album/album-img3.jpg';
import albumImg4 from '../assets/images/album/album-img4.jpg';
import albumImg5 from '../assets/images/album/album-img5.jpg';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [latestNewAlbums, setLatestNewAlbums] = useState([]);
  const [latestUsedAlbums, setLatestUsedAlbums] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigation = useNavigation();

  const bannerImages = [
    require('../assets/images/album/album-img4.jpg'),
    require('../assets/images/album/album-img5.jpg'),
  ];

  useEffect(() => {
    const apiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readallalbums';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // sort the albums by dateAdded
        responseData.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        // filter first two new and used albums
        const latestNewAlbumsData = responseData.filter(item => item.cond === 1).slice(0, 4);
        const latestUsedAlbumsData = responseData.filter(item => item.cond === 0).slice(0, 4);
        // imageIndex property for each album
        const albumImageIndex = responseData.map((item, index) => ({
          ...item,
          imageIndex: index % 5,
        }));
        setLatestNewAlbums(latestNewAlbumsData.map((item, index) => ({
          ...item,
          imageIndex: albumImageIndex[index].imageIndex,
        })));
        setLatestUsedAlbums(latestUsedAlbumsData.map((item, index) => ({
          ...item,
          imageIndex: albumImageIndex[index + latestNewAlbumsData.length].imageIndex,
        })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const bannerScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(xOffset);
    setCurrentBannerIndex(newIndex);
  };

  const toAlbumPage = (albumId, albumImageSource) => {
  navigation.navigate('OneAlbum', { albumId, albumImageSource});
  };

  const albumImages = [albumImg1, albumImg2, albumImg3, albumImg4, albumImg5];

  const getAlbumImage = (imageIndex) => {
    return albumImages[imageIndex];
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={bannerScroll}
        showsHorizontalScrollIndicator={false}
      >
        {bannerImages.map((banner, index) => (
          <Image source={banner} style={[styles.banner]} key={index} />
        ))}
      </ScrollView>
    <Text style={styles.title} >Explore the world of music with us</Text>
    <View style={styles.line} />
    <Text style={styles.latestNew}>Latest New Albums:</Text>
    <ScrollView horizontal={true}>
      <FlatList
        data={latestNewAlbums}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toAlbumPage(item.id, getAlbumImage(item.imageIndex))}>
            <View style={styles.item}>
              <Image source={getAlbumImage(item.imageIndex)} style={styles.image} />
              <Text style={{ fontWeight: 'bold' }}>{item.albumName}</Text>
              <Text>Artist: {item.name}</Text>
              <Text>Year: {item.year}</Text>
              <Text style={{ fontWeight: 'bold' }}>{item.price} €</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </ScrollView>
      
      <View style={styles.line} />
      
      <Text style={styles.latestUsed}>Latest Used Albums:</Text>
      <ScrollView horizontal={true}>
      <FlatList
        data={latestUsedAlbums}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toAlbumPage(item.id, getAlbumImage(item.imageIndex))}>
            <View style={styles.item}>
              <Image source={getAlbumImage(item.imageIndex)} style={styles.image} />
              <Text style={{ fontWeight: 'bold' }}>{item.albumName}</Text>
              <Text>Artist: {item.name}</Text>
              <Text>Year: {item.year}</Text>
              <Text style={{ fontWeight: 'bold' }}>{item.price} €</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </ScrollView>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5EFE7',
    alignContent: 'center',
  },
  title: {
    fontSize: 16,
    alignSelf: 'center',
    color: "#213555",
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  line: {
    backgroundColor: "#D8C4B6",
    marginBottom: 10,
    height: 1,
    width: '100%',
  },
  banner: {
    width: 353,
    height: 200,
    borderRadius: 8,
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 20,
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
  latestNew: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  latestUsed: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  }});

export default HomeScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import albumImg1 from '../assets/images/album/album-img1.jpg';
import albumImg2 from '../assets/images/album/album-img2.jpg';
import albumImg3 from '../assets/images/album/album-img3.jpg';
import albumImg4 from '../assets/images/album/album-img4.jpg';
import albumImg5 from '../assets/images/album/album-img5.jpg';

import Icon from 'react-native-vector-icons/AntDesign';

const SearchScreen = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  
    useEffect(() => {
      const apiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readallalbums';
  
      fetch(apiUrl) 
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
          const albumImageIndex = responseData.map((item, index) => ({
            ...item,
            imageIndex: index % 5,
          }));
          setData(albumImageIndex);
          setFilteredDataSource(albumImageIndex);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    const toAlbumPage = (albumId, albumImageSource) => {
    navigation.navigate('OneAlbum', { albumId, albumImageSource});
    };

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Filter the "result" dataset based on the search text
          const newData = data.filter((item) => {
            const itemData = (item.name + item.albumName + item.year + item.genre).toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
        } else {
          // If search text is empty, show all albums
          setFilteredDataSource(data);
        }
    
        setSearch(text); // Update the search query in state
      };

    const albumImages = [albumImg1, albumImg2, albumImg3, albumImg4, albumImg5];

    const getAlbumImage = (imageIndex) => {
      return albumImages[imageIndex];
    };

  
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20, alignSelf: 'center', fontWeight:'bold', color:'#213555', marginBottom:10}} >Search albums</Text>
        <View style={styles.input} >
          <TextInput
                style={{width:'90%'}}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
                
            />
            { search ?
              <View style={{width:'10%', paddingTop:10}} >
                  <TouchableOpacity onPress={()=>{
                    setSearch('');
                    setFilteredDataSource(data);
                  }}>
                    <Icon name='close' size={25}  />
                  </TouchableOpacity></View>
                  : <View style={{width:'10%'}} ></View>
                }
        </View>
        <FlatList
          data={filteredDataSource.sort(function(a, b) {
            return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
           })
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>toAlbumPage(item.id, getAlbumImage(item.imageIndex))}>
              <View style={styles.item}>
              <Image source={getAlbumImage(item.imageIndex)} style={styles.image} />
              <Text>
                <Text style={{ fontWeight: 'bold' }}>{item.albumName}</Text>
                <Text> by </Text>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.cond === 0 ? ' (used) ' : ' (new) '}</Text>
              </Text>
              <Text>Year: {item.year}</Text>
              <Text>Genre: {item.genre}</Text>
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
      padding: 16,
      backgroundColor: '#F5EFE7'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    image: {
      height: 100,
      width: "100%",
      marginBottom: 8,
      borderRadius: 8,
    },
    item: {
      backgroundColor: 'white',
      padding: 16,
      marginBottom: 8,
      borderRadius: 8,
      elevation: 3,
      alignItems: 'center',
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
      input: {
        flexDirection:'row',
        backgroundColor: 'white',
        width: '100%',
    
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
    
        paddingHorizontal: 10,
        marginVertical: 5,
    },
  });


export default SearchScreen;
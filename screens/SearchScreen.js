import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
          setFilteredDataSource(responseData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    const toAlbumPage = (albumId) => {
    navigation.navigate('OneAlbum', { albumId});
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
  
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20, alignSelf: 'center', fontWeight:'bold', color:'#213555', marginBottom:10}} >Search albums</Text>
        <TextInput
              style={styles.input}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Search Here"
          />
        <FlatList
          data={filteredDataSource.sort(function(a, b) {
            return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
           })
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>toAlbumPage(item.id)}>
              <View style={styles.item}>
              <Text style={{fontWeight:'bold'}} >{item.albumName}</Text>
                <Text>Artist name: {item.name}</Text>
                <Text>Genre: {item.genre}</Text>
                <Text>Year: {item.year}</Text>
                {item.cond === 0 
                    ? <Text>Condition: used </Text> 
                    : <Text>Condition: new </Text>}
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
    //tää on kesken
    item: {
      backgroundColor: 'white',
      padding: 16,
      marginBottom: 8,
      borderRadius: 8,
      elevation: 3,
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
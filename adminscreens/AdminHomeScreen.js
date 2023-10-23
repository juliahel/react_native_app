import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Amplify, Auth } from 'aws-amplify';
//import { withAuthenticator} from 'aws-amplify-react-native';
//import config from '../aws-exports';
import CustomButton from '../components/CustomButton';
import SignInScreen from './SignInScreen';

//Amplify.configure(config);


const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const [artistData, setArtistData] = useState([]);
  const [albums, setAlbums] = useState([]);

  // kaikki data yhteen
  const mergeById = (array1, array2) =>
    array1.map(itm => ({
      ...array2.find((item) => (item.id === itm.artistId) && item),
      ...itm
    }));
  const result = mergeById(albums, artistData);
  
  //hakutoimintoa varten
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the "result" dataset
      // Update FilteredDataSource
      const newData = result.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase() + item.albumName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with "result" dataset
      setFilteredDataSource(result);
      setSearch(text);
    }
  };

  // data backendistä
  useEffect(() => {
    const albumsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readalbumdata`;
    const artistApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readdata`;

    fetch(artistApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setArtistData(responseData);
        console.log(artistData);
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });

    fetch(albumsApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setAlbums(responseData);
        console.log(albums);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  const signOut = async () => {
    try {
    await Auth.signOut();
    } catch (error) {
    console.log('error signing out: ', error);
    }
  };

  const addData = () => {
    navigation.navigate('AdminAdd');
  };

  const setAlbumList=(list)=>{
    setAlbums(list); // en ole nyt ihan varma mikä funktio tähän tulee eli mitä datasettiä tässä lähdetään muokkaamaan...veikkaisin että tämä
  }

  const deleteAlbum = async (id) => {
    await fetch("https://fishservice.appspot.com/rest/vinylstore/deletedata"+id,{method:"DELETE"}) // tähän pitää päivittää oikea osoite
    .then(response => response.json())
    .then(json => setAlbumList(json))
    .catch(error => console.log(error));
  }

  const onPressDelete = (id) => { //this function gets the id of the album as a parameter
    Alert.alert('', 'Are you sure you want to delete this album?', [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},  
      {text: 'OK', onPress: () => console.log('OK Pressed')}, // tähän pitää laittaa onPress: (id) => deleteAlbum(id) tms...
   ],
   { cancelable: false });
  }
  

  return (  
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}} >
            <CustomButton text='Add a new album' type='EXTRA' onPress={addData}/>
            <View style={{width:'30%'}}></View>
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={signOut}>
                  <Icon name="sign-out-alt" size={25} color="#213555" />
                </TouchableOpacity>
            </View >
          </View>
          <View style={{alignItems:'center', marginTop:30}}>
            <Text style={styles.title} >Welcome to Admin area</Text>
            <Text style={{padding:10}}>Here you can find a list of all albums. Click on an album to update or longpress to remove. You can search albums by name or artist. </Text>
          </View>   
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Search Here"
            />   
            <FlatList
              data={filteredDataSource}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onLongPress={() => {onPressDelete(item.id)}}>
                  <View style={styles.item}>
                    <Text>ID: {item.id}</Text>
                    <Text>Artist ID: {item.artistId}</Text>
                    <Text>Artist name: {item.name}</Text>
                    <Text>Album name: {item.albumName}</Text>
                    <Text>Year: {item.year}</Text>
                </View>
                </TouchableOpacity>
            )}
          />
          </View>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  //tää on kesken
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 20,
  },
  itemStyle: {
    padding: 10,
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

export default AdminHomeScreen;

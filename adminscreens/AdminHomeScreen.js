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
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  // data backendistä
  useEffect(() => {
      const albumsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readallalbums`;

    fetch(albumsApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setAlbums(responseData);
        setFilteredDataSource(responseData);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Filter the "result" dataset based on the search text
      const newData = albums.filter((item) => {
        const itemData = (item.name + item.albumName + item.year + item.genre).toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      // If search text is empty, show all albums
      setFilteredDataSource(albums);
    }

    setSearch(text); // Update the search query in state
  };

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
    await fetch("https://fishservice.appspot.com/rest/vinylstore/deletealbum"+id,{method:"DELETE"}) // tähän pitää päivittää oikea osoite
    .then(response => response.json())
    .then(json => {
      setAlbumList(json);
      Alert.alert('','Album with id: ' + id + ' deleted');
    })
    .catch(error => console.log(error));
  }

  const onPressDelete = (id) => { //this function gets the id of the album as a parameter
    Alert.alert('', 'Are you sure you want to delete this album?', [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},  
      {text: 'OK', onPress: (id) => deleteAlbum(id)},
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
            <Text style={{padding:10}}>Here you can find a list of all albums. Click on an album to update or longpress to remove. 
              You can search albums by name, artist, year, or genre. </Text>
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
              data={filteredDataSource.sort(function(a, b) {
                return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
               })} // Use the filtered data for rendering
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onLongPress={() => {onPressDelete(item.id)}}>
                    <View style={styles.item}>
                    <Text style={{fontWeight:'bold'}} >{item.albumName}</Text>
                    <Text>Artist name: {item.name}</Text>
                    <Text>Genre: {item.genre}</Text>
                    <Text>Year: {item.year}</Text>
                    <Text>Date added: {item.dateAdded}</Text>
                    {item.cond === 0 
                      ? <Text>Condition: used </Text> 
                      : <Text>Condition: new </Text>}
                    <Text>Price: <Text style={{fontWeight:'bold'}} >{item.price} €</Text></Text>
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

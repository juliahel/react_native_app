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
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Amplify, Auth } from 'aws-amplify';
//import { withAuthenticator} from 'aws-amplify-react-native';
//import config from '../aws-exports';
import CustomButton from '../components/CustomButton';
import SignInScreen from './SignInScreen';
import IconSimple from 'react-native-vector-icons/AntDesign';

//Amplify.configure(config);

const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const setAlbumList=(list)=>{
    setAlbums(list); 
  }

  // data backendistä
  const fetchData = async () => {
    try {
      const albumsApiUrl = `https://fishservice.appspot.com/rest/vinylstore/readallalbums`;

      const response = await fetch(albumsApiUrl);
      if (response.ok) {
        const responseData = await response.json();
        setAlbums(responseData);
        setFilteredDataSource(responseData);
      } else {
        console.error('Error fetching albums:', response.status);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };
    useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  
  const searchFilterFunction = (text) => {
    if (text) {
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


  const deleteAlbum = async (id) => {
    try {
      const response = await fetch(`https://fishservice.appspot.com/rest/vinylstore/deletealbum/`+id, {
        method: "DELETE",
      });
  
      if (response.ok) {
        Alert.alert('', 'Album deleted');
        const updatedAlbums = albums.filter((album) => album.id !== id);
        fetchData();
      } else {
        console.log('Error:', response.status);
        Alert.alert('', 'Failed to delete album');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('', 'An error occurred');
    }
  };
  const onPressDelete = (id) => {
    Alert.alert('', 'Are you sure you want to delete this album?', [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: () => deleteAlbum(id) },
    ], { cancelable: false });
  }

  const onAlbumClick = (id) =>{
    navigation.navigate('EditData', { id: id });
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
          <View style={styles.input}>
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
                    setFilteredDataSource(albums);
                  }}>
                    <IconSimple name='close' size={25}  />
                  </TouchableOpacity></View>
                  : <View style={{width:'10%'}} ></View>
                }
          </View>
            <FlatList
              data={filteredDataSource.sort(function(a, b) {
               return new Date(b.dateAdded) - new Date(a.dateAdded);;
               })} // Use the filtered data for rendering
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onLongPress={() => {onPressDelete(item.id)}} onPress={() => {onAlbumClick(item.id)}}>
                    <View style={styles.item}>
                    <Text style={{fontWeight:'bold'}} >{item.albumName}</Text>
                    <Text>Artist name: {item.name}</Text>
                    <Text>Genre: {item.genre}</Text>
                    <Text>Year: {item.year}</Text>
                    {/* <Text>Date added: {item.dateAdded}</Text> */}
                    {item.cond === 0 
                      ? <Text>Condition: Used </Text> 
                      : <Text>Condition: New </Text>}
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

export default AdminHomeScreen;

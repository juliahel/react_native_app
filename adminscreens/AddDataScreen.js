import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { ScrollView } from 'react-native-gesture-handler';

const AddDataScreen = () => {
    const navigation = useNavigation();
    const [albumName, setAlbumName]=useState();
    const [albumYear, setAlbumYear]=useState();
    const [description, setDescription]=useState();
    const [cond, setCond] = useState(1);
    const [name, setArtistName]=useState();
    const [genre, setGenre]=useState();
    const [price, setPrice]=useState();
    const [stock, setStock]=useState();
    
    const [albums, setAlbums]=useState([]);
    
    const [album, setAlbum]=useState(new Object());
    // const [artist, setArtist]=useState(new Object());
    // const [inventory, setInventory]=useState(new Object());
    
    const albumNameInputHandler = (enteredText) => {
        setAlbum(enteredText);
        album.albumName=enteredText;
    }
    const albumYearInputHandler = (enteredText) => {
        setAlbum(enteredText);
        album.year=enteredText;
    }
    const albumDescriptionInputHandler = (enteredText) => {
        setAlbum(enteredText);
        album.description=enteredText;
    }
    const conditionInputHandler = (value) => {
        setCond(value === '1' ? 1 : 0); 
        album.cond = value === '1' ? 1 : 0; 
      };

    const artistNameInputHandler = (enteredText) => {
        setAlbum(enteredText);
        album.name=enteredText;
    }
    const genreInputHandler = (enteredText) => {
        setAlbum(enteredText);
        album.genre=enteredText;
    }
    const priceInputHandler = (enteredText) => {
        setAlbum(enteredText);
        album.price=enteredText;
    }
    const stockInputHandler = (enteredText) => {
        setAlbum(enteredText);
        album.stock=enteredText;
    }

    const setAlbumList=(list)=>{
        setAlbums(list); 
        console.log(albums);
    }

    const returnPressed=()=>{
        navigation.navigate('AdminHome');
    }
   
    const saveAlbum=async()=>{
        await fetch("https://fishservice.appspot.com/rest/vinylstore/addalbum",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(album) // onnistuisikohan jos tekisi näistä vain yhden albumi-objektin ja lähettäisi sen backendiin? 
          }
          )
          .then(response => response.json())
          .then(json => setAlbumList(json))
          .catch(error => console.log(error));
        navigation.navigate('AdminHome');
      }

      const fetchAlbums=async()=>{
        await fetch("https://fishservice.appspot.com/rest/vinylstore/readalbumdata")
        .then(response => response.json())
        .then(json => setAlbumList(json))
        .catch(error => console.log(error));
      }

    return (
      
        <View style={styles.container}>
        <View style={styles.formView}>
            <TextInput style={styles.input} placeholder="Artist name"value={artistName}
                    onChangeText={artistNameInputHandler}/>
            <TextInput style={styles.input} placeholder="Genre" value={genre}
                onChangeText={genreInputHandler}/>
            <TextInput style={styles.input} placeholder="Album name" value={albumName}
                onChangeText={albumNameInputHandler}/>
            <TextInput style={styles.input} placeholder="Release year" value={albumYear}
                onChangeText={albumYearInputHandler}/>
            <TextInput style={styles.input} placeholder="Description" value={description}
                onChangeText={albumDescriptionInputHandler}/>
            <TextInput style={styles.input} placeholder="Price" value={price}
                onChangeText={priceInputHandler}/>
            <TextInput style={styles.input} placeholder="Stock" value={stock}
                onChangeText={stockInputHandler}/>
            <RadioButton.Group onValueChange={conditionInputHandler} value={cond.toString()}>
                <View style={styles.radioButtonContainer}>
                    <View style={styles.radioButtonItem}>
                    <Text>New</Text>
                    <RadioButton value="1" />
                    </View>
                    <View style={styles.radioButtonItem}>
                    <Text>Used</Text>
                    <RadioButton value="0" />
                    </View>
                </View>
                </RadioButton.Group>
            <CustomButton text='Add album a' 
                onPress={()=>saveAlbum()}/>
            <CustomButton text='Return' 
                onPress={()=>returnPressed()}/>
        </View>
        
        <CustomButton text='Read All' 
              onPress={fetchAlbums}/>
        <View style={styles.listView}>
          <FlatList
            data={albums}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>ID: {item.id}</Text>
                  <Text>Artist ID: {item.artistId}</Text>
                  <Text>Album name: {item.albumName}</Text>
                  <Text>Year: {item.year}</Text>
              </View>
          )}
        />
        </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F5EFE7'
    },
    item: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 3,
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
    listView: {
        flex:1
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
      },
      radioButtonItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
  });

export default AddDataScreen;
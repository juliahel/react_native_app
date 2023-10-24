import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { ScrollView } from 'react-native-gesture-handler';
import { response } from 'express';

const AddDataScreen = () => {
    const navigation = useNavigation();
    const [albumName, setAlbumName]=useState();
    const [year, setYear]=useState();
    const [description, setDescription]=useState();
    const [cond, setCond] = useState(1);
    const [name, setName]=useState();
    const [genre, setGenre]=useState();
    const [price, setPrice]=useState();
    const [stock, setStock]=useState();
    const [vinylList, setVinylsList]=useState([]);
    
    
    const vinylsNameInputHandler = (enteredText) => {
        setAlbumName(enteredText);
    }
    const vinylsYearInputHandler = (enteredText) => {
        setYear(enteredText);
    }
    const vinylsDescriptionInputHandler = (enteredText) => {
        setDescription(enteredText);
    }
    const conditionInputHandler = (value) => {
        setCond(value === '1' ? 1 : 0); 
      };

    const nameInputHandler = (enteredText) => {
        setName(enteredText);
    }
    const genreInputHandler = (enteredText) => {
        setGenre(enteredText);
    }
    const priceInputHandler = (enteredText) => {
        enteredText = enteredText.replace(',', '.');
        setPrice(enteredText);
    }
    const stockInputHandler = (enteredText) => {
        setStock(enteredText);
    }

    const returnPressed=()=>{
        navigation.navigate('AdminHome');
    }

    const saveData = async () => {
      const data = {
          name,
          genre,
          albumName,
          year,
          description,
          cond,
          price,
          stock,
      };
  
      try {
          const response = await fetch("https://fishservice.appspot.com/rest/vinylstore/addalbumlist", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
  
          if (response.ok) {
              navigation.navigate('AdminHome'); 
          } else {
              // Handle the case when the addition fails
              console.error('Addition failed');
          }
      } catch (error) {
          console.error('Fetch Error:', error);
      }
  };
   

    return (
      
        <View style={styles.container}>
        <View style={styles.formView}>
            <TextInput style={styles.input} placeholder="Artist name"value={name}
                    onChangeText={nameInputHandler}/>
            <TextInput style={styles.input} placeholder="Genre" value={genre}
                onChangeText={genreInputHandler}/>
            <TextInput style={styles.input} placeholder="Album name" value={albumName}
                onChangeText={vinylsNameInputHandler}/>
            <TextInput style={styles.input} placeholder="Release year" value={year}
                onChangeText={vinylsYearInputHandler}/>
            <TextInput style={styles.input} placeholder="Description" value={description}
                onChangeText={vinylsDescriptionInputHandler}/>
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
                onPress={()=>saveData()}/>
                <CustomButton text='Return' 
                onPress={()=>returnPressed()}/>
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
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { ScrollView } from 'react-native-gesture-handler';
import { response } from 'express';

const EditDataScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const [albumName, setAlbumName]=useState();
    const [year, setYear]=useState();
    const [description, setDescription]=useState();
    const [cond, setCond] = useState(1);
    const [name, setName]=useState();
    const [genre, setGenre]=useState();
    const [price, setPrice]=useState();
    const [stock, setStock]=useState();
 
    useEffect(() => {
    
        const fetchAlbumDetails = async () => {
            try {
                const response = await fetch(`https://fishservice.appspot.com/rest/vinylstore/readalbum/`+id);
                if (response.ok) {
                const data = await response.json();
                setAlbumName(data.albumName);
                setYear(data.year.toString());
                setDescription(data.description);
                setCond(data.cond);
                setName(data.name);
                setGenre(data.genre);
                setPrice(data.price.toString());
                setStock(data.stock.toString());
                } else {
                console.error('Error fetching album details:', response.status);
                }
        } catch (error) {
        console.error('Error fetching album details:', error);
        }
      };
fetchAlbumDetails();
}, [id]);

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

    const updateData = async () => {
        if (!name || !genre || !albumName || !year || !description || !price || !stock) {
            alert('Please fill in all required fields');
            return;
        }
        const updatedAlbum = {
            name,
            genre,
            albumName,
            year,
            description,
            cond,
            price,
            stock,
            id,
        };
        try {
            const response = await fetch(`https://fishservice.appspot.com/rest/vinylstore/updatealbum/` + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAlbum),
            });
    
            if (response.ok) {
                Alert.alert('Album updated successfully', '', [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('AdminHome');
                        },
                    },
                ]);
            } else {
                console.error('Failed to update the album. Response:', response.status);
                alert('Failed to update the album');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };
    
 

    return (
    <ScrollView style={styles.container}>
        <View style={styles.formView}>
            <Text style={{fontSize:20, color:'#213555', alignSelf:'center', marginBottom:5}} >Update the album</Text>
            <Text style={styles.label}>Artist Name:</Text>
            <TextInput style={styles.input} placeholder="Artist name"value={name}
                    onChangeText={nameInputHandler}/>
            <Text style={styles.label}>Genre:</Text>
            <TextInput style={styles.input} placeholder="Genre" value={genre}
                    onChangeText={genreInputHandler}/>
            <Text style={styles.label}>Album name:</Text>
            <TextInput style={styles.input} placeholder="Album name" value={albumName}
                    onChangeText={vinylsNameInputHandler}/>
            <Text style={styles.label}>Release year:</Text>
            <TextInput style={styles.input} placeholder="Release year" value={year}
                    onChangeText={vinylsYearInputHandler}/>
            <Text style={styles.label}>Description:</Text>
            <TextInput style={[styles.input, { height: 100 }]} multiline={true} numberOfLines={5} placeholder="Description" value={description}
                    onChangeText={vinylsDescriptionInputHandler}/>
            <Text style={styles.label}>Price in €:</Text>
            <TextInput style={styles.input} placeholder="Price" value={price}
                    onChangeText={priceInputHandler}/>
            <Text style={styles.label}>Stock:</Text>
            <TextInput style={styles.input} placeholder="Stock" value={stock}
                    onChangeText={stockInputHandler}/>
            <Text style={styles.label}>Condition:</Text>
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
               <CustomButton text='Update Album' 
                onPress={()=>updateData()}/>
                <View style={{ marginBottom: 20 }}>
                <CustomButton  text='Return' 
                onPress={()=>returnPressed()}/>
                </View>
        </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F5EFE7',
      marginBottom:20,
    },
    item: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 3,
    },
    label:{
        fontSize: 16,
        color: '#213555',
        marginBottom: 0.5,
        fontWeight: 'normal',
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

export default EditDataScreen;
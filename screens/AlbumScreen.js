import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import albumImg1 from '../assets/images/album/album-img1.jpg';
import albumImg2 from '../assets/images/album/album-img2.jpg';
import albumImg3 from '../assets/images/album/album-img3.jpg';
import albumImg4 from '../assets/images/album/album-img4.jpg';
import albumImg5 from '../assets/images/album/album-img5.jpg';
import Icon from 'react-native-vector-icons/Feather';

const AlbumScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const apiUrl = 'https://fishservice.appspot.com/rest/vinylstore/readallalbums';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        const albumImageIndex = responseData.map((item, index) => ({
          ...item,
          imageIndex: index % 5,
        }));
        setData(albumImageIndex);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toAlbumPage = (albumId, albumImageSource) => {
  navigation.navigate('OneAlbum', { albumId, albumImageSource});
  };

  const albumImages = [albumImg1, albumImg2, albumImg3, albumImg4, albumImg5];

  const getAlbumImage = (imageIndex) => {
    return albumImages[imageIndex];
  };

  return (
    <View style={styles.container}>
      <View style={styles.title} >
        <View style={{flex:4}} ></View>
        <Text style={{flex:5, fontSize:20, fontWeight:'bold', color:'#213555'}} >Albums</Text>
        <Icon name='sliders' size={25} color={'#213555'} style={{flex:1}} onPress={()=>setModalVisible(true)}/>
      </View>
      
        <Modal 
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        >
          <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0,0,0,.5)'}} >
            <View style={styles.modal}>
              <TouchableOpacity style={styles.touchable} onPress={()=>{
                let tempList = data.sort((a,b)=>
                  a.albumName > b.albumName ? 1 : -1,
                );
                setData(tempList);
                setModalVisible(false);
              }} >
                <Text style={styles.modaltext}>Sort by album name</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable} onPress={()=>{
                let tempList = data.sort((a,b)=>
                  a.name > b.name ? 1 : -1,
                );
                setData(tempList);
                setModalVisible(false);
              }} >
                <Text style={styles.modaltext}>Sort by artist name</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable} onPress={()=>{
                let tempList = data.sort((a,b)=>
                  a.year > b.year ? 1 : -1,
                );
                setData(tempList);
                setModalVisible(false);
              }} >
                <Text style={styles.modaltext}>Sort by year old to new</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable} onPress={()=>{
                let tempList = data.sort((a,b)=>
                  a.year < b.year ? 1 : -1,
                );
                setData(tempList);
                setModalVisible(false);
              }} >
                <Text style={styles.modaltext}>Sort by year new to old</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable} onPress={()=>{
                let tempList = data.sort((a,b)=>
                  a.price > b.price ? 1 : -1,
                );
                setData(tempList);
                setModalVisible(false);
              }} >
                <Text style={styles.modaltext}>Sort by price low to high</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchable} onPress={()=>{
                let tempList = data.sort((a,b)=>
                  a.price < b.price ? 1 : -1,
                );
                setData(tempList);
                setModalVisible(false);
              }} >
                <Text style={styles.modaltext}>Sort by price high to low</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>toAlbumPage(item.id, getAlbumImage(item.imageIndex))}>
            <View style={styles.item}>
            <Image source={getAlbumImage(item.imageIndex)} style={styles.image} />
            <Text style={{fontWeight:'bold'}} >{item.albumName}</Text>
              <Text>Artist: {item.name}</Text>
              <Text>Year: {item.year}</Text>
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
    padding: 20,
    backgroundColor: '#F5EFE7'
  },
  title: {
    flexDirection:'row',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
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
  modal: {
    width: '80%',
    height: 'auto',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // backgroundColor: 'white',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // borderRadius:10,  
    // borderWidth: 1,  
    // borderColor: 'white',    
    // marginTop:200,
    
  },
  modaltext: {
    fontSize: 18,
  },
  touchable: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20,
  }
});

export default AlbumScreen;
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Amplify, Auth } from 'aws-amplify';
//import { withAuthenticator} from 'aws-amplify-react-native';
//import config from '../aws-exports';
import CustomButton from '../components/CustomButton';
import SignInScreen from './SignInScreen';

//Amplify.configure(config);


const AdminHomeScreen = () => {
  

  const signOut = async () => {
    try {
    await Auth.signOut();
    } catch (error) {
    console.log('error signing out: ', error);
    }
  };
  

  return (
      <ScrollView>
        <View style={styles.root} >
          <Text style={{fontSize: 24, alignSelf: 'center'}} >Hello There</Text>
          <CustomButton text='Sign out' 
            onPress={signOut} />
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
});

export default AdminHomeScreen;

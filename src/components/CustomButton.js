import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#4F709C',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  container_EXTRA: {
    backgroundColor: '#4F709C',
    marginBottom: 10,
    marginHorizontal: '1%',
    width: '50%',
    alignSelf: 'center',
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#4F709C',
  },

  text_TERTIARY: {
    color: 'gray',
  },
  text_EXTRA: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomButton;

import React from "react";
import { Image, TouchableOpacity } from "react-native";

const BackBtn = ({navigation}) => {

  const goBack = () => {
    console.log('asdfasf')
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={goBack} style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
      <Image source={require('../../images/back.png')} style={{width:48, height: 48}}/>
    </TouchableOpacity>
  );
}

export default BackBtn;

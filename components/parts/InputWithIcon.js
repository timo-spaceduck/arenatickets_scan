import React, {useState} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../css/general.css';

const InputWithIcon = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  image,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={styles.formControl}>
      <Image
        source={image}
        style={{width: 24, height: 24, position: 'absolute', left: 16}}
      />
      <TextInput
        placeholderTextColor="#817D8E"
        style={{left: 24}}
        secureTextEntry={!showPass && secureTextEntry}
        placeholder={placeholder}
        onChangeText={v => onChangeText(v)}
        defaultValue={value}
      />
      {secureTextEntry ? (
        <TouchableOpacity
          onPress={() => setShowPass(!showPass)}
          style={{position: 'absolute', right: 16}}>
          <Image
            source={
              showPass
                ? require('../../images/eye.png')
                : require('../../images/eyeoff.png')
            }
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputWithIcon;

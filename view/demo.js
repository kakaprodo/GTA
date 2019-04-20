import React from 'react';
import { View, TextInput, Image, KeyboardAvoidingView } from 'react-native';
// import styles from './styles';
// import logo from './logo.png';

const Demo = () => {
  return (
    <KeyboardAvoidingView

      behavior="padding"
    >
      <View style={{ height: 360,backgroundColor: "red"}} />

      <TextInput
        placeholder="Email"

      />
      <TextInput
        placeholder="Username"

      />
      <TextInput
        placeholder="Password"

      />
      <TextInput
        placeholder="Confirm Password"

      />

    </KeyboardAvoidingView>
  );
};

export default Demo;

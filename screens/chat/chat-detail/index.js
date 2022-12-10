import React from "react";
import { Button, Text, View } from "react-native";

function ChatDetail(props) {
    const {navigation} = props;
  return (
    <View>
      <Text>Chate Detail</Text>
      <Button onPress={()=> navigation.setOptions({title: 'đà'})} title="fdsfds">Update</Button>
    </View>
  );
}

export default ChatDetail;

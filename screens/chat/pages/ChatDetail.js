import { Avatar } from "@rneui/themed";
import React from "react";
import { Button, Text, View } from "react-native";

function ChatDetail(props) {
  const { navigation, item } = props;
  return (
    <View>
      <Text>Chate Detail</Text>
      <Button
        onPress={() =>
          navigation.setOptions({
            headerTitle: () => (
              <Avatar
                size={40}
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              />
            ),
          })
        }
        title="Update header"
      />
    </View>
  );
}

export default ChatDetail;

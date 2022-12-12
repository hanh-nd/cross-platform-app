import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";
import ConversationHeader from "../components/ConversationHeader";

function ChatDetail(props) {
  const { params } = props;
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ConversationHeader item={item} />,
    });
  }, []);
  return (
    <View>
      <Text>Chate Detail</Text>
    </View>
  );
}

export default ChatDetail;

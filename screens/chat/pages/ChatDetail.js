import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, BottomSheet, Icon, ListItem } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { colors } from "../../../constants";
import { PageName } from "../../../navigation/constants";
import ConversationHeader from "../components/ConversationHeader";

function ChatDetail(props) {
  const { params } = props;
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ConversationHeader item={item} />,
      headerRight: () => (
        <Icon
          type="font-awesome"
          name="info-circle"
          color={colors.grayBlue}
          onPress={() => {
            navigation.navigate({
              name: PageName.CHAT_PERSONAL,
              params: {
                item: item,
              },
            });
          }}
        />
      ),
    });
  }, []);

  return (
    <View>
      <Text>Chate Detail</Text>
    </View>
  );
}

export default ChatDetail;

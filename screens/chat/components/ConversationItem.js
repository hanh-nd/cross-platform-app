import { Avatar, Divider, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { PageName } from "../../../navigation/constants";

function ConversationItem(props) {
  const { item, navigation } = props;
  console.log("🚀 ~ file: ConversationItem.js:8 ~ ConversationItem ~ item", item)

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          name: PageName.CHAT_DETAIL,
          options: {
            headerTitle: item.namePerson,
          },
        });
      }}
    >
      <View style={styles.conversationItem}>
        <View style={{ flex: 0.15, paddingHorizontal: 10 }}>
          <Avatar size={45} rounded source={{ uri: item.imgLink }} />
        </View>
        <View style={{ flex: 0.9 }}>
          <Text style={styles.namePerson}>{item.namePerson}</Text>
          <Text ellipsizeMode="clip" numberOfLines={1} style={styles.lastMessage}>
            {item.lastMessage}
          </Text>
          <Divider width={1} />
        </View>
        <View style={{ flex: 0.15, alignItems: "center" }}>
          <Icon type="font-awesome" name="ellipsis-h" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  namePerson: {
    fontSize: 15,
    fontWeight: "bold",
  },
  lastMessage: {},
});

export default ConversationItem;

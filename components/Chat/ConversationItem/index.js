import { Avatar, Divider, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ConversationItem({ item }) {
  return (
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

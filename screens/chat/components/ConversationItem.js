import { useNavigation } from "@react-navigation/native";
import { Avatar, Divider, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { PageName } from "../../../navigation/constants";

function ConversationItem(props) {
  const { item, setIsVisibleBlockSheet } = props;
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigate({
          name: PageName.CHAT_DETAIL,
          params: {
            item: item,
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
        <View style={{ flex: 0.15, alignItems: "center"}}>
          <Icon
            type="font-awesome"
            name="ellipsis-h"
            onPress={() => {
              setIsVisibleBlockSheet(true);
            }}
            style={{padding:5, borderRadius: 50}}
          />
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

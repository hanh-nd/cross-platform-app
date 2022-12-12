import { Avatar, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants";

const ConversationHeader = (props) => {
  const { item } = props;
  return (
    <View style={styles.conversationItem}>
      <View style={{ flex: 1 }}>
        <Avatar size={40} rounded source={{ uri: item.imgLink }} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.namePerson}>{item.namePerson}</Text>
      </View>
      <View style={{ flex: 3 }}>
        <Icon type="font-awesome" name="info-circle" color={colors.grayBlue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conversationItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    // marginVertical: 8,
  },
  namePerson: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default ConversationHeader;

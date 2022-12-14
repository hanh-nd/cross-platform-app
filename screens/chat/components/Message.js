import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";

function Message({ item, userId }) {

  const status = item.userId !== userId;

  return (
    <View>
      <View
        style={
          status ? styles.messageWrapper : [styles.messageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            size={30}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
          <View
            style={
              status
                ? styles.message
                : [styles.message, { backgroundColor: "#4e69a2" }]
            }
          >
            <Text style={{color: status?'#000000': '#ffffff'}}>{item.text}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    messageWrapper: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    message: {
        maxWidth: "50%",
        backgroundColor: "#d3d3d3",
        padding: 15,
        borderRadius: 10,
        marginBottom: 2,
    },
});
export default Message;

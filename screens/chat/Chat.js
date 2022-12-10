import { Avatar, Input, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View, TextInput } from "react-native";
import { DismissKeyboardView } from "../../components";

function Chat(props) {
  return (
    <ScrollView>
      <View style={styles.inputHeader}>
        <View style={{ flex: 0.1, paddingHorizontal: 10 }}>
          <Avatar
            // size={40}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            // inlineImageLeft="search_icon"
            placeholder="Tìm kiếm"
            style={styles.inputSearch}
          />
          {/* <Input
          placeholder="Tìm kiếm"
          leftIcon={{ type: "font-awesome", name: "search" }}
          inputContainerStyle={styles.inputSearch}
        /> */}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  inputHeader: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputSearch: {
    // borderStyle: "1px solid black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    // backgroundColor: "gray",
    width: "100%",
    // border
    // backgroundColor: "red",
  },
});
export default Chat;

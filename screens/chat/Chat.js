import { Avatar, Divider, Input, Text } from '@rneui/themed';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { DismissKeyboardView } from '../../components';
import ConversationItem from '../../components/Chat/ConversationItem';

function Chat(props) {
  const { navigation, route } = props;
  const data = [
    {
      imgLink: "https://randomuser.me/api/portraits/men/36.jpg",
      namePerson: "Nguyễn Văn A",
      lastMessage: "Hôm nay ăn gì nhỉ?",
    },
    {
      imgLink: "https://randomuser.me/api/portraits/men/36.jpg",
      namePerson: "Nguyễn Văn A",
      lastMessage: "Hôm nay ăn gì nhỉ?",
    },
    {
      imgLink: "https://randomuser.me/api/portraits/men/36.jpg",
      namePerson: "Nguyễn Văn A",
      lastMessage: "Hôm nay ăn gì nhỉ?",
    },
    {
      imgLink: "https://randomuser.me/api/portraits/men/36.jpg",
      namePerson: "Nguyễn Văn A",
      lastMessage: "Hôm nay ăn gì nhỉ?",
    },
  ];
  return (
    <ScrollView>
      <View style={styles.inputHeader}>
        <View style={{ flex: 0.2, paddingHorizontal: 10 }}>
          <Avatar
            size={60}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
        </View>
        <View style={{ flex: 1.1 }}>
          <TextInput keyboardType="default" placeholder="Tìm kiếm" style={styles.inputSearch} />
        </View>
      </View>
      <Divider width={1} style={{ marginTop: 5, marginBottom: 20 }} />
      {data
        ? data.map((item) => {
            return <ConversationItem key={Math.random()} item={item} navigation={navigation} />;
          })
        : null}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    inputHeader: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputSearch: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
    },
});
export default Chat;

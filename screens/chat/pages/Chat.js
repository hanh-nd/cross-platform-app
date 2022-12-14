import {
    Avatar,
    BottomSheet,
    Divider,
    Icon,
    Input,
    ListItem,
    Text,
} from '@rneui/themed';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { DismissKeyboardView } from '../../../components';
import ConversationItem from '../components/ConversationItem';
import { colors } from '../../../constants';

function Chat(props) {
    const [isVisible, setIsVisible] = useState(false);
    const data = [
        {
            id: Math.random(),
            imgLink: 'https://randomuser.me/api/portraits/men/36.jpg',
            namePerson: 'Nguyễn Văn A',
            lastMessage: 'Hôm nay ăn gì nhỉ?',
        },
        {
            id: Math.random(),
            imgLink: 'https://randomuser.me/api/portraits/men/37.jpg',
            namePerson: 'Nguyễn Văn B',
            lastMessage: 'Hôm nay ăn gì nhỉ?',
        },
        {
            id: Math.random(),
            imgLink: 'https://randomuser.me/api/portraits/men/38.jpg',
            namePerson: 'Nguyễn Văn C',
            lastMessage: 'Hôm nay ăn gì nhỉ?',
        },
        {
            id: Math.random(),
            imgLink: 'https://randomuser.me/api/portraits/men/39.jpg',
            namePerson: 'Nguyễn Văn D',
            lastMessage: 'Hôm nay ăn gì nhỉ?',
        },
    ];
    const list = [
        {
            title: 'Xóa',
            iconName: 'delete',
        },
        {
            title: 'Chặn',
            iconName: 'block',
        },
    ];
    return (
        <ScrollView>
            <View style={styles.inputHeader}>
                <View style={{ flex: 0.2, paddingHorizontal: 10 }}>
                    <Avatar
                        size={60}
                        rounded
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                        }}
                    />
                </View>
                <View style={{ flex: 1.1 }}>
                    <TextInput
                        keyboardType="default"
                        placeholder="Tìm kiếm"
                        style={styles.inputSearch}
                    />
                </View>
            </View>
            <Divider width={1} style={{ marginTop: 5, marginBottom: 20 }} />
            {data
                ? data.map((item) => {
                      return (
                          <ConversationItem
                              key={Math.random()}
                              item={item}
                              setIsVisibleBlockSheet={setIsVisible}
                          />
                      );
                  })
                : null}
            <BottomSheet
                isVisible={isVisible}
                modalProps={{
                    animationType: 'fade',
                }}
                onBackdropPress={() => setIsVisible(false)}
            >
                {list.map((l, i) => (
                    <ListItem key={i} onPress={l.onPress}>
                        <ListItem.Content style={styles.contentStyle}>
                            <Icon
                                name={l.iconName}
                                type="material"
                                color="#ff0000"
                            />
                            <ListItem.Title style={styles.titleStyle}>
                                {l.title}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
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
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: '100%',
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#ff0000',
    },
    titleStyle: {
        fontWeight: '700',
        color: '#ff0000',
        marginHorizontal: 10,
    },
});
export default Chat;

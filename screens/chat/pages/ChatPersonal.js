import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, Icon, ListItem } from '@rneui/themed';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { colors } from '../../../constants';

const ChatPersonal = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params.item;
    useEffect(() => {
        navigation.setOptions({
            title: '',
        });
    }, []);

    const list = [
        {
            title: 'Trang cá nhân',
            iconName: 'account-circle',
            color: colors.grayBlue,
        },
        {
            title: 'Chặn/ Bỏ chặn',
            iconName: 'block',
            color: colors.red,
        },
    ];
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Avatar size={150} rounded source={{ uri: item.imgLink }} />
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
                    {item.namePerson}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                {list.map((element, index) => {
                    return (
                        <TouchableHighlight
                            key={index}
                            underlayColor="#DDDDDD"
                            onPress={() => {}}
                        >
                            <ListItem
                                key={index}
                                containerStyle={{ backgroundColor: 'none' }}
                            >
                                <ListItem.Content style={styles.contentStyle}>
                                    <Icon
                                        name={element.iconName}
                                        size={40}
                                        color={element.color}
                                        type="material"
                                    />
                                    <ListItem.Title style={styles.titleStyle}>
                                        {element.title}
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableHighlight>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        // textAlign: "center",
        flex: 1,
        // flexDirection: "column",
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontWeight: '700',

        marginHorizontal: 10,
    },
});

export default ChatPersonal;

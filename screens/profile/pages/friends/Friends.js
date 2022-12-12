import React from 'react';
import {
    View,
} from 'react-native';
import {
    Text,
    Icon,
    ListItem,
    BottomSheet,
    Input,
    Avatar
} from '@rneui/themed';
import { PageName } from 'navigation/constants';
import { colors, screen, env } from '@constants';
import { useSelector } from 'react-redux';
import { selectFriendList } from '../../reducers/friend.reducer';

function Friends(props) {
    const listFriend = useSelector(selectFriendList);

    const [isVisible, setIsVisible] = React.useState(false);

    const list = [
        {
            title: 'Nhắn tin',
            iconName: 'message'
        },
        {
            title: 'Chặn',
            iconName: 'block'
        },
        {
            title: 'Hủy kết bạn',
            iconName: 'highlight-off',
            onPress: () => setIsVisible(false),
        },
    ];

    return (
        <>
            <Input
                returnKeyType='search'
                placeholder='Search'
                leftIcon={<Icon name='search' />}
                inputStyle={{ fontSize: 17 }}
                containerStyle={{ height: 55 }}
                inputContainerStyle={styles.inputSearchContainer}
            />
            <Text style={[styles.name, {fontSize: 20, paddingBottom: 10}]}>
                {listFriend.length} người bạn
            </Text>
            {
                listFriend.map(f => {
                    return (
                        <View style={styles.container} key={f._id}>
                            <View style={styles.row}>
                                <Avatar
                                    size={75}
                                    rounded
                                    source={
                                        f?.avatar
                                            ? {
                                                uri: `${env.FILE_SERVICE_USER}/${f?.avatar.fileName}`,
                                            }
                                            : require('assets/default_avt.jpg')
                                    }
                                />
                                <Text style={styles.name}>{f.username}</Text>
                            </View>
                            <Icon
                                type="material"
                                name="more-horiz"
                                style={{ padding: 8 }}
                                onPress={() => setIsVisible(true)}
                            />
                        </View>
                    )
                })
            }


            <BottomSheet
                isVisible={isVisible}
                modalProps={{
                    animationType: 'fade'
                }}
                onBackdropPress={() => setIsVisible(false)}
            >
                {list.map((l, i) => (
                    <ListItem key={i} onPress={l.onPress}>
                        <ListItem.Content style={styles.contentStyle}>
                            <Icon name={l.iconName} type='material' />
                            <ListItem.Title style={styles.titleStyle}>
                                {l.title}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </>

    );
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    row: {
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17,
        padding: 10
    },
    inputSearchContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 0,
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    titleStyle: {
        fontWeight: '700',
        marginHorizontal: 10
    },
}

export default Friends;

import { Avatar, Button, Divider, Icon, Image, Text } from '@rneui/themed';
import { colors, screen, status } from '@constants';
import { PageName } from 'navigation/constants';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from 'utilities/User';
import { env } from '@constants';
import { getStatusFriend, getUserProfile, selectFriendList, selectFriendProfile, selectIsLoading } from '../reducers/friend.reducer';
import { useFocusEffect } from '@react-navigation/native';

function FriendProfile(props) {
    const { navigation, route } = props;
    const dispatch = useDispatch();
    const { navigate, goBack } = navigation;

    const friendId = route?.params?._id;
    const friend = useSelector(selectFriendProfile);
    const refreshing = useSelector(selectIsLoading);

    const onRefresh = React.useCallback(() => {
        dispatch(getUserProfile(friendId));
    }, []);

    useFocusEffect(
        useCallback(() => {
            dispatch(getStatusFriend(friendId));
        }, [])
    );

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Image
                style={styles.cover}
                source={
                    friend?.cover_image
                        ? {
                            uri: `${env.FILE_SERVICE_USER}/${friend?.cover_image.fileName}`,
                        }
                        : require('assets/default_cover.jpg')
                }
                containerStyle={styles.coverContainer}
            />
            <View style={styles.header}>
                <Avatar
                    size={130}
                    rounded
                    source={
                        friend?.avatar
                            ? {
                                uri: `${env.FILE_SERVICE_USER}/${friend?.avatar.fileName}`,
                            }
                            : require('assets/default_avt.jpg')
                    }
                    containerStyle={{
                        borderWidth: 4,
                        borderColor: colors.white,
                    }}
                />
                <Text style={styles.name}>{getUserName(friend)}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        friend?.status === status.FRIEND ? (
                            <Button
                                color={colors.grayBlue}
                                buttonStyle={styles.button}
                            >
                                <Icon name="person-remove" color="white" />
                                <Text style={[styles.textButton, { color: 'white' }]}> Xóa kết bạn</Text>
                            </Button>
                        ) : (
                            <Button
                                color={colors.grayBlue}
                                buttonStyle={styles.button}
                            >
                                <Icon name="person-add-alt-1" color="white" />
                                <Text style={[styles.textButton, { color: 'white' }]}> Thêm bạn bè</Text>
                            </Button>
                        )
                    }
                    <Button
                        color={colors.gray}
                        buttonStyle={styles.button}
                    >
                        <Icon name="message" color="black" />
                        <Text style={styles.textButton}> Nhắn tin</Text>
                    </Button>
                    <Button
                        color={colors.gray}
                        buttonStyle={styles.button}
                    >
                        <Icon name="block" color="black" />
                        <Text style={styles.textButton}> Chặn</Text>
                    </Button>
                </View>
            </View>
            <Divider
                width={10}
                color={colors.gray}
                style={{ marginVertical: 14 }}
            />
        </ScrollView>
    );
}

const styles = {
    header: {
        paddingHorizontal: '5%',
        marginTop: 100,
    },
    cover: {
        height: 200,
        width: screen.width,
    },
    coverContainer: {
        position: 'absolute',
    },
    name: {
        fontSize: 25,
        color: colors.text,
        fontWeight: '700',
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
    },
    textButton: {
        fontWeight: '700',
    },
};

export default FriendProfile;

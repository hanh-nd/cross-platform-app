import { Avatar, Button, Divider, Icon, Image, Text } from '@rneui/themed';
import { colors, screen } from '@constants';
import { PageName } from 'navigation/constants';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from 'utilities/User';
import { selectIsLoading, selectLoginUser } from '../../auth/reducers/auth.reducer';
import { fetchSelfDetail } from 'screens/auth/reducers/auth.reducer';
import { env } from '@constants';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Profile(props) {
    const loginUser = useSelector(selectLoginUser);
    const refreshing = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    const onRefresh = React.useCallback(() => {
        dispatch(fetchSelfDetail());
    }, []);

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
                    loginUser?.cover_image
                        ? {
                            uri: `${env.FILE_SERVICE_USER}/${loginUser?.cover_image.fileName}`,
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
                        loginUser?.avatar
                            ? {
                                uri: `${env.FILE_SERVICE_USER}/${loginUser?.avatar.fileName}`,
                            }
                            : require('assets/default_avt.jpg')
                    }
                    containerStyle={{
                        borderWidth: 4,
                        borderColor: colors.white,
                    }}
                />
                <Text style={styles.name}>{getUserName(loginUser)}</Text>
                <View>
                    <Button
                        color={colors.gray}
                        buttonStyle={styles.button}
                        onPress={() =>
                            navigate({
                                name: PageName.EDIT_PROFILE,
                            })
                        }
                    >
                        <Icon name="edit" color="black" />
                        <Text style={styles.textButton}>
                            {' '}
                            Chỉnh sửa trang cá nhân
                        </Text>
                    </Button>
                </View>
                {/* friend profile */}
                {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button 
                        color={colors.grayBlue} 
                        buttonStyle={styles.button}
                        onPress={() => navigate({ 
                            name: PageName.EDIT_PROFILE                        
                        })}
                    >
                        <Icon name="person-add-alt-1" color="white" />
                        <Text style={[styles.textButton, {color: 'white'}]}> Thêm bạn bè</Text>
                    </Button>
                    <Button 
                        color={colors.gray} 
                        buttonStyle={styles.button}
                        onPress={() => navigate({ 
                            name: PageName.EDIT_PROFILE                        
                        })}
                    >
                        <Icon name="message" color="black" />
                        <Text style={styles.textButton}> Nhắn tin</Text>
                    </Button>
                    <Button 
                        color={colors.gray} 
                        buttonStyle={styles.button}
                        onPress={() => navigate({ 
                            name: PageName.EDIT_PROFILE                        
                        })}
                    >
                        <Icon name="block" color="black" />
                        <Text style={styles.textButton}> Chặn</Text>
                    </Button>
                </View> */}
            </View>
            <Divider
                width={10}
                color={colors.gray}
                style={{ marginVertical: 14 }}
            />
            <View style={styles.friend}>
                <Text style={styles.label}>Bạn bè</Text>
                <Text style={{ color: colors.placeholder }}>83 người bạn</Text>
                <View style={styles.preview}>
                    <Avatar
                        size={110}
                        source={require('assets/default_avt.jpg')}
                        containerStyle={styles.friendAvatar}
                    />
                    <Avatar
                        size={110}
                        source={require('assets/default_avt.jpg')}
                        containerStyle={styles.friendAvatar}
                    />
                    <Avatar
                        size={110}
                        source={require('assets/default_avt.jpg')}
                        containerStyle={styles.friendAvatar}
                    />
                    <Avatar
                        size={110}
                        source={require('assets/default_avt.jpg')}
                        containerStyle={styles.friendAvatar}
                    />
                    <Avatar
                        size={110}
                        source={require('assets/default_avt.jpg')}
                        containerStyle={styles.friendAvatar}
                    />
                    <Avatar
                        size={110}
                        source={require('assets/default_avt.jpg')}
                        containerStyle={styles.friendAvatar}
                    />
                </View>
                <Button
                    color={colors.gray}
                    buttonStyle={styles.button}
                    onPress={() => navigate({ name: PageName.LIST_FRIENDS })}
                >
                    <Text style={styles.textButton}>Xem tất cả bạn bè</Text>
                </Button>
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
    friend: {
        paddingHorizontal: '5%',
    },
    preview: {
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    friendAvatar: {
        marginVertical: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
    },
};

export default Profile;

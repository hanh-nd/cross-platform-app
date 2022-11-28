import React from 'react';
import {
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import {
    Text,
    Image,
    Button,
    Icon
} from '@rneui/themed';
import { colors, screen } from '../../constants';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function Profile(props) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1500).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
            <Image
                style={styles.cover}
                source={require('../../assets/default_cover.jpg')}
                containerStyle={styles.coverContainer} />
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={require('../../assets/default_avt.jpg')}
                />
                <Text style={styles.name}>Hoang Anh</Text>
                <View>
                    <Button type="solid" color={colors.gray} buttonStyle={styles.button}>
                        <Icon name="edit" color="black" />
                        <Text style={styles.textButton}> Chỉnh sửa trang cá nhân</Text>
                    </Button>
                </View>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.friend}>
                <Text style={styles.label}>Bạn bè</Text>
                <Text style={{color: colors.placeholder}}>83 người bạn</Text>
                <View style={styles.preview}>
                    <Image
                        style={styles.friendAvatar}
                        source={require('../../assets/default_avt.jpg')}
                    />
                    <Image
                        style={styles.friendAvatar}
                        source={require('../../assets/default_avt.jpg')}
                    />
                    <Image
                        style={styles.friendAvatar}
                        source={require('../../assets/default_avt.jpg')}
                    />
                    <Image
                        style={styles.friendAvatar}
                        source={require('../../assets/default_avt.jpg')}
                    />
                    <Image
                        style={styles.friendAvatar}
                        source={require('../../assets/default_avt.jpg')}
                    />
                    <Image
                        style={styles.friendAvatar}
                        source={require('../../assets/default_avt.jpg')}
                    />
                </View>
                <Button type="solid" color={colors.gray} buttonStyle={styles.button}>
                    <Text style={styles.textButton}>Xem tất cả bạn bè</Text>
                </Button>
            </View>
            <View style={styles.divider}></View>
        </ScrollView>
    );
}

const styles = {
    header: {
        paddingHorizontal: '5%',
        marginTop: 100
    },
    cover: {
        height: 200,
        width: screen.width
    },
    coverContainer: {
        position: 'absolute',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: colors.white,
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between'
    },
    friendAvatar: {
        width: 110,
        height: 110,
        marginVertical: 5,
        borderRadius: 5
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
    },

    divider: {
        marginVertical: 14,
        height: 12,
        width: '100%',
        backgroundColor: colors.gray
    }
};

export default Profile;
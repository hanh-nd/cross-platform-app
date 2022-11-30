import React from 'react';
import {
    View,
} from 'react-native';
import {
    Text,
    Button,
    Avatar,
    ListItem,
    BottomSheet,
    Icon
} from '@rneui/themed';
import { colors, screen } from 'constants';

function Blocked(props) {
    const [isVisible, setIsVisible] = React.useState(false);

    const list = [
        {
            title: 'Bỏ chặn',
            iconName: 'add-circle-outline'
        },
        {
            title: 'Hủy',
            iconName: 'highlight-off',
            onPress: () => setIsVisible(false),
        },
    ];

    return (
        <>
            <Text style={styles.label}>Người bị chặn</Text>
            <Text style={styles.text}>Khi bạn chặn ai đó, họ sẽ không xem được nội dung bạn đăng trên dòng thời gian của mình, mời bạn tham gia sự kiện hoặc nhóm, bắt đầu cuộc trò chuyện với bạn hay thêm bạn làm bạn bè.</Text>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Avatar
                        size={75}
                        rounded
                        source={require('assets/default_avt.jpg')}
                    />
                    <Text style={styles.name}>Roronoa Zoro</Text>
                </View>
                <Button type='clear'
                    titleStyle={{color: '#646464'}}
                    onPress={() => setIsVisible(true)}
                >
                    Bỏ chặn
                </Button>
            </View>
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
    label: {
        fontSize: 18,
        fontWeight: '700'
    },
    text: {
        color: '#9e9b9b',
        fontSize: 12,
        marginBottom: 10
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


export default Blocked;

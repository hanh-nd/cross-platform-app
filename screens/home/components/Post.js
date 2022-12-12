import { screen } from '@/constants';
import { Avatar, Button, Divider, Icon, ListItem, Text } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { UIImage } from '../../../components';
import { env } from '../../../constants';
import dayjs from '../../../plugins/dayjs';
import { getUserName } from '../../../utilities/User';
import { fetchPostList, likePost } from '../reducers/home.reducer';

function Post(props) {
    const { post } = props;
    const {
        _id,
        author,
        described,
        images,
        createdAt,
        isLike,
        like,
        countComments,
    } = post;

    const dispatch = useDispatch();

    const actionLike = async () => {
        await dispatch(likePost(_id)).unwrap();
        dispatch(fetchPostList());
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar
                    rounded
                    size={60}
                    source={
                        author?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${author?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <View style={styles.detail}>
                    <ListItem.Content>
                        <ListItem.Title>
                            <Text style={styles.username}>{`${getUserName(
                                author
                            )}`}</Text>
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            <Text>{`${dayjs(
                                createdAt
                            ).fmHHmmDDMMYYYY()}`}</Text>
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>{described}</Text>
                {images && images.length ? (
                    <View>
                        <UIImage
                            source={{
                                uri: `${env.FILE_SERVICE_USER}/${images[0].fileName}`,
                            }}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </View>
                ) : null}
            </View>
            <View style={styles.statisticGroup}>
                <View style={styles.statisticItem}>
                    <Icon
                        name={'thumb-up'}
                        size={14}
                        style={{ marginRight: 4 }}
                    />
                    <Text>{like.length}</Text>
                </View>
                <View style={styles.statisticItem}>
                    <Text>{countComments} bình luận</Text>
                </View>
            </View>
            <Divider />
            <View style={styles.buttonGroup}>
                <Button
                    type="solid"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title="Thích"
                    icon={
                        <Icon name={isLike ? 'thumb-up' : 'thumb-up-off-alt'} />
                    }
                    titleStyle={{
                        ...styles.title,
                    }}
                    onPress={actionLike}
                />
                <Button
                    type="solid"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title="Bình luận"
                    icon={<Icon name="chat-bubble" />}
                    titleStyle={styles.title}
                />
            </View>
        </View>
    );
}
const styles = {
    container: {
        width: screen.width,
        backgroundColor: 'white',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        padding: 8,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 8,
        padding: 8,
    },
    content: {
        marginBottom: 8,
    },
    contentText: {
        padding: 8,
    },
    statisticGroup: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
    },
    statisticItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonGroup: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        flex: 1,
        padding: 8,
    },
    buttonStyle: {
        backgroundColor: '#E5E5E5',
    },
    title: {
        marginLeft: 8,
        color: 'black',
    },
};

export default Post;

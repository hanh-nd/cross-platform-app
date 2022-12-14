import { UIImage } from '@/components';
import { env, screen } from '@/constants';
import { PageName } from '@/navigation/constants';
import dayjs from '@/plugins/dayjs';
import { getUserName } from '@/utilities/User';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Divider, Icon, ListItem, Text } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
    likePost,
    fetchPostList,
} from '../../screens/home/reducers/home.reducer';
import ReadMore from 'react-native-read-more-text';

function Post(props) {
    const { post, onLike } = props;
    const navigation = useNavigation();

    const dispatch = useDispatch();

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

    const { navigate } = navigation;

    const actionLike = async () => {
        await dispatch(likePost(_id)).unwrap();
        dispatch(fetchPostList());
        if (onLike) {
            onLike(_id);
        }
    };

    const actionComment = () => {
        navigate({
            name: PageName.POST_DETAIL_PAGE,
            params: {
                postId: _id,
            },
        });
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
                                author,
                            )}`}</Text>
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            <Text>{`${dayjs(
                                createdAt,
                            ).fmHHmmDDMMYYYY()}`}</Text>
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.contentText}>
                    <ReadMore numberOfLines={5}>{described}</ReadMore>
                </View>
                {images && images.length ? (
                    <View style={styles.imageContainer}>
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
                    <Text>{like?.length || 0}</Text>
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
                    onPress={actionComment}
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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

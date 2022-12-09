import { Avatar, Button, Icon, Image, ListItem, Text } from '@rneui/themed';
import dayjs from '../../../plugins/dayjs';
import { ActivityIndicator, View } from 'react-native';
import { env } from '../../../constants';
import { screen } from '@constants';
import { getUserName } from '../../../utilities/User';

function Post(props) {
    const { post } = props;
    const { author, described, images, updatedAt } = post;

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
                                updatedAt
                            ).fmHHmmDDMMYYYY()}`}</Text>
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>{described}</Text>
                {images && images.length ? (
                    <View>
                        <Image
                            source={{
                                uri: `${env.FILE_SERVICE_USER}/${images[0].fileName}`,
                            }}
                            containerStyle={styles.image}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </View>
                ) : null}
            </View>
            <View style={styles.buttonGroup}>
                <Button
                    type="solid"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title="Thích"
                    icon={<Icon name="sports" />}
                    titleStyle={styles.title}
                />
                <Button
                    type="solid"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title="Bình luận"
                    icon={<Icon name="sports" />}
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
        marginBottom: 16,
    },
    contentText: {
        padding: 8,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        flex: 1,
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

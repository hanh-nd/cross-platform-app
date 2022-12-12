import { env, screen } from '@/constants';
import { Avatar } from '@rneui/themed';
import { Text, View } from 'react-native';
import { getUserName } from '@/utilities/User';

function Comment(props) {
    const { comment } = props;
    const { user, content } = comment;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar
                    rounded
                    size={48}
                    source={
                        user?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${user?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <Text style={styles.username}>{`${getUserName(user)}`}</Text>
            </View>
            <View style={styles.content}>
                <Text>{content}</Text>
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
    content: {
        padding: 8,
    },
};

export default Comment;

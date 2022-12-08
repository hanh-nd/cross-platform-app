import { Avatar, Text } from '@rneui/themed';
import { View } from 'react-native';
import { screen } from 'constants';

function CreatePost(props) {
    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size={48}
                source={require('assets/default_avt.jpg')}
            />
            <View style={styles.content}>
                <Text>Bạn đang nghĩ gì?</Text>
            </View>
        </View>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: screen.width,
        padding: 8,
        backgroundColor: 'white',
    },
    content: {
        marginLeft: 8,
        height: 56,
        flex: 1,
        backgroundColor: '#E5E5E5',
        padding: 16,
    },
};

export default CreatePost;

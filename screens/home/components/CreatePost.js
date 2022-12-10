import { useNavigation } from '@react-navigation/native';
import { Avatar, Text } from '@rneui/themed';
import { screen } from '@constants';
import { TouchableOpacity, View } from 'react-native';
import { PageName } from '../../../navigation/constants';

function CreatePost(props) {
    const { navigate } = useNavigation();

    const onPress = () => {
        navigate({
            name: PageName.CREATE_POST_PAGE,
        });
    };

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size={48}
                source={require('assets/default_avt.jpg')}
            />
            <TouchableOpacity style={styles.content} onPress={onPress}>
                <View>
                    <Text>Bạn đang nghĩ gì?</Text>
                </View>
            </TouchableOpacity>
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

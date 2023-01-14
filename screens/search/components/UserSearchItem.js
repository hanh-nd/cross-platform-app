import { Avatar } from '@rneui/themed';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { env } from '../../../constants';
import { getUserName } from '../../../utilities/User';
function UserSearchItem(props) {
    const { item, type } = props;


    const openUserProfile = () => {
        // TODO
    }

    return (
        <TouchableOpacity onPress={openUserProfile}>
            <View style={styles.container}>
                <Avatar
                    rounded
                    size={48}
                    source={
                        item?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${item?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <View style={styles.detail}>
                    <Text style={styles.name}>{getUserName(item)}</Text>
                    <Text>{type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    detail: {
        display: 'flex',
        marginLeft: 24,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1
    },
};

export default UserSearchItem;

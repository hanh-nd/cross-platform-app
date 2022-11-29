import {
    Text,
    Image,
    Button,
    Icon,
    Divider,
    Avatar
} from '@rneui/themed';
import { View } from 'react-native';
import { colors, screen } from '../../../constants';
import { PageName } from '../../../navigation/constants';

function EditProfile(props) {

    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Ảnh đại diện</Text>
                <Button type='clear'>Chỉnh sửa</Button>
            </View>
            <View style={styles.avatarContainer}>
                <Avatar
                    size={130}
                    rounded
                    source={require('../../../assets/default_avt.jpg')}
                />
            </View>
            <Divider width={1} color={colors.gray} style={{marginVertical: 14}}/>
            <View style={styles.row}>
                <Text style={styles.label}>Ảnh bìa</Text>
                <Button type='clear'>Chỉnh sửa</Button>
            </View>
            <View style={{ width: '100%' }}>
                <Image
                    style={styles.cover}
                    source={require('../../../assets/default_cover.jpg')}
                />
            </View>
            <Divider width={1} color={colors.gray} style={{marginVertical: 14}}/>
            <Button
                type="solid"
                color={colors.gray}
                buttonStyle={styles.button}
                onPress={() => navigate({
                    name: PageName.EDIT_USER
                })}
            >
                <Icon name="edit" color="black" />
                <Text style={styles.textButton}> Chỉnh sửa thông tin cá nhân</Text>
            </Button>
        </View>
    );
}


const styles = {
    container: {
        paddingHorizontal: '5%',
    },
    avatarContainer: {
        alignItems: 'center',
    },
    cover: {
        height: 200,
        width: '100%',
        borderRadius: 5
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontWeight: '700',
        fontSize: 17,
    },
    button: {
        borderRadius: 5,
        marginVertical: 10
    },
    textButton: {
        fontWeight: '700',
    }
};

export default EditProfile;

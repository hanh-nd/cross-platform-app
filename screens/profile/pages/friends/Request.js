import React from 'react';
import {
    View,
} from 'react-native';
import {
    Text,
    Icon,
    Button,
    Input,
    Avatar
} from '@rneui/themed';
import { PageName } from '../../../navigation/constants';
import { colors, screen } from '../../../../constants';

function Request(props) {
    return (
        <>
            <Text style={styles.label}>Lời mời kết bạn</Text>

            <View style={styles.container}>
                <Avatar
                    size={75}
                    rounded
                    source={require('../../../../assets/default_avt.jpg')}
                />
                <View>
                    <Text style={styles.name}>Roronoa Zoro</Text>
                    <View style={styles.buttonContainer}>
                        <Button buttonStyle={styles.buttonAccept} color={colors.grayBlue}>
                                Chấp nhận
                        </Button>
                        <Button 
                            buttonStyle={styles.buttonReject}
                            color={colors.gray}
                            titleStyle={{color: 'black'}}
                        >
                            Từ chối
                        </Button>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        marginVertical: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    buttonAccept: {
        borderRadius: 5,
        paddingHorizontal: 15
    },
    buttonReject: {
        borderRadius: 5,
        marginLeft: 8,
        paddingHorizontal: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
}

export default Request;

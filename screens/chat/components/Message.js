import { Avatar } from '@rneui/themed';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { env } from '../../../constants';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import dayjs from '../../../plugins/dayjs';

function Message(props) {
    const { sender, content, time } = props;
    const loginUser = useSelector(selectLoginUser);

    const status = useMemo(() => sender._id == loginUser._id, [loginUser]);

    return (
        <View
            style={{
                ...styles.messageWrapper,
                ...(status && { alignItems: 'flex-end' }),
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                    size={30}
                    rounded
                    source={
                        sender?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${sender?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <View
                    style={
                        status
                            ? styles.message
                            : [styles.message, { backgroundColor: '#4e69a2' }]
                    }
                >
                    <Text style={{ color: status ? '#000000' : '#ffffff' }}>
                        {content}
                    </Text>
                </View>
            </View>
            <Text style={{ marginLeft: 40 }}>{dayjs(time).fmHHmmDDMMYYYY()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    messageWrapper: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    message: {
        maxWidth: '50%',
        backgroundColor: '#d3d3d3',
        padding: 15,
        borderRadius: 10,
        marginBottom: 2,
    },
});
export default Message;

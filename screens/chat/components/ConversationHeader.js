import { Avatar } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { env } from '../../../constants';
import { getUserName } from '../../../utilities/User';

const ConversationHeader = (props) => {
    const { user } = props;

    return (
        <View style={styles.conversationItem}>
            <View style={{ flex: 0.5 }}>
                <Avatar
                    rounded
                    size={40}
                    source={
                        user?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${user?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={styles.namePerson}>{getUserName(user)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    conversationItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        // marginVertical: 8,
    },
    namePerson: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ConversationHeader;

import { useNavigation } from '@react-navigation/native';
import { Avatar, Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../constants';
import { PageName } from '../../../navigation/constants';

const ConversationHeader = (props) => {
    const { item } = props;

    return (
        <View style={styles.conversationItem}>
            <View style={{ flex: 0.5 }}>
                <Avatar size={40} rounded source={{ uri: item.imgLink }} />
            </View>
            <View style={{ flex: 3 }}>
                <Text style={styles.namePerson}>{item.namePerson}</Text>
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

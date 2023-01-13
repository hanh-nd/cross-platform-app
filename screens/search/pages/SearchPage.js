import { Input, Text } from '@rneui/themed';
import { useEffect } from 'react';
import { View } from 'react-native';

function SearchPage(props) {
    const { navigation } = props;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Input placeholder="Nhập để tìm kiếm" />,
        });
    }, []);

    return (
        <>
            <View></View>
            <Text>Search</Text>
        </>
    );
}

const styles = {};

export default SearchPage;

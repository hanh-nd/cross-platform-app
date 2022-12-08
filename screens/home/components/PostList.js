import { useEffect } from 'react';
import { FlatList, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostList, selectPostList } from '../reducers/home.reducer';
import Post from './Post';
import { screen } from 'constants';

function PostList(props) {
    const postList = useSelector(selectPostList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostList());
    }, []);

    return (
        <View style={styles.container}>
            {postList.length ? (
                <FlatList
                    data={postList}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 16 }} />
                    )}
                    renderItem={({ item }) => <Post post={item} />}
                />
            ) : (
                <View style={styles.emptyList}>
                    <Image
                        style={styles.emptyImage}
                        source={{
                            uri: 'https://icon-library.com/images/no-data-icon/no-data-icon-10.jpg',
                        }}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>
    );
}

const styles = {
    container: {
        width: screen.width,
        height: screen.height,
    },
    emptyList: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: screen.width,
        height: screen.height,
    },
    emptyImage: {
        width: screen.width / 2,
        height: screen.height / 2,
    },
};

export default PostList;

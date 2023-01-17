import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalCache = {
    getPostList: (cb) => {
        return AsyncStorage.getItem('postList', (err, res) => {
            try {
                const list = JSON.parse(res);
                cb(list);
            } catch (error) {
                cb([]);
            }
        });
    },

    setPostList: (postList) => {
        AsyncStorage.setItem('postList', JSON.stringify(postList));
    },
};

export default LocalCache;

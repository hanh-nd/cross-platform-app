import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import { DismissKeyboardView } from '../../../components';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import { screen } from 'constants';
function Home(props) {
    const dispatch = useDispatch();
    const { navigation, route } = props;
    //functions of navigate to/back
    const { navigate, goBack } = navigation;

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    backAction
                );
            };
        }, [])
    );

    const backAction = async () => {
        BackHandler.exitApp();
    };

    return (
        <DismissKeyboardView style={styles.container}>
            <View style={styles.createPost}>
                <CreatePost />
            </View>
            <View style={styles.postList}>
                <PostList />
            </View>
        </DismissKeyboardView>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screen.width,
        height: screen.height,
        backgroundColor: '#D9D9D9',
        flex: 1,
    },
    createPost: {
        marginBottom: 16,
        width: screen.width,
    },
    postList: {
        flex: 1,
    },
};

export default Home;

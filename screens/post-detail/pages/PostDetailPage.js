import { Post } from '@/components';
import { screen } from '@/constants';
import { Divider, Icon, Input } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostList } from '../../home/reducers/home.reducer';
import CommentList from '../components/CommentList';
import {
    createPostComment,
    getPostComments,
    getPostDetail,
    selectPostComments,
    selectPostDetail,
} from '../reducers/post-detail.reducer';

function PostDetailPage(props) {
    const { route } = props;
    const { postId } = route.params;

    const dispatch = useDispatch();

    const [comment, setComment] = useState('');

    const post = useSelector(selectPostDetail);
    const comments = useSelector(selectPostComments);

    const _getDetail = (postId) => {
        dispatch(getPostDetail(postId));
        dispatch(getPostComments(postId));
    };

    const onLike = async (id) => {
        _getDetail(id);
    };

    const sendComment = async () => {
        await dispatch(
            createPostComment({
                postId,
                body: {
                    content: comment,
                },
            })
        ).unwrap();
        setComment('');
        _getDetail(postId);
        dispatch(fetchPostList);
    };

    useEffect(() => {
        _getDetail(postId);
    }, [postId]);

    return (
        <ScrollView
            horizontal={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            <Post post={post} style={{ height: '100%' }} onLike={onLike} />
            <Divider />
            <Input
                value={comment}
                containerStyle={{ backgroundColor: 'white' }}
                multiline={true}
                placeholder="Nhập bình luận..."
                rightIcon={<Icon name="send" onPress={sendComment} />}
                onChangeText={(value) => setComment(value)}
            />
            <Divider />
            <ScrollView horizontal={true}>
                <CommentList comments={comments} />
            </ScrollView>
        </ScrollView>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',

        width: screen.width,
        height: screen.height,
        backgroundColor: '#D9D9D9',
        flex: 1,
    },
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
};

export default PostDetailPage;

import { Post } from '@/components';
import { screen } from '@/constants';
import { Divider, Icon, Input } from '@rneui/themed';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostList } from '../../home/reducers/home.reducer';
import CommentList from '../components/CommentList';
import {
    createPostComment,
    getPostComments,
    getPostDetail,
    selectIsLoading,
    selectPostComments,
    selectPostDetail,
} from '../reducers/post-detail.reducer';
import { commentSchema } from '../schema';

function PostDetailPage(props) {
    const { route } = props;
    const { postId } = route.params;

    const dispatch = useDispatch();

    const initialValues = {
        comment: '',
    };

    const post = useSelector(selectPostDetail);
    const comments = useSelector(selectPostComments);
    const isLoading = useSelector(selectIsLoading);

    const onRefresh = () => {
        _getDetail(postId);
    };

    const _getDetail = (postId) => {
        dispatch(getPostDetail(postId));
        dispatch(getPostComments(postId));
    };

    const onLike = async (id) => {
        _getDetail(id);
    };

    const sendComment = async ({ comment }, { resetForm }) => {
        await dispatch(
            createPostComment({
                postId,
                body: {
                    content: comment,
                },
            }),
        ).unwrap();
        resetForm();
        _getDetail(postId);
        dispatch(fetchPostList());
    };

    useEffect(() => {
        _getDetail(postId);
    }, [postId]);

    return (
        <ScrollView
            horizontal={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
        >
            <Post post={post} style={{ height: '100%' }} onLike={onLike} />
            <Divider />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    sendComment(values, { resetForm });
                }}
                validationSchema={commentSchema}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    isValid,
                    errors,
                    resetForm,
                }) => (
                    <Input
                        name="comment"
                        value={values.comment}
                        containerStyle={{ backgroundColor: 'white' }}
                        multiline={true}
                        placeholder="Nhập bình luận..."
                        rightIcon={<Icon name="send" onPress={handleSubmit} />}
                        onChangeText={handleChange('comment')}
                        errorMessage={errors.comment}
                    />
                )}
            </Formik>
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

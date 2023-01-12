import { env, screen } from '@/constants';
import { Avatar, Button, Input, ListItem } from '@rneui/themed';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { UIImage } from '../../../components';
import { getBase64MediaList } from '../../../plugins/image-picker';
import { editPost } from '../../../services/post.api';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../../utilities/Notification';
import { getUserName } from '../../../utilities/User';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import {
    getPostDetail,
    selectPostDetail,
} from '../../post-detail/reducers/post-detail.reducer';
import { fetchPostList } from '../reducers/home.reducer';
import { createPostSchema } from '../schema';

function EditPostPage(props) {
    const loginUser = useSelector(selectLoginUser);

    const { navigation, route } = props;
    const { id } = route.params;
    const { navigate, goBack } = navigation;

    const dispatch = useDispatch();

    const post = useSelector(selectPostDetail);

    const [images, setImages] = useState();

    const initialValues = {
        described: post.described,
    };

    const _getDetail = (id) => {
        dispatch(getPostDetail(id));
    };

    useEffect(() => {
        _getDetail(id);
    }, [id]);

    const edit = async (body) => {
        if (images && images.length) {
            Object.assign(body, {
                images,
            });
        }
        const response = await editPost(id, body);
        if (response?.success) {
            showSuccessMessage('Chỉnh sửa bài viết thành công');
            goBack();
            dispatch(fetchPostList());
            dispatch(getPostDetail(id));
            return;
        }

        showErrorMessage('Chỉnh sửa bài viết thất bại', response?.message);
    };

    const pickImages = async () => {
        const images = await getBase64MediaList();
        setImages(images);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Avatar
                    rounded
                    size={60}
                    source={
                        loginUser?.avatar
                            ? {
                                  uri: `${env.FILE_SERVICE_USER}/${loginUser?.avatar.fileName}`,
                              }
                            : require('assets/default_avt.jpg')
                    }
                />
                <View style={styles.detail}>
                    <ListItem.Content>
                        <ListItem.Title>
                            <Text style={styles.username}>{`${getUserName(
                                loginUser,
                            )}`}</Text>
                        </ListItem.Title>
                    </ListItem.Content>
                </View>
            </View>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values) => edit(values)}
                validationSchema={createPostSchema}
            >
                {({ handleChange, handleSubmit, values, isValid, errors }) => (
                    <View style={styles.content}>
                        <Input
                            name="described"
                            placeholder="Bạn đang nghĩ gì?"
                            onChangeText={handleChange('described')}
                            value={values.described}
                            errorMessage={errors.described}
                            containerStyle={styles.textareaContainer}
                            inputStyle={styles.textarea}
                            multiline={true}
                            numberOfLines={10}
                        />
                        <Button
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >{`[Temp] Save`}</Button>
                    </View>
                )}
            </Formik>
            <Button onPress={pickImages}>Pick Image</Button>
            <FlatList
                data={images}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                renderItem={({ item }) => <UIImage source={{ uri: item }} />}
            />
        </View>
    );
}

const styles = {
    container: {
        width: screen.width,
        backgroundColor: '#E5E5E5',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        padding: 8,
        backgroundColor: 'white',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 8,
        padding: 8,
    },
    content: {
        backgroundColor: 'white',
        paddingVertical: 8,
    },
    textarea: {
        color: '#646464',
        backgroundColor: '#E5E5E5',
        textAlignVertical: 'top',
        padding: 8,
        borderRadius: 8,
    },
};
export default EditPostPage;

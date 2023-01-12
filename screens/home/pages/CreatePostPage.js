import { env, screen } from '@/constants';
import { Avatar, Button, Icon, Input, ListItem } from '@rneui/themed';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { UIImage } from '../../../components';
import { colors } from '../../../constants';
import { getBase64MediaList } from '../../../plugins/image-picker';
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../../utilities/Notification';
import { getUserName } from '../../../utilities/User';
import { selectLoginUser } from '../../auth/reducers/auth.reducer';
import { createNewPost, fetchPostList } from '../reducers/home.reducer';
import { createPostSchema } from '../schema';

function CreatePostPage(props) {
    const loginUser = useSelector(selectLoginUser);

    const { navigation } = props;
    const { navigate, goBack } = navigation;

    const dispatch = useDispatch();

    const formRef = useRef();
    const [images, setImages] = useState();

    const initialValues = {
        described: '',
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={formRef.current.handleSubmit}
                    title="Đăng"
                    disabled={!formRef.current.isValid}
                    disabledStyle={{ backgroundColor: colors.gray }}
                    radius={12}
                />
            ),
        });
    }, [formRef]);

    const createPost = async (body) => {
        if (images && images.length) {
            Object.assign(body, {
                images,
            });
        }
        const response = await dispatch(createNewPost(body)).unwrap();
        if (response?.success) {
            showSuccessMessage('Tạo bài viết thành công');
            goBack();
            dispatch(fetchPostList());
            return;
        }

        showErrorMessage('Tạo bài viết thất bại', response?.message);
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
                initialValues={initialValues}
                onSubmit={(values) => createPost(values)}
                validationSchema={createPostSchema}
                innerRef={formRef}
            >
                {({ handleChange, values, errors }) => (
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
                            numberOfLines={images ? 3 : 10}
                        />
                    </View>
                )}
            </Formik>
            <FlatList
                data={images}
                renderItem={({ item }) => <UIImage source={{ uri: item }} />}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.pickImage}>
                <Button
                    onPress={pickImages}
                    buttonStyle={styles.pickImageButton}
                >
                    <Icon name="image" color="black" size={28} />
                </Button>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
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
    pickImage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    pickImageButton: {
        margin: 8,
        backgroundColor: colors.gray,
    },
};
export default CreatePostPage;

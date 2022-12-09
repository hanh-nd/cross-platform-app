import { Avatar, Button, Input, ListItem } from '@rneui/themed';
import { screen } from 'constants';
import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PageName } from '../../../navigation/constants';
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
    const { navigate } = navigation;

    const dispatch = useDispatch();

    const initialValues = {
        described: '',
    };

    const createPost = async (body) => {
        const response = await dispatch(createNewPost(body)).unwrap();
        if (response?.success) {
            showSuccessMessage('Tạo bài viết thành công');
            navigate(PageName.TAB_NAVIGATOR, {
                screen: PageName.HOME,
            });
            dispatch(fetchPostList());
            return;
        }

        showErrorMessage('Tạo bài viết thất bại', response?.message);
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
                                loginUser
                            )}`}</Text>
                        </ListItem.Title>
                    </ListItem.Content>
                </View>
            </View>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => createPost(values)}
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
export default CreatePostPage;
import React, { useState } from 'react';
import { Text, Button, Input, Icon } from '@rneui/themed';

import { View, Keyboard } from 'react-native';
import { colors, screen, gender } from '@/constants';
import { PageName } from 'navigation/constants';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleEditSelfProfile,
    selectIsLoading,
    selectLoginUser,
} from '../../auth/reducers/auth.reducer';
import { getGender, getUserName } from 'utilities/User';
import { showErrorMessage, showSuccessMessage } from 'utilities/Notification';
import { Formik } from 'formik';
import { editProfileSchema } from '../schema';

function EditUser(props) {
    const pickerDateRef = React.useRef();
    const loginUser = useSelector(selectLoginUser);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    const [isDisplayDate, setShow] = useState(false);

    const changeSelectedDate = (event, setBirthday) => {
        const newBirthday =
            new Date(event?.nativeEvent?.timestamp) || initialValues.birthday;
        setShow(false);
        setBirthday('birthday', newBirthday);
    };

    const showDatePicker = () => {
        Keyboard.dismiss();
        setShow(true);
    };

    function openSelectPicker() {
        Keyboard.dismiss();
        pickerDateRef.current.focus();
    }

    const initialValues = {
        phonenumber: loginUser.phonenumber,
        username: getUserName(loginUser),
        gender: loginUser.gender,
        birthday: loginUser.birthday
            ? new Date(loginUser.birthday)
            : new Date(),
    };

    const editProfile = async ({ phonenumber, username, gender, birthday }) => {
        const response = await dispatch(
            handleEditSelfProfile({
                phonenumber,
                username,
                gender,
                birthday,
            })
        ).unwrap();

        if (response?.success) {
            showSuccessMessage('Thay đổi thông tin thành công');
            navigate({
                name: PageName.PROFILE,
            });
            return;
        }
        showErrorMessage('Thay đổi thông tin thất bại', response?.message);
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={editProfileSchema}
                onSubmit={(values) => editProfile(values)}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    isValid,
                    dirty,
                    setFieldValue,
                }) => (
                    <>
                        <Input
                            label="Họ và tên"
                            placeholder="Nhập họ tên"
                            value={values.username}
                            onChangeText={handleChange('username')}
                            errorMessage={errors.username}
                        />
                        <Input
                            label="Ngày sinh"
                            placeholder="Nhập ngày sinh"
                            value={moment(values.birthday).format('L')}
                            rightIcon={
                                <Icon
                                    name="edit"
                                    color="#86939e"
                                    type="material"
                                    size={25}
                                    onPress={showDatePicker}
                                />
                            }
                            editable={false}
                        />
                        <Input
                            editable={false}
                            label="Giới tính"
                            value={getGender(values.gender)}
                            rightIcon={
                                <Icon
                                    color="#86939e"
                                    name="edit"
                                    type="material"
                                    size={25}
                                    onPress={openSelectPicker}
                                />
                            }
                        />
                        <Input
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            keyboardType="numeric"
                            value={values.phonenumber}
                            onChangeText={handleChange('phonenumber')}
                            errorMessage={errors.phonenumber}
                        />
                        <Button
                            type="solid"
                            color={colors.primary}
                            buttonStyle={{ borderRadius: 5 }}
                            onPress={handleSubmit}
                            loading={isLoading}
                            disabled={!isValid || !dirty}
                        >
                            <Text style={styles.textButton}>
                                Thay đổi thông tin
                            </Text>
                        </Button>

                        {/* hidden picker */}
                        <Picker
                            ref={pickerDateRef}
                            selectedValue={values.gender}
                            style={{ display: 'none' }}
                            onValueChange={handleChange('gender')}
                        >
                            {gender.map((g) => {
                                return (
                                    <Picker.Item
                                        style={styles.pickerItem}
                                        label={g.label}
                                        value={g.value}
                                        key={g.value}
                                    />
                                );
                            })}
                        </Picker>

                        {isDisplayDate && (
                            <DateTimePicker
                                value={values.birthday}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={(event) =>
                                    changeSelectedDate(event, setFieldValue)
                                }
                            />
                        )}
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = {
    container: {
        paddingHorizontal: '5%',
        paddingVertical: 15,
    },
    textButton: {
        fontWeight: '700',
        color: colors.white,
    },
    pickerItem: {
        fontWeight: '700',
        fontSize: 19,
    },
};

export default EditUser;

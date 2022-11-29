import React, { useState } from 'react';
import {
    Text,
    Button,
    Input,
    Icon
} from '@rneui/themed';

import { View, Keyboard } from 'react-native';
import { colors, screen } from '../../../constants';
import { PageName } from '../../../navigation/constants';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';


function EditUser(props) {
    const pickerDateRef = React.useRef();

    const [selectedGender, setSelectedGender] = React.useState('Nam');

    const [mydate, setDate] = useState(new Date());
    const [isDisplayDate, setShow] = useState(false);

    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        setShow(false);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        Keyboard.dismiss();
        setShow(true);
    }

    function openSelectPicker() {
        Keyboard.dismiss();
        pickerDateRef.current.focus();
    }

    return (
        <View style={styles.container}>
            <Input
                label="Họ và tên"
                placeholder="Nhập họ tên"
                value='Hoang Anh'
            />
            <Input
                label="Ngày sinh"
                placeholder="Nhập ngày sinh"
                value={moment(mydate).format('L')}
                rightIcon={      
                    <Icon
                        name='edit'
                        color='#86939e'
                        type='material'
                        size={25}
                        onPress={showDatePicker}
                    />
                }
                editable={false}
            />
            <Input
                editable={false}
                label="Giới tính"
                keyboardType="numeric"
                value={selectedGender}
                rightIcon={      
                    <Icon
                        color='#86939e'
                        name='edit'
                        type='material'
                        size={25}
                        onPress={openSelectPicker}
                    />
                }
            />
            <Input
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value='0912975137'
            />
            <Button
                type="solid"
                color={colors.primary}
                buttonStyle={{ borderRadius: 5 }}
            >
                <Text style={styles.textButton}>Thay đổi thông tin</Text>
            </Button>

            {/* hidden picker */}
            <Picker
                ref={pickerDateRef}
                selectedValue={selectedGender}
                style={{display: 'none' }}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedGender(itemValue)
                }>
                <Picker.Item style={styles.pickerItem} label="Nam" value="Nam" />
                <Picker.Item style={styles.pickerItem} label="Nữ" value="Nữ" />
                <Picker.Item style={styles.pickerItem} label="Giới tính khác" value="Giới tính khác" />
            </Picker>

            {isDisplayDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={mydate}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}
                />
            )}
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
        color: colors.white
    },
    pickerItem: {
        fontWeight: '700',
        fontSize: 19,
    }
}

export default EditUser;
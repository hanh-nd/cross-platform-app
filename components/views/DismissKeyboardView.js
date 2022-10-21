import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    flex: 100,
                }}
            >
                <Comp {...props}>{children}</Comp>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};
export default DismissKeyboardHOC(View);

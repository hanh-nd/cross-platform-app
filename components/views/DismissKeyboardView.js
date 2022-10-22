import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => {
        props.style = props?.style || {};
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{
                            flex: 1,
                        }}
                    >
                        <Comp {...Object.assign(props.style, { flex: 1 })}>
                            {children}
                        </Comp>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    };
};
export default DismissKeyboardHOC(View);

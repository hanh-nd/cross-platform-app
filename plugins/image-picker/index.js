import * as ImagePicker from 'expo-image-picker';

const concatBase64 = (base64) => {
    return `data:image/jpg;base64,${base64}`;
};
export const getBase64ImageList = async (options) => {
    const _options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 4,
        aspect: [4, 3],
        base64: true,
        quality: 1,
    };

    if (options) {
        Object.assign(_options, options);
    }

    const result = await ImagePicker.launchImageLibraryAsync(_options);

    if (!result.cancelled) {
        if (result.uri) {
            if (result.base64) return [concatBase64(result.base64)];
        } else {
            const { selected } = result;
            return selected.reduce((base64List, selectedItem) => {
                if (selectedItem.base64)
                    base64List.push(concatBase64(selectedItem.base64));
                return base64List;
            }, []);
        }
    }
    return [];
};

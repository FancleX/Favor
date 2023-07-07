import { View, StyleSheet, Text } from 'react-native';
import { FormEntity, FormType } from './PostForm.d';
import { FlatList } from 'react-native-gesture-handler';
import { RequestCardData } from '../Request';
import { useCallback, useState } from 'react';
import GeneralInputBox from './GeneralInputBox';
import AddressInputBox from './AddressInputBox';
import DateInputBox from './DateInputBox';
import CategorySelectBox from './CategorySelectBox';
import { CategoryType } from '../Category';
import { Spacer } from '@react-native-material/core';

const forms: FormEntity[] = [
    {
        label: 'Post category',
        isOptional: false,
        autoSize: false,
        type: FormType.CategorySelect,
    },
    {
        label: 'Phone',
        isOptional: true,
        autoSize: false,
        type: FormType.Phone
    },
    // {
    //     label: 'Address',
    //     isOptional: false,
    //     autoSize: false,
    //     type: FormType.Address,
    // },
    // {
    //     label: 'Description',
    //     isOptional: false,
    //     autoSize: true,
    //     type: FormType.Normal,
    // },
    // {
    //     label: 'Start time',
    //     isOptional: true,
    //     autoSize: false,
    //     type: FormType.Date,
    // },
    // {
    //     label: 'End time',
    //     isOptional: true,
    //     autoSize: false,
    //     type: FormType.Date,
    // },
    // {
    //     label: 'Pay',
    //     isOptional: false,
    //     autoSize: false,
    //     type: FormType.Currency
    // }
];

export default function PostForm() {

    const [formData, setFormData] = useState<RequestCardData>({
        id: '',
        // From user state
        poster: {
            name: 'John',
            avatar: 'https://learnopencv.com/wp-content/uploads/2021/04/image-15.png',
            // changeable
            phone: '123456789',
            email: 'John@gmail.com'
        },
        category: CategoryType.BABYSITTING,
        address: {
            location: '',
            latitude: 0,
            longitude: 0
        },
        postDate: new Date(),
        description: '',
        startTime: new Date(),
        endTime: new Date(),
        pay: 0
    });

    const renderItem = useCallback((item: FormEntity) => {
        switch (item.type) {
            case FormType.Normal:
            case FormType.Currency:
            case FormType.Phone:
                return <GeneralInputBox {...item} onVerified={setFormData} />;
            case FormType.Address:
                return <AddressInputBox {...item} onVerified={setFormData} />
            case FormType.Date:
                return <DateInputBox {...item} onVerified={setFormData} />
            case FormType.CategorySelect:
                return <CategorySelectBox onSelect={setFormData} />
            default:
                throw new Error('Unkown form type');
        }
    }, [forms]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Your Request</Text>

            <FlatList
                data={forms}
                renderItem={({ item }) => (
                    <View>
                        {renderItem(item)}
                    </View>
                )}
                ItemSeparatorComponent={() => <Spacer style={{ margin: 10 }} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20
    }
});

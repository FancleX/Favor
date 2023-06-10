import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParamList } from '../navigation/Navigation';
import RequestFilter from '../components/RequestFilter';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { RequestDummyData } from '../dev/Dummy';
import RequestCard, { RequestCardData } from '../components/RequestCard';
import { Divider } from '@rneui/themed';
import RequestCardSkeleton from '../skeletons/RequestCardSkeleton';

interface Props extends StackScreenProps<RootNavParamList, 'Request'> { }

export default function Request({ route }: Props) {
    const { categoryType } = route.params;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<RequestCardData[]>([]);

    useEffect(() => {
        // send request
        setIsLoading(true);
        RequestDummyData.getRequestData(categoryType)
            .then((data) => {
                if (data !== null) {
                    setRequestData(data);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));

    }, []);

    const onFilterSelectedHandler = (selectedItem: string, index: number) => {
        console.log(selectedItem + index)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <RequestFilter
                        onSelectedHandler={onFilterSelectedHandler}
                    />
                </View>

                <Divider />

                <View>
                    {
                        isLoading ? <RequestCardSkeleton />
                            : <FlatList
                                data={requestData}
                                renderItem={({ item }) => <RequestCard {...item} />}
                                keyExtractor={(item) => item.id}
                                ItemSeparatorComponent={() => <Divider />}
                            />
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    filterContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

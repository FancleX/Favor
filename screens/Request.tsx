import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParamList } from '../types/Navigation';
import RequestFilter, { FilterOptions } from '../components/RequestFilter';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { RequestDummyData } from '../dev/Dummy';
import RequestCard, { RequestCardProps } from '../components/RequestCard';
import { Divider } from '@rneui/themed';
import RequestCardSkeleton from '../skeletons/RequestCardSkeleton';
import * as Location from 'expo-location';
import Toast from 'react-native-root-toast';

interface Props extends StackScreenProps<RootNavParamList, 'Request'> { }

export default function Request({ route }: Props) {
    const { categoryType } = route.params;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cardsData, setCardsData] = useState<RequestCardProps[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        // enable loading ui
        setIsLoading(true);

        getLocation()
            .then((location) => {
                // get current location if available
                if (location) {
                    setCurrentLocation(location);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                // fulfill card data
                RequestDummyData.getRequestData(categoryType)
                    .then((data) => {
                        if (data !== null) {
                            const cardList: RequestCardProps[] = [];

                            data.forEach((item) => {
                                const cardData: RequestCardProps = { ...item, timeGap: 0 };

                                if (currentLocation) {
                                    // calculate distance between currentGPS with address
                                    const { latitude: lat1, longitude: lng1 } = item.address;
                                    const { latitude: lat2, longitude: lng2 } = currentLocation.coords;

                                    cardData.distance =
                                        getDistanceDifferenceInMile({ lat: lat1, lng: lng1 }, { lat: lat2, lng: lng2 });
                                }

                                // calculate time gap between now and post date
                                cardData.timeGap = getTimeGap(item.postDate, new Date());

                                cardList.push(cardData);
                            });

                            setCardsData(cardList);
                        }
                    })
                    .catch((error) =>
                        Toast.show(`Unable to fetch data: ${error}`, { duration: Toast.durations.SHORT }))
                    .finally(() => setIsLoading(false));
            });

    }, [currentLocation]);

    const onFilterSelectedHandler = (selectedFilter: FilterOptions): void => {
        switch (selectedFilter) {
            case FilterOptions.LATEST_POST:
                cardsData.sort((a, b) => a.timeGap - b.timeGap);

                break;
            case FilterOptions.HIGHEST_PAID:
                cardsData.sort((a, b) => b.pay - a.pay);
                break;
            case FilterOptions.NEARST_LOCATION:
                cardsData.sort((a, b) => {
                    if (a.distance && b.distance) {
                        return a.distance - b.distance;
                    }
                    return 0;
                });
                break;
        }

        setCardsData([...cardsData]);
    };

    const getLocation = async (): Promise<Location.LocationObject | false> => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            return false;
        }

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low, timeInterval: 10000 });
        return location;
    };

    const getDistanceDifferenceInMile = (point1: { lat: number, lng: number }, point2: { lat: number, lng: number }): number => {
        const toRadians = (degrees: number) => {
            return degrees * (Math.PI / 180);
        };

        const earthRadiusInMiles = 3958.8;

        const lat1Rad = toRadians(point1.lat);
        const lon1Rad = toRadians(point1.lng);
        const lat2Rad = toRadians(point2.lat);
        const lon2Rad = toRadians(point2.lng);

        const latDiff = lat2Rad - lat1Rad;
        const lonDiff = lon2Rad - lon1Rad;

        const a =
            Math.sin(latDiff / 2) ** 2 +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const dist = earthRadiusInMiles * c;

        return dist;
    };

    const getTimeGap = (date1: Date, date2: Date): number => {
        const diff = Math.abs(date1.getTime() - date2.getTime());

        return diff;
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <RequestFilter
                        onSelectedHandler={onFilterSelectedHandler}
                    />
                </View>

                <Divider />

                <View style={{ flex: 1 }}>
                    {
                        isLoading ? <RequestCardSkeleton />
                            : <FlatList
                                data={cardsData}
                                renderItem={({ item }) => <RequestCard {...item} />}
                                keyExtractor={(item) => item.id}
                                ItemSeparatorComponent={() => <Divider />}
                                contentContainerStyle={styles.contentContainer}
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
    contentContainer: {
        marginHorizontal: 20
    },
});

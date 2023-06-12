import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParamList } from '../types/Navigation';
import RequestFilter from '../components/RequestFilter';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { RequestDummyData } from '../dev/Dummy';
import RequestCard, { RequestCardProps } from '../components/RequestCard';
import { Divider } from '@rneui/themed';
import RequestCardSkeleton from '../skeletons/RequestCardSkeleton';
import { RequestCardData } from '../types/RequestCardData';
import * as Location from 'expo-location';

interface Props extends StackScreenProps<RootNavParamList, 'Request'> { }

export default function Request({ route }: Props) {
    const { categoryType } = route.params;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cardsData, setCardsData] = useState<RequestCardProps[]>([]);
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        // enable loading ui
        setIsLoading(true);

        getLocation()
            .then((location) => {
                // get current location if available
                if (location) {
                    setCurrentLocation(location);
                }

                // fulfill card data
                RequestDummyData.getRequestData(categoryType)
                    .then((data) => {
                        if (data !== null) {
                            const cardList: RequestCardProps[] = [];

                            data.forEach((item) => {
                                const cardData: RequestCardProps = { ...item, timeGap: '' };

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
                        ToastAndroid.show(`Unable to fetch data: ${error}`, ToastAndroid.SHORT))
                    .finally(() => setIsLoading(false));
            });

    }, [currentLocation]);

    const onFilterSelectedHandler = (selectedItem: string, index: number): void => {
        console.log(selectedItem + index)
    };

    const getLocation = async (): Promise<Location.LocationObject | false> => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            return false;
        }

        const location = await Location.getCurrentPositionAsync({});
        return location;
    };

    const getDistanceDifferenceInMile = (point1: { lat: number, lng: number }, point2: { lat: number, lng: number }): string => {
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

        return dist > 1 ? `${Math.floor(dist)} miles` : `${dist.toFixed(1)} mile`;
    };

    const getTimeGap = (date1: Date, date2: Date): string => {
        const diff = Math.abs(date1.getTime() - date2.getTime());

        const years = Math.round(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.round(diff / (1000 * 60 * 60 * 24));
        const hours = Math.round(diff / (1000 * 60 * 60));
        const minutes = Math.round(diff / (1000 * 60));
        const seconds = Math.round(diff / 1000);

        if (years > 0) {
            return `${years}yr`;
        } else if (months > 0) {
            return `${months}mo`;
        } else if (days > 0) {
            return `${days}d`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${seconds}s`;
        }
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

                <View>
                    {
                        isLoading ? <RequestCardSkeleton />
                            : <FlatList
                                data={cardsData}
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

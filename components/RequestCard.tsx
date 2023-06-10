import { useState, useEffect } from 'react';
import { CategoryType } from '../screens/Category'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, HStack, VStack } from '@react-native-material/core';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface RequestCardData {
    id: string,
    poster: {
        name: string,
        avatar?: string,
        phone?: number,
        email: string
    },
    category: CategoryType,
    address: {
        location: string,
        longitude: number,
        latitude: number
    },
    postDate: Date,
    description: string,
    startTime?: Date,
    endTime?: Date,
    pay: number
}

interface Props extends RequestCardData {
    currentGPS?: {
        longitude: number,
        latitude: number
    }
}

export default function RequestCard({
    id,
    poster,
    category,
    address,
    postDate,
    description,
    startTime,
    endTime,
    pay,
    currentGPS }: Props) {

    const [distance, setDistance] = useState<number>(-1);
    const [timeGap, setTimeGap] = useState<number>(-1);

    useEffect(() => {
        // calculate distance between currentGPS with address
        setDistance(10);

        // calculate time gap between now and post date
        setTimeGap(30);
    }, []);

    const renderTimeGap = (): string => {
        return `${timeGap}m`;
    };

    const handleOnLongPress = () => {
        console.log(id)
    };

    return (
        <TouchableOpacity style={styles.container} onLongPress={handleOnLongPress}>
            <HStack m={4} spacing={6}>
                <View>
                    {
                        poster.avatar ? <Avatar image={{ uri: poster.avatar }} autoColor />
                            : <Avatar label={poster.name} autoColor />
                    }
                </View>

                <View>
                    <VStack m={4} spacing={2}>
                        <HStack style={styles.textWrapper}>
                            <Text style={styles.username}>{poster.name}</Text>

                            <View style={styles.iconTextContainer}>
                                <MaterialCommunityIcons style={styles.textIcon} name='clock-edit-outline' size={20} />
                                <Text style={styles.subtext}>{renderTimeGap()}</Text>
                            </View>

                            {distance > 0 &&
                                <View style={styles.iconTextContainer}>
                                    <MaterialCommunityIcons style={styles.textIcon} name='map-marker-distance' size={20} />
                                    <Text style={styles.subtext}>{distance > 1 ? `${distance} miles` : `${distance} mile`}</Text>
                                </View>
                            }
                        </HStack>

                        <Text>{description}</Text>
                    </VStack>
                </View>
            </HStack>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 300,
        marginVertical: 10,
        marginHorizontal: 20
    },
    textWrapper: {
        alignItems: 'baseline'
    },
    username: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    textIcon: {
        marginRight: 2
    },
    subtext: {
        fontSize: 15
    },

});

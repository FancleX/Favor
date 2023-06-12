import { View, Text, StyleSheet, TouchableOpacity, NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { Avatar, HStack, VStack } from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RequestCardData } from '../types/RequestCardData';
import { useState } from 'react';


export interface RequestCardProps extends RequestCardData {
    distance?: string,
    timeGap: string
}

export default function RequestCard({
    id,
    poster,
    address,
    description,
    startTime,
    endTime,
    pay,
    distance,
    timeGap }: RequestCardProps) {

    const maxDescriptionLines: number = 4;

    const [textMoreThanMaxLines, setTextMoreThanMaxLines] = useState<boolean>(false);
    const [toggleMoreText, setToggleMoreText] = useState<boolean>(false);

    const handleOnLongPress = (): void => {
        console.log(id)
    };

    const handleTextLayoutChange = (event: NativeSyntheticEvent<TextLayoutEventData>): void => {
        setTextMoreThanMaxLines(event.nativeEvent.lines.length >= maxDescriptionLines);
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
                        <Text style={styles.username} numberOfLines={1}>{poster.name}</Text>

                        <HStack style={{ flex: 1, marginTop: -8 }} spacing={10}>
                            <View style={styles.iconTextContainer}>
                                <MaterialCommunityIcons style={styles.textIcon} name='clock-edit-outline' size={13} />
                                <Text style={styles.subtext}>{timeGap}</Text>
                            </View>

                            {distance &&
                                <View style={styles.iconTextContainer}>
                                    <MaterialCommunityIcons style={styles.textIcon} name='map-marker-distance' size={13} />
                                    <Text style={styles.subtext}>{distance}</Text>
                                </View>
                            }
                        </HStack>

                        <View style={{ marginTop: 8 }}>
                            {
                                (startTime || endTime) &&
                                (
                                    <View style={styles.informationContainer}>
                                        <MaterialCommunityIcons style={styles.prefixIcon} name='clock-time-four' size={15} />
                                        <Text>{`Time: ${startTime && startTime.toLocaleString()} ${endTime && `- ${endTime.toLocaleString()}`}`}</Text>
                                    </View>
                                )
                            }

                            <View style={styles.informationContainer}>
                                <Ionicons style={styles.prefixIcon} name='wallet' size={15} />
                                <Text>{`Estimate pay: $${pay}`}</Text>
                            </View>

                            <View style={styles.informationContainer}>
                                <MaterialCommunityIcons style={styles.prefixIcon} name='office-building-marker' size={15} />
                                <Text>{`Address: ${address.location}`}</Text>
                            </View>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text
                                numberOfLines={toggleMoreText ? undefined : maxDescriptionLines}
                                onTextLayout={handleTextLayoutChange}
                                style={{ lineHeight: 20 }}
                            >
                                {description}
                            </Text>
                            {
                                textMoreThanMaxLines &&
                                <Text
                                    onPress={() => setToggleMoreText(!toggleMoreText)}
                                    style={{ textDecorationLine: 'underline', fontSize: 12 }}
                                >
                                    {toggleMoreText ? 'show less' : 'show more'}
                                </Text>
                            }
                        </View>

                    </VStack>
                </View>
            </HStack>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        minHeight: 150
    },
    textWrapper: {
        alignItems: 'baseline',
        flexWrap: 'wrap'
    },
    username: {
        fontSize: 23,
        fontWeight: 'bold',
        flexShrink: 1
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textIcon: {
        marginRight: 3
    },
    subtext: {
        fontSize: 13
    },
    descriptionContainer: {
        textAlign: 'left',
        marginTop: 10,
        width: '90%'
    },
    informationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '80%',
    },
    prefixIcon: {
        marginRight: 5,
        marginTop: 2
    }
});

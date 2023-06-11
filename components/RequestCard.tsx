import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, HStack, VStack } from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RequestCardData } from '../types/RequestCardData';


export interface RequestCardProps extends RequestCardData {
    distance?: string,
    timeGap: string
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
    distance,
    timeGap }: RequestCardProps) {

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
                                <Text style={styles.subtext}>{timeGap}</Text>
                            </View>

                            {distance &&
                                <View style={styles.iconTextContainer}>
                                    <MaterialCommunityIcons style={styles.textIcon} name='map-marker-distance' size={20} />
                                    <Text style={styles.subtext}>{distance}</Text>
                                </View>
                            }
                        </HStack>

                        <ScrollView style={{ width: '90%', maxHeight: 200 }}>
                            <Text style={{ flex: 1 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.</Text>
                        </ScrollView>
                    </VStack>
                </View>
            </HStack>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
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
        marginHorizontal: 30
    },
    textIcon: {
        marginRight: 2
    },
    subtext: {
        fontSize: 15
    },
    descriptionContainer: {

    }

});

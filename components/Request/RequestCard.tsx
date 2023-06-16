import { View, Text, StyleSheet, TouchableOpacity, NativeSyntheticEvent, TextLayoutEventData, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Avatar, HStack, VStack } from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RequestCardData } from './RequestCardData';
import { useState } from 'react';


export interface RequestCardProps extends RequestCardData {
    distance?: number,
    timeGap: number
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
    const [modalVisible, setModalVisible] = useState(false);

    const handleTextLayoutChange = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        setTextMoreThanMaxLines(event.nativeEvent.lines.length >= maxDescriptionLines);
    };

    const toggleMessage = () => {
        console.log(id + poster.name)
    };

    const timeGapToString = () => {
        const years = Math.round(timeGap / (1000 * 60 * 60 * 24 * 365));
        const months = Math.round(timeGap / (1000 * 60 * 60 * 24 * 30));
        const days = Math.round(timeGap / (1000 * 60 * 60 * 24));
        const hours = Math.round(timeGap / (1000 * 60 * 60));
        const minutes = Math.round(timeGap / (1000 * 60));
        const seconds = Math.round(timeGap / 1000);

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
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalHeader}>Contact</Text>
                            <Text style={styles.modalBody}>Email: {poster.email}</Text>
                            {
                                poster.phone && <Text style={styles.modalBody}>Phone: {poster.phone}</Text>
                            }
                            <Pressable
                                style={[styles.button, styles.buttonClose, { marginTop: 20 }]}
                                onPress={() => toggleMessage()}>
                                <Text style={styles.textStyle}>InApp Message</Text>
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <TouchableOpacity style={styles.container} onLongPress={() => setModalVisible(true)}>
                <HStack m={4} spacing={6}>
                    <View>
                        <Avatar image={{ uri: poster.avatar }} label={poster.name} autoColor />
                    </View>

                    <View>
                        <VStack m={4} spacing={2}>
                            <Text style={styles.username} numberOfLines={1}>{poster.name}</Text>

                            <HStack style={{ flex: 1, marginTop: -8 }} spacing={10}>
                                <View style={styles.iconTextContainer}>
                                    <MaterialCommunityIcons style={styles.textIcon} name='clock-edit-outline' size={13} />
                                    <Text style={styles.subtext}>{timeGapToString()}</Text>
                                </View>

                                {distance &&
                                    <View style={styles.iconTextContainer}>
                                        <MaterialCommunityIcons style={styles.textIcon} name='map-marker-distance' size={13} />
                                        <Text style={styles.subtext}>
                                            {
                                                distance > 1 ? `${Math.floor(distance)}mi` : `${distance.toFixed(1)}mi`
                                            }
                                        </Text>
                                    </View>
                                }
                            </HStack>

                            <View style={{ marginTop: 8 }}>
                                {
                                    (startTime || endTime) &&
                                    (
                                        <View style={styles.informationContainer}>
                                            <MaterialCommunityIcons style={styles.prefixIcon} name='clock-time-four' size={15}>
                                                <Text style={{ fontSize: 13 }}>
                                                    {` Time: ${startTime && startTime.toLocaleString()} ${endTime && `- ${endTime.toLocaleString()}`}`}
                                                </Text>
                                            </MaterialCommunityIcons>
                                        </View>
                                    )
                                }

                                <View style={styles.informationContainer}>
                                    <FontAwesome5 style={styles.prefixIcon} name='dollar-sign' size={15}>
                                        <Text style={{ fontWeight: 'normal', fontSize: 13 }}>
                                            {` Pay: ${pay}`}
                                        </Text>
                                    </FontAwesome5>
                                </View>

                                <View style={styles.informationContainer}>
                                    <MaterialCommunityIcons style={styles.prefixIcon} name='office-building-marker' size={15}>
                                        <Text style={{ fontSize: 13 }}>
                                            {` Address: ${address.location}`}
                                        </Text>
                                    </MaterialCommunityIcons>
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
        </View >

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
        flexWrap: 'wrap',
        width: '90%',
    },
    prefixIcon: {
        marginVertical: 3
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(130, 130, 130, 0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalHeader: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
    modalBody: {
        marginVertical: 1,
        textAlign: 'left'
    }
});

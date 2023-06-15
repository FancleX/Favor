import { useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SessionData } from '../types/Session';
import { HStack, VStack, Avatar, Badge, Divider } from '@react-native-material/core';

export default function Session({
    avatar,
    contactName: {
        id,
        name
    },
    latestMessage: {
        date,
        content
    },
    unReads
}: SessionData) {

    const swipeableRef = useRef<Swipeable>(null);

    const renderRightAction = (text: string, color: string, x: number, progress: Animated.AnimatedInterpolation<string | number>) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            swipeableRef.current?.close();
            alert(text);
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (progress: Animated.AnimatedInterpolation<string | number>) => (
        <View style={{ width: 64, flexDirection: 'row' }}>
            {renderRightAction('Delete', '#dd2c00', 64, progress)}
        </View>
    );

    return (
        <>
            <Swipeable
                ref={swipeableRef}
                rightThreshold={40}
                friction={2}
                renderRightActions={renderRightActions}
            >
                <View style={{ width: '100%', height: 60 }}>
                    <HStack m={9} spacing={9}>
                        <View>
                            <Avatar
                                image={{ uri: avatar }}
                                style={styles.avatar}
                                imageStyle={styles.avatar}
                                size={42}
                                autoColor
                            />
                            <Badge
                                label={unReads}
                                color='red'
                                style={unReads < 100 ? styles.avatarBadgeTwoDigits : styles.avatarBadgeMoreDigits}
                                labelStyle={styles.avatarBadgeLabel}
                            />
                        </View>

                        <VStack
                            spacing={5}
                            style={{ flex: 1, marginLeft: 5 }}
                        >
                            <HStack style={{ alignItems: 'center' }}>
                                <Text style={styles.headerText} numberOfLines={1}>
                                    {name}
                                </Text>
                                <Text style={styles.subText}>{date.toLocaleDateString()}</Text>
                            </HStack>

                            <Text style={styles.subText} numberOfLines={1}>
                                {content}
                            </Text>
                        </VStack>
                    </HStack>
                </View>
            </Swipeable>

            <Divider style={{ marginLeft: 65 }} />
        </>
    )
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 15,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    avatar: {
        borderRadius: 5,
    },
    avatarBadgeTwoDigits: {
        position: 'absolute',
        top: -5,
        left: 30,
        height: 18
    },
    avatarBadgeMoreDigits: {
        position: 'absolute',
        top: -5,
        left: 20,
        height: 18
    },
    avatarBadgeLabel: {
        color: '#fff',
        fontSize: 11
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '80%',
        paddingRight: 5
    },
    subText: {
        fontSize: 12,
        opacity: 0.8
    }
});

import { LegacyRef, useRef } from 'react';
import { View, Text, Animated, StyleSheet, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SessionData } from '../types/Session';

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
            <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (progress: Animated.AnimatedInterpolation<string | number>) => (
        <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
            {renderRightAction('More', '#C8C7CD', 192, progress)}
            {renderRightAction('Flag', '#ffab00', 128, progress)}
            {renderRightAction('More', '#dd2c00', 64, progress)}
        </View>
    );

    return (
        <Swipeable
            ref={swipeableRef}
            rightThreshold={40}
            friction={2}
            renderRightActions={renderRightActions}
        >
            <Text>"hello"</Text>
        </Swipeable>
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
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});

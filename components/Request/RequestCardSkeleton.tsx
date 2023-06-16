import { StyleSheet } from 'react-native';
import { Skeleton } from '@rneui/themed';
import { VStack } from "react-native-flex-layout";
import { LinearGradient } from 'expo-linear-gradient';

export default function RequestCardSkeleton() {
    return (
        <VStack m={4} spacing={2}>
            <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                style={styles.skeleton}
            />
            <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                style={styles.skeleton}
            />
        </VStack>
    )
}

const styles = StyleSheet.create({
    skeleton: {
        width: '100%',
        height: 300,
    }
});

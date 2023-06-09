import { Skeleton, } from '@rneui/themed';
import { VStack } from "react-native-flex-layout";
import { LinearGradient } from 'expo-linear-gradient';

<VStack spacing={4}>
    <Skeleton animation="pulse" width={80} height={40} />
    <Skeleton
        LinearGradientComponent={LinearGradient}
        animation="wave"
        width={80}
        height={40}
    />
    <Skeleton animation="none" width={80} height={40} />
</VStack>

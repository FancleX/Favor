import { useEffect } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, ImageSourcePropType, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavParamList } from '../types/Navigation';

export enum CategoryType {
    BABYSITTING = 'Babysitting',
    DOG_WALKING = 'Dog Walking',
    LAUNDRYING = 'Laundry',
    CAR_WASHING = 'Car Washing',
    HOUSE_CLEANING = 'House Cleaning',
    ITEM_REPAIRING = 'Item Repairing'
}

export interface Category {
    type: CategoryType,
    image: ImageSourcePropType
}

const categories: Category[] = [
    {
        type: CategoryType.BABYSITTING,
        image: require('../assets/babysitting.jpg')
    },
    {
        type: CategoryType.DOG_WALKING,
        image: require('../assets/dog-walking.jpg')
    },
    {
        type: CategoryType.LAUNDRYING,
        image: require('../assets/laundry.jpg')
    },
    {
        type: CategoryType.CAR_WASHING,
        image: require('../assets/car-wash.png')
    },
    {
        type: CategoryType.HOUSE_CLEANING,
        image: require('../assets/house-cleaning.jpg')
    },
    {
        type: CategoryType.ITEM_REPAIRING,
        image: require('../assets/item-repairing.jpg')
    },
];


export default function Category() {

    const groupedCategoryItems: Category[][] = [];

    const navigation = useNavigation<StackNavigationProp<RootNavParamList>>();

    useEffect(() => {
        for (let i = 0; i < categories.length; i += 2) {
            groupedCategoryItems.push(categories.slice(i, i + 2));
        }
    }, []);


    const categoryOnPressHandler = (categoryType: CategoryType) => {
        navigation.navigate('Request', { categoryType });
    };

    const renderCategoryItems: ListRenderItem<Category[]> = ({ item }) => (
        <View style={styles.groupContainer}>
            {
                item.map(({ type, image }) => (
                    <TouchableOpacity
                        onPress={() => categoryOnPressHandler(type)}
                        style={styles.itemContainer}
                        key={type}>
                        <ImageBackground
                            source={image}
                            resizeMode="cover"
                            style={styles.imageContainer}
                            imageStyle={styles.image}
                        >
                            <Text style={styles.text}>{type}</Text>
                        </ImageBackground>
                    </TouchableOpacity >
                ))
            }
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={groupedCategoryItems}
                renderItem={renderCategoryItems}
                keyExtractor={(_, index) => `category-${index}`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    groupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemContainer: {
        flex: 1,
        marginTop: 40,
        marginHorizontal: 20,
        width: 100,
        height: 130
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        borderWidth: 1,
        borderRadius: 20,
        opacity: 0.75
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    }
});

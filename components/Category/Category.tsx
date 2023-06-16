import { useEffect } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavParamList } from '../../router/Navigation';
import { CategoryItem, CategoryType } from './Category.d';

const categories: CategoryItem[] = [
    {
        type: CategoryType.BABYSITTING,
        image: require('../../assets/babysitting.jpg')
    },
    {
        type: CategoryType.DOG_WALKING,
        image: require('../../assets/dog-walking.jpg')
    },
    {
        type: CategoryType.LAUNDRYING,
        image: require('../../assets/laundry.jpg')
    },
    {
        type: CategoryType.CAR_WASHING,
        image: require('../../assets/car-wash.png')
    },
    {
        type: CategoryType.HOUSE_CLEANING,
        image: require('../../assets/house-cleaning.jpg')
    },
    {
        type: CategoryType.ITEM_REPAIRING,
        image: require('../../assets/item-repairing.jpg')
    },
];


export default function Category() {

    const groupedCategoryItems: CategoryItem[][] = [];

    const router = useNavigation<StackNavigationProp<RootNavParamList>>();

    useEffect(() => {
        for (let i = 0; i < categories.length; i += 2) {
            groupedCategoryItems.push(categories.slice(i, i + 2));
        }
    }, []);


    const categoryOnPressHandler = (categoryType: CategoryType) => {
        router.navigate('Request', { categoryType });
    };

    const renderCategoryItems: ListRenderItem<CategoryItem[]> = ({ item }) => (
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

import { RequestCardData } from "../components/RequestCard";
import { CategoryType } from "../screens/Category";


export class MessageDrawer {
    public static messageNumber: number = 10;
}

export class RequestDummyData {
    private static data: RequestCardData[] = [
        {
            id: 'bf7defc65a3e97605744caf8934a1631',
            poster: {
                name: 'John',
                avatar: 'https://learnopencv.com/wp-content/uploads/2021/04/image-15.png',
                phone: 123456789,
                email: 'John@gmail.com'
            },
            category: CategoryType.BABYSITTING,
            address: {
                location: '399 Knickerbocker Ave, Brooklyn, NY 11237',
                longitude: 40.7002053,
                latitude: -73.9230049
            },
            postDate: new Date('June 6, 2023 14:24:00'),
            description: 'Need a babysitter Friday 12:00 to 4:00 pm',
            startTime: new Date('June 9, 2023 12:00:00'),
            endTime: new Date('June 9, 2023 16:00:00'),
            pay: 100
        },
        {
            id: 'ef23a8a10d09775abd28343e01bfdd66',
            poster: {
                name: 'Sam',
                email: 'Sam@gmail.com'
            },
            category: CategoryType.BABYSITTING,
            address: {
                location: 'South Side, Mt Vernon, NY',
                longitude: 40.9059102,
                latitude: -73.8340565
            },
            postDate: new Date('June 1, 2023 18:30:24'),
            description: 'Need a babysitter to take my two babies',
            startTime: new Date('June 4, 2023 09:00:00'),
            endTime: new Date('June 4, 2023 13:00:00'),
            pay: 65
        },
        {
            id: '9395d61e34338fdd04d04ffd916df681',
            poster: {
                name: 'Tom',
                email: 'Tom@gmail.com'
            },
            category: CategoryType.HOUSE_CLEANING,
            address: {
                location: '25 52nd Rd, Queens, NY 11373',
                longitude: 40.7333738,
                latitude: -73.8920014
            },
            postDate: new Date('May 5, 2023 09:25:32'),
            description: 'Need a house cleaner next week',
            startTime: new Date('May 13, 2023 09:30:00'),
            pay: 60
        },
        {
            id: 'd60e32c74a026dcfbfe3dc56a0fec68d',
            poster: {
                name: 'Jacky',
                email: 'Jacky@gmail.com'
            },
            category: CategoryType.ITEM_REPAIRING,
            address: {
                location: 'AXA Equitable Building, New York, NY 10019',
                longitude: 40.7614408,
                latitude: -73.9840294
            },
            postDate: new Date('May 25, 2023 08:56:23'),
            description: 'My AC Unit does not blow cold, need a person to fix it as soon as possible!!!',
            pay: 150
        },
    ];

    public static async getRequestData(categoryType: CategoryType): Promise<RequestCardData[] | null> {
        const result: RequestCardData[] = [];

        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        await sleep(3000);

        for (const cardData of RequestDummyData.data) {
            if (cardData['category'] === categoryType) {
                result.push(cardData);
            }
        }

        return result;
    }
}

export class SearchBar {

    public static async searchCategory(query: string): Promise<CategoryType | null> {
        const formattedInput = query.toLowerCase().replace(/\s/g, '');

        for (const categoryType of Object.values(CategoryType)) {
            const formattedCategory = categoryType.toLowerCase().replace(/\s/g, '');

            if (formattedCategory === formattedInput) {
                return categoryType;
            }
        }

        return null;
    }


}

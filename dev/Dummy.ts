import { CategoryType } from "../components/Category";
import { RequestCardData } from "../components/Request";
import { ChatMessage } from '../components/ChatBox';
import { SessionData } from '../components/Session';


export class MessageDrawer {
    public static messageNumber = (): number => {
        return Message.sessionHistoryJohn.reduce((total, current) => total + current.unReads, 0);
    };
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
                latitude: 40.7002053,
                longitude: -73.9230049
            },
            postDate: new Date('2023-06-06T14:24:00'),
            description: 'Need a babysitter Friday 12:00 to 4:00 pm',
            startTime: new Date('2023-06-09T12:00:00'),
            endTime: new Date('2023-06-09T16:00:00'),
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
                latitude: 40.9059102,
                longitude: -73.8340565
            },
            postDate: new Date('2023-06-01T18:30:24'),
            description: `${'Need a babysitter to take my two babies'.repeat(10)}`,
            startTime: new Date('2023-06-04T09:00:00'),
            endTime: new Date('2023-06-04T13:00:00'),
            pay: 65
        },
        {
            id: 'ef23a8a10d09775abd28343e01b323adf',
            poster: {
                name: 'James Kite',
                email: 'James@gmail.com'
            },
            category: CategoryType.BABYSITTING,
            address: {
                location: 'South Side, Mt Vernon, NY',
                latitude: 40.9059102,
                longitude: -73.8340565
            },
            postDate: new Date('2023-06-01T18:30:24'),
            description: `${'Need a babysitter to take my two babies'}`,
            startTime: new Date('2023-06-04T09:00:00'),
            endTime: new Date('2023-06-04T13:00:00'),
            pay: 140
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
                latitude: 40.7333738,
                longitude: -73.8920014
            },
            postDate: new Date('2023-05-05T09:25:32'),
            description: 'Need a house cleaner next week',
            startTime: new Date('2023-05-13T09:30:00'),
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
                latitude: 40.7614408,
                longitude: -73.9840294
            },
            postDate: new Date('2023-05-25T08:56:23'),
            description: 'My AC Unit does not blow cold, need a person to fix it as soon as possible!!!',
            pay: 150
        },
    ];

    public static async getRequestData(categoryType: CategoryType): Promise<RequestCardData[] | null> {
        const result: RequestCardData[] = [];

        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        await sleep(1000);

        for (const cardData of RequestDummyData.data) {
            if (cardData['category'] === categoryType) {
                result.push(cardData);
            }
        }

        return result;
    }
}

export class Message {
    public static chatHistoryJohn: ChatMessage[] = [
        {
            id: '100',
            content: 'hey John',
            timestamp: new Date('2023-06-06T14:30:00'),
            isRead: true,
            isSender: true
        },
        {
            id: '101',
            content: 'hello 1',
            timestamp: new Date('2023-06-06T14:30:15'),
            isRead: true,
            isSender: false
        },
        {
            id: '102',
            content: 'hello 2',
            timestamp: new Date('2023-06-06T14:30:17'),
            isRead: false,
            isSender: false
        },
        {
            id: '103',
            content: 'hello 3',
            timestamp: new Date('2023-06-06T14:31:25'),
            isRead: false,
            isSender: false
        },
    ];

    public static sessionHistoryJohn: SessionData[] = [
        {
            avatar: 'https://learnopencv.com/wp-content/uploads/2021/04/image-15.png',
            contact: {
                name: 'John',
                id: 'bf7defc65a3e97605744caf8934a1631'
            },
            latestMessage: {
                date: new Date('2023-06-06T14:31:25'),
                content: 'hello 3'
            },
            unReads: 100
        },
        {
            avatar: 'https://learnopencv.com/wp-content/uploads/2021/04/image-15.png',
            contact: {
                name: 'John',
                id: 'bf7defc65a3e97605744caf8934a1631'
            },
            latestMessage: {
                date: new Date('2023-06-06T14:31:25'),
                content: 'hello 3'
            },
            unReads: 2
        }
    ];
}

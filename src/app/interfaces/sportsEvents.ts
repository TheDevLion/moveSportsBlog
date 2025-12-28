export interface sportsEvents {
    id: string;
    title: string;
    description: string;
    date: Date[];
    flagStatus: string;
    address: string;
    price: number;
    imgUrl: string;
}

export const emptySportsEvent: sportsEvents = {
    id: '',
    title: '',
    description: '',
    date: [],
    flagStatus: '',
    address: '',
    price: 0,
    imgUrl: '',
}
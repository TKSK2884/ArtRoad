export interface Exhibition {
    cultcode: string;
    title: string;
    strtdate: Date;
    endDate: Date;
    place: string;
    address: string;
    imageUrl: string;
    lat: string;
    lng: string;
    description: string;
}

export enum KoreaTimeEnum {
    Day = "day",
}

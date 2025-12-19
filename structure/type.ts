export interface Exhibition {
    id: number;
    cultcode: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    place: string;
    address: string;
    latitude: number;
    longitude: number;
    image_url: string;
    source_id: string;
    source_name: string;
    created_at: string;
}

export interface Bounds {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
}

export enum KoreaTimeEnum {
    Day = "day",
}

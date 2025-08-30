declare global {
    interface Window {
        kakao: {
            maps: any;
        };
        closeInfoWindow: () => void;
    }
}

export {};

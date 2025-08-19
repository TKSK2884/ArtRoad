declare global {
    interface Window {
        kakao: {
            maps: any;
        };
        closeInfowindow: () => void;
    }
}

export {};

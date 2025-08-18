export const loadKakaoMap = () =>
    new Promise<void>((resolve, reject) => {
        if (typeof window === "undefined") return reject("Not in browser");

        if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => resolve());
            return;
        }
    });

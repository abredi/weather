import { BASE_URL } from "./constants";
import { clearContent, notification } from "./util.dom";
import KEY from "../key";

const apiModule = () => {

    const handleError = (err) => {
        console.warn('Error', err);
        document.querySelector('body').appendChild(notification('Network Error'));
        setTimeout(() => {
            clearContent('[id="notify"', true);
        }, 2300);
    }

    const post = async (uri = '', data = {}) => {
        const response = await fetch(`${BASE_URL + uri}&appid=${KEY}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).catch(handleError);

        if (response) {
            return response;
        }
        return false;
    };

    const get = async (uri) => {
        const req = await fetch(`${BASE_URL + uri}&appid=${KEY}`)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            }).catch(handleError);

        if (req) {
            return req;
        }
        return false;
    };

    const getJson = () => {
        return {
            "cnt": 2,
            "list": [
                {
                    "coord": {
                        "lon": 38.75,
                        "lat": 9.03
                    },
                    "sys": {
                        "country": "ET",
                        "timezone": 10800,
                        "sunrise": 1606706690,
                        "sunset": 1606748585
                    },
                    "weather": [
                        {
                            "id": 802,
                            "main": "Clouds",
                            "description": "scattered clouds",
                            "icon": "03d"
                        }
                    ],
                    "main": {
                        "temp": 288.68,
                        "feels_like": 286.68,
                        "temp_min": 288.68,
                        "temp_max": 288.68,
                        "pressure": 1018,
                        "sea_level": 1018,
                        "grnd_level": 771,
                        "humidity": 57
                    },
                    "visibility": 10000,
                    "wind": {
                        "speed": 1.88,
                        "deg": 119
                    },
                    "clouds": {
                        "all": 25
                    },
                    "dt": 1606716549,
                    "id": 344979,
                    "name": "Addis Ababa"
                },
                {
                    "coord": {
                        "lon": -87.45,
                        "lat": 15.02
                    },
                    "sys": {
                        "country": "HN",
                        "timezone": -21600,
                        "sunrise": 1606737585,
                        "sunset": 1606778281
                    },
                    "weather": [
                        {
                            "id": 800,
                            "main": "Clear",
                            "description": "clear sky",
                            "icon": "01n"
                        }
                    ],
                    "main": {
                        "temp": 293.52,
                        "feels_like": 296.18,
                        "temp_min": 293.52,
                        "temp_max": 293.52,
                        "pressure": 1015,
                        "sea_level": 1015,
                        "grnd_level": 964,
                        "humidity": 86
                    },
                    "visibility": 10000,
                    "wind": {
                        "speed": 0.16,
                        "deg": 215
                    },
                    "clouds": {
                        "all": 9
                    },
                    "dt": 1606716590,
                    "id": 3606250,
                    "name": "Las Vegas"
                }
            ]
        }
    }

    return { post, get, getJson }
}

export { apiModule as default }
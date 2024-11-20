import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
    cloud: {
        distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
        apm: [],
    },
    thresholds: {},
    scenarios: {
        Scenario_1: {
            executor: 'ramping-vus',
            gracefulStop: '30s',
            stages: [
                { target: 5, duration: '30s' },
                { target: 15, duration: '1m' },
                { target: 10, duration: '30s' },
                { target: 0, duration: '30s' },
            ],
            gracefulRampDown: '30s',
            exec: 'scenario_1',
        },
    },
}

export function scenario_1() {
    let response

    group('page_1 - https://pizza.seth-jwt-pizza.click/', function () {
        response = http.get('https://pizza.seth-jwt-pizza.click/', {
            headers: {
                accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                dnt: '1',
                'if-modified-since': 'Tue, 29 Oct 2024 22:24:35 GMT',
                'if-none-match': '"95da700b62ab0955cd0f56e76d7a04b3"',
                priority: 'u=0, i',
                'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
            },
        })
        sleep(23.8)

        const vars = {};

        response = http.put(
            'https://pizza-service.seth-jwt-pizza.click/api/auth',
            '{"email":"a@gmail.com","password":"a"}',
            {
                headers: {
                    accept: '*/*',
                    'accept-encoding': 'gzip, deflate, br, zstd',
                    'accept-language': 'en-US,en;q=0.9',
                    'content-type': 'application/json',
                    dnt: '1',
                    origin: 'https://pizza.seth-jwt-pizza.click',
                    priority: 'u=1, i',
                    'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                },
            }
        )

        if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
            console.log(response.body);
            fail('Login was *not* 200');
        }

        vars['token1'] = jsonpath.query(response.json(), '$.token')[0];

        response = http.options('https://pizza-service.seth-jwt-pizza.click/api/auth', null, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${vars['token1']}`,
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'access-control-request-headers': 'content-type',
                'access-control-request-method': 'PUT',
                origin: 'https://pizza.seth-jwt-pizza.click',
                priority: 'u=1, i',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
            },
        })
        sleep(6.4)

        response = http.get('https://pizza-service.seth-jwt-pizza.click/api/order/menu', {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${vars['token1']}`,
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                dnt: '1',
                'if-none-match': 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
                origin: 'https://pizza.seth-jwt-pizza.click',
                priority: 'u=1, i',
                'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
            },
        })

        response = http.options('https://pizza-service.seth-jwt-pizza.click/api/order/menu', null, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${vars['token1']}`,
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'access-control-request-headers': 'authorization,content-type',
                'access-control-request-method': 'GET',
                origin: 'https://pizza.seth-jwt-pizza.click',
                priority: 'u=1, i',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
            },
        })

        response = http.get('https://pizza-service.seth-jwt-pizza.click/api/franchise', {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${vars['token1']}`,
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                dnt: '1',
                'if-none-match': 'W/"40-EPPawbPn0KtYVCL5qBynMCqA1xo"',
                origin: 'https://pizza.seth-jwt-pizza.click',
                priority: 'u=1, i',
                'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
            },
        })

        response = http.options('https://pizza-service.seth-jwt-pizza.click/api/franchise', null, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${vars['token1']}`,
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'access-control-request-headers': 'authorization,content-type',
                'access-control-request-method': 'GET',
                origin: 'https://pizza.seth-jwt-pizza.click',
                priority: 'u=1, i',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
            },
        })
        sleep(11)

        response = http.post(
            'https://pizza-service.seth-jwt-pizza.click/api/order',
            '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
            {
                headers: {
                    accept: '*/*',
                    authorization: `Bearer ${vars['token1']}`,
                    'accept-encoding': 'gzip, deflate, br, zstd',
                    'accept-language': 'en-US,en;q=0.9',
                    'content-type': 'application/json',
                    dnt: '1',
                    origin: 'https://pizza.seth-jwt-pizza.click',
                    priority: 'u=1, i',
                    'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                },
            }
        )

        vars['jwt1'] = jsonpath.query(response.json(), '$.jwt')[0];

        response = http.options('https://pizza-service.seth-jwt-pizza.click/api/order', null, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${vars['token1']}`,
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'access-control-request-headers': 'authorization,content-type',
                'access-control-request-method': 'POST',
                origin: 'https://pizza.seth-jwt-pizza.click',
                priority: 'u=1, i',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
            },
        })
        sleep(2.2)

        response = http.post(
            'https://pizza-factory.cs329.click/api/order/verify',
            `{"jwt":"${vars['jwt1']}"}`,
            {
                headers: {
                    accept: '*/*',
                    authorization: `Bearer ${vars['token1']}`,
                    'accept-encoding': 'gzip, deflate, br, zstd',
                    'accept-language': 'en-US,en;q=0.9',
                    'content-type': 'application/json',
                    dnt: '1',
                    origin: 'https://pizza.seth-jwt-pizza.click',
                    priority: 'u=1, i',
                    'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                },
            }
        )

        response = http.options('https://pizza-factory.cs329.click/api/order/verify', null, {
            headers: {
                accept: '*/*',
                authorization: `Bearer ${vars['token1']}`,
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'access-control-request-headers': 'authorization,content-type',
                'access-control-request-method': 'POST',
                origin: 'https://pizza.seth-jwt-pizza.click',
                priority: 'u=1, i',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
            },
        })
    })
}
const HOST = 'https://limitless-stream-88654.herokuapp.com';

export const CONSTANST = {
    permissions: {},
    routes: {
        authorization: {
            login: HOST + '/api/login',
            logout: HOST + '/api/logout'
        },
        client: {
            list: HOST + '/api/plat',
            delete: HOST + '/api/plat/:id',
            save: HOST + '/api/plat',
            get: HOST + '/api/plat/:id'
        },
        user: {}
    },
    lang: {},
    session: {},
    parameters: {}
};

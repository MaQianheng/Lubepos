import httpRequest from "./HTTP";
// http://34.126.86.176:4000
export const baseUrl = "https://d1c27f3537dc.ngrok.io"
// export const baseUrl = "http://127.0.0.1:4000"
// let baseUrl = "http://127.0.0.1:4000"

export const requestRegister = (user) => httpRequest(baseUrl + '/users/register', user, 'POST')
export const requestLogin = (user) => httpRequest(baseUrl + '/users/login', user, 'POST')
export const requestUserInfo = (userId) => httpRequest(baseUrl + '/users/query', userId, 'POST')

export const requestItemsQuery = (queryCondition) => httpRequest(baseUrl + '/items/query', queryCondition, 'GET')
export const requestItemInsert = (item) => httpRequest(baseUrl + '/items/insert', item, 'GET')
export const requestItemUpdate = (item) => httpRequest(baseUrl + '/items/update', item, 'GET')
export const requestItemDelete = (item) => httpRequest(baseUrl + '/items/delete', item, 'GET')

export const requestCustomersQuery = (queryCondition) => httpRequest(baseUrl + '/customers/query', queryCondition, 'GET')
export const requestCustomerInsert = (customer) => httpRequest(baseUrl + '/customers/insert', customer, 'GET')
export const requestCustomerUpdate = (customer) => httpRequest(baseUrl + '/customers/update', customer, 'GET')
export const requestCustomerDelete = (customer) => httpRequest(baseUrl + '/customers/delete', customer, 'GET')

export const requestCarsQuery = (queryCondition) => httpRequest(baseUrl + '/cars/query', queryCondition,'GET')
export const requestCarInsert = (car) => httpRequest(baseUrl + '/cars/insert', car,'POST')
export const requestCarUpdate = (car) => httpRequest(baseUrl + '/cars/update', car,'POST')
export const requestCarDelete = (carId) => httpRequest(baseUrl + '/cars/delete', carId,'GET')

export const requestSalesQuery = (conditions) => httpRequest(baseUrl + '/sales/query', conditions,'GET')
export const requestSalesInsert = (sales) => httpRequest(baseUrl + '/sales/insert', sales,'GET')
// export const requestSalesInsert = (sales) => httpRequest(baseUrl + '/sales/test', sales,'GET')


export const requestReadMsg = (from) => httpRequest(baseUrl + '/readMsg',{from},'POST')
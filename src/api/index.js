import httpRequest from "./HTTP";
// http://34.126.86.176:4000
let baseUrl = "https://e307b1922e60.ngrok.io"

export const requestRegister = (user) => httpRequest(baseUrl + '/users/register', user, 'POST')
export const requestLogin = (user) => httpRequest(baseUrl + '/users/login', user, 'POST')

export const requestItemsQuery = (queryCondition) => httpRequest(baseUrl + '/items/query', queryCondition, 'GET')
export const requestItemInsert = (item) => httpRequest(baseUrl + '/items/insert', item, 'GET')

export const requestCustomersQuery = (queryCondition) => httpRequest(baseUrl + '/customers/query', queryCondition, 'GET')
export const requestCustomerInsert = (customer) => httpRequest(baseUrl + '/customers/insert', customer, 'GET')

export const requestCarsQuery = (queryCondition) => httpRequest(baseUrl + '/cars/query', queryCondition,'GET')
export const requestCarInsert = (car) => httpRequest(baseUrl + '/cars/insert', car,'POST')

export const requestSalesInsert = (sales) => httpRequest(baseUrl + '/sales/insert', sales,'GET')

export const requestReadMsg = (from) => httpRequest(baseUrl + '/readMsg',{from},'POST')
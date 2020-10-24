import httpRequest from "./HTTP";
let baseUrl = "http://127.0.0.1:4000"

export const requestRegister = (user) => httpRequest(baseUrl + '/users/register', user, 'POST')
export const requestLogin = (user) => httpRequest(baseUrl + '/users/login', user, 'POST')

export const requestItemsQuery = (queryCondition) => httpRequest(baseUrl + '/items/query', queryCondition, 'GET')
export const requestItemInsert = (item) => httpRequest(baseUrl + '/items/insert', item, 'GET')

export const requestCustomersQuery = (queryCondition) => httpRequest(baseUrl + '/customers/query', queryCondition, 'GET')
export const requestCustomerInsert = (customer) => httpRequest(baseUrl + '/customers/insert', customer, 'GET')

export const requestCarsQuery = (queryCondition) => httpRequest(baseUrl + '/cars/query', queryCondition,'GET')
export const requestCarInsert = (car) => httpRequest(baseUrl + '/cars/insert', car,'POST')

export const requestReadMsg = (from) => httpRequest(baseUrl + '/readMsg',{from},'POST')
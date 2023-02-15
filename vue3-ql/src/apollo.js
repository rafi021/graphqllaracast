import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const getHeaders = () => {
    const headers = {}
    const token = localStorage.getItem('token')
    if(token){
        headers.authorization = `Bearer ${token}`
    }
    return headers;
}

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:8000/graphql',
    headers: getHeaders(),
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
link: httpLink,
cache,
})

export {
    apolloClient
}

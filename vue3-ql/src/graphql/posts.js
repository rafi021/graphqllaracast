import gql from 'graphql-tag';

export const INDEX_POST = gql`
query posts($page: Int!){
    posts(page: $page){
        data{
            id
            title
            created_at
            user{
                id
                name
            }
        }
        paginatorInfo{
            count,
            currentPage,
            lastPage
            perPage,
            total
            hasMorePages
        }
    }
}
`
export const SHOW_POST = gql`
query post($id: ID!){
    post(id: $id){
        id
        title
        body
        created_at
        user{
            id
            name
        }
    }
}
`
export const CREATE_POST = gql`
mutation createPost (
    $title: String!
    $body: String!
    $user_id: ID
) {
    createPost ( input: {
        user_id: $user_id
        title: $title
        body: $body
    })
    {
        id
        title
        body
     }
}
`
export const DELETE_POST = gql`
mutation deletePost (
    $id: ID!
) {
    deletePost (id: $id){
        id
        title
        body
    }
}
`
export const UPDATE_POST = gql`
mutation updatePost (
    $id: ID!
    $title: String
    $body: String
    $user_id: ID
) {
    updatePost (id: $id, input: {
        user_id: $user_id
        title: $title
        body: $body
    })
    {
        id
        title
        body
     }
}
`

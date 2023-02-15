import gql from 'graphql-tag';

// export const USERNAME = gql`
// query me(){
//     me(){
//         name
//         email
//     }
// }
// `

export const LOGIN = gql`
mutation login (
    $email: String!
    $password: String!
) {
    login ( input: {
        email: $email
        password: $password
    })
    {
       token
    }
}
`

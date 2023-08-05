import  { gql } from "apollo-server";

export const typeDefs = gql`

    input CreateMovieInput {
        description: String!
        director: String!
        movie_name: String!
        release_date: String!
    }

    input GetMoviesInput {
        offset: Int!
        limit: Int!
        sort: Boolean!
        filter_id: [Int]
        filter_moviename: String
        filter_description: String
    }

    input UpdateMovie {
        id: Int!
        director: String!
        description: String!
        release_date: String!
    }

    input SignUp {
        username: String!
        email: String!
        password: String!
    }

    input Login {
        password: String!
        email: String!
    }

    type Movie {
        id: Int!
        description: String!
        director: String!
        movie_name: String!
        release_date: String!
    }

    type User {
        id: Int!
        username: String!
        email: String!
    }


    type Query {
        getMovies(movie: GetMoviesInput!): [Movie]!
    }

    type Mutation {
        login(login: Login!): String!
        signup(signup: SignUp!) : User!
        changePassword(newpassword: String!) : Boolean! @auth
        createMovie(movie: CreateMovieInput!): Movie! @auth
        updateMovie(movie: UpdateMovie!): Movie! @auth
        deleteMovie(id: Int!) : Movie! @auth
    }

`
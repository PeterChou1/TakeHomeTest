# Viral Nation (Take Home Test)


# Setup

To setup the program run the following commands

Create a .env file with a JWT_SECRET_KEY and DATABASE_URL

```
touch .env
echo -e "JWT_SECRET_KEY=<insert secret key>\nDATABASE_URL=<db_url>" > .env
```

Ex: 
```
DATABASE_URL="postgresql://db_user:db_password@localhost:5432/db_user"
JWT_SECRET_KEY="my_super_secret_key"
```

Next run the following command

```
docker-compose up -d
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```



Start the server

```
npm run start
```

The GraphQL server should be located at localhost:4000/graphql

# Schema (Documentation)

The graphQL schema is defined as follows

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [Movie](#movie)
    * [User](#user)
  * [Inputs](#inputs)
    * [CreateMovieInput](#createmovieinput)
    * [GetMoviesInput](#getmoviesinput)
    * [Login](#login)
    * [SignUp](#signup)
    * [UpdateMovie](#updatemovie)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [Int](#int)
    * [String](#string)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>getMovies</strong></td>
<td valign="top">[<a href="#movie">Movie</a>]!</td>
<td>Read movies created in the database see <a href="#getmoviesinput">GetMoviesInput</a> for more details on filter and pagination options</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">movie</td>
<td valign="top"><a href="#getmoviesinput">GetMoviesInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>login</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>Login to  Application Returns a JWT Token</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">login</td>
<td valign="top"><a href="#login">Login</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>signup</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td> Signs up to the Application </td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">signup</td>
<td valign="top"><a href="#signup">SignUp</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>changePassword</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>Changes Password for the currently authenticated User</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">newpassword</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createMovie</strong></td>
<td valign="top"><a href="#movie">Movie</a>!</td>
<td>Create a Movie in the database</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">movie</td>
<td valign="top"><a href="#createmovieinput">CreateMovieInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateMovie</strong></td>
<td valign="top"><a href="#movie">Movie</a>!</td>
<td>Update a Movie in the Database</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">movie</td>
<td valign="top"><a href="#updatemovie">UpdateMovie</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteMovie</strong></td>
<td valign="top"><a href="#movie">Movie</a>!</td>
<td> Delete a Movie in the Database</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Movie

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>director</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>movie_name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>release_date</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### User

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Inputs

### CreateMovieInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>director</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>movie_name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>release_date</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### GetMoviesInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>offset</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td> offset off the table to get the movie</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>limit</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>how many movies to fetch</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sort</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td> true for sort by asc release date false for sort by desc release date</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>filter_id</strong></td>
<td valign="top">[<a href="#int">Int</a>]</td>
<td> Specific ID to filter for</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>filter_movie</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td> Movie Name to Filter for</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>filter_description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>Movie Description to Filter for</td>
</tr>
</tbody>
</table>

### Login

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### SignUp

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>username</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### UpdateMovie

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>director</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>release_date</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.


# Test Queries

Sample test queries to test

## Test SignUp
Mutation
```
mutation SignUp($signup: SignUp!) {
  signup(signup: $signup) {
    id
    username
    email
  }
}
```
Variables
```
{
  "signup": {
    "username": "testUser",
    "email": "testuser@example.com",
    "password": "testPassword"
  }
}
```

## Test Login
Mutation
```
mutation Login($login: Login!) {
  login(login: $login)
}
```
Variables
```
{
  "login": {
    "email": "testuser@example.com",
    "password": "testPassword"
  }
}
```
## Test Change Password
Mutation
```
mutation ChangePassword($newpassword: String!) {
  changePassword(newpassword: $newpassword)
}
```
Variables
```
{
  "newpassword": "newTestPassword"
}
```
Header
```
{
  "authorization" : "Bearer <Your Token Here>"
}
```
## Test Create Movies
Mutation
```
mutation CreateMovie($movie: CreateMovieInput!) {
  createMovie(movie: $movie) {
    id
    movie_name
    description
    director
    release_date
  }
}
```
Variables
```
{
  "movie": {
    "movie_name": "Test Movie",
    "description": "Test movie description",
    "director": "Test Director",
    "release_date": "2023-08-05"
  }
}s
```
Header
```
{
  "authorization" : "Bearer <Your Token Here>"
}
```
## Test Get Movies

Query
```
query GetMovies($getMoviesMovie: GetMoviesInput!) {
  getMovies(movie: $getMoviesMovie) {
    release_date
    movie_name
    id
    director
    description
  }
}
```
Variables
```
{
  "getMoviesMovie": {
    "sort": true,
    "offset": 0,
    "limit": 10,
    "filter_description": "thrilling"
  }
}
```

## Test Get Movie By Id
Query
```
query GetMovies($getMoviesMovie: GetMoviesInput!) {
  getMovies(movie: $getMoviesMovie) {
    release_date
    movie_name
    id
    director
    description
  }
}
```
Variables
```
{
  "getMoviesMovie": {
    "sort": true,
    "offset": 0,
    "limit": 10,
    "filter_id": [1,2,3]
  }
}
```
## Test Delete Movie
Mutation
```
mutation DeleteMovie($id: Int!) {
  deleteMovie(id: $id) {
    id
    movie_name
    description
    director
    release_date
  }
}
```
Variables
```
{
  "id": 1
}
```
Header
```
{
  "authorization" : "Bearer <Your Token Here>"
}
```
## Test Update Movie
Mutation
```
mutation UpdateMovie($movie: UpdateMovie!) {
  updateMovie(movie: $movie) {
    id
    movie_name
    description
    director
    release_date
  }
}
```
Variables
```
{
  "movie": {
    "id": 1,
    "description": "Updated test movie description",
    "director": "Updated Test Director",
    "release_date": "2023-08-10"
  }
}

```
Header
```
{
  "authorization" : "Bearer <Your Token Here>"
}
```




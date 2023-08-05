import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response } from "express"
import { JWT_SECRET_KEY } from './env';

const prisma = new PrismaClient();


interface GetMoviesInput {
    offset: number,
    limit: number,
    sort: boolean,
    filter_id: [string],
    filter_username: string,
    filter_description: string 
}

interface CreateMovieInput { 
    description: string
    director: string
    movie_name: string
    release_date: string
}

interface UpdateMovie {
    id: number,
    director: string,
    description: string,
    release_date: string
}

interface SignUp {
    username: string,
    email: string,
    password: string
}

interface Login {
    password: string,
    email: string
}

export const resolvers = {
    Query: {
        getMovies: async (parent: any, args : { movie: GetMoviesInput }) => {
            const { offset, limit, sort, filter_id, filter_username, filter_description } = args.movie;

            const filterOptions: any = {};

            if (filter_id && filter_id.length > 0) {
                filterOptions.id = {
                    in: filter_id,
                };
            }

            if (filter_username) {
                filterOptions.username = {
                    contains: filter_username,
                };
            }

            if (filter_description) {
                filterOptions.description = {
                    contains: filter_description,
                };
            }

            const movies = await prisma.movies.findMany({
                take: limit,
                skip: offset,
                orderBy: sort ? {
                    release_date: 'asc'
                } : {
                    release_date: 'desc'
                },
                where: filterOptions,
            });

            return movies;
        }
    },
    Mutation: {
        signup: async (parent: any, args: { signup: SignUp }) => {
            const { username, email, password } = args.signup;

            // Check if the user with the provided email already exists
            const existingUser = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (existingUser) {
                throw new Error('User with this email already exists.');
            }

            // Hash the password before saving it in the database
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            return {
                username : newUser.username,
                email: newUser.email,
                id: newUser.id
            };
        },
        login: async (parent: any, args: { login: Login }, context : { res: Response }) => {
            const { email, password } = args.login;
            // Check if the user with the provided email exists
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                throw new Error('Invalid email or password.');
            }

            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Invalid email or password.');
            }

            // Create a JWT token with the user's ID and return it
            const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
                expiresIn: '1d', // Token will expire in 1 day
            });

            return token;
        },
        createMovie: async (parent: any, args: { movie: CreateMovieInput }) => {
            const { description, director, movie_name, release_date } = args.movie;

            const movie = await prisma.movies.create({
                data: {
                    description,
                    director,
                    movie_name,
                    release_date,
                },
            });

            return movie;
        },
        updateMovie: async (parent: any, args: { movie: UpdateMovie }) => {
            const { id, description, director, release_date } = args.movie;

            const updatedMovie = await prisma.movies.update({
                where: { id },
                data: {
                    description,
                    director,
                    release_date,
                },
            });

            return updatedMovie;
        },
        deleteMovie: async (parent: any, args: { id: number }) => {
            const { id } = args;

            const deletedMovie = await prisma.movies.delete({
                where: { id },
            });
            return deletedMovie;
        },
        changePassword: async (parent: any, args: { newpassword: string }, context: { user : jwt.JwtPayload }) => {
            const { user } = context;
            const { newpassword } = args;
            // Hash the password before saving it in the database
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            await prisma.user.update({
                where: { id: user.userId },
                data: {
                    password: hashedPassword
                }
            });
            // update success
            return true;
        }
    },

}
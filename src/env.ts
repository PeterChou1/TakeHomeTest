import 'dotenv/config'

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY != null ? process.env.JWT_SECRET_KEY : "";
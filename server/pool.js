import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const prodConfig = {
    connectionString : process.env.DATABASE_URL,
    ...(process.env.NODE_ENV === "production" &&
    {
    ssl: {
        rejectUnauthorized : false
    }
})
}


const connectDatabase = () => {
    const pool = new pg.Pool(prodConfig)   
    return pool
} 

export { connectDatabase }
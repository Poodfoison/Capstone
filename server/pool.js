import pg from "pg"

const connectDatabase = () => {
    const pool = new pg.Pool({ 
        user:  'postgres',
        password:  '0800',
        database:  'HOA',
        host: 'localhost'
    })
    

    return pool
} 

export { connectDatabase }
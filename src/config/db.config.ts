import mysql, { type Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB);
const db : Pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER1,
    database: process.env.DB,xcvxcvxcvxcv
    password:process.env.PASSWORD,
    port: parseInt(process.env.DBPORT!),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const checkConnection = async () =>{
    try{
        const connection = await db.getConnection();
        console.log('DB connected')
    }catch(e){
        console.log('Connection Failed',e)
    }
}
checkConnection();
export default db
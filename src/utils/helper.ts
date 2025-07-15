import { MongoClient, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose';
import { config } from 'dotenv'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
config();
const JWT_SECRET = process.env.JWT_SECRET || "helloSolvit";

const uri = "mongodb+srv://jbniyikiza20:<db_password>@cluster0.n58gzhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const db_url = (): string => {
    const db_username = process.env.USERNAME as string
    const db_password = process.env.PASSWORD as string
    return uri?.replace("<db_username>", db_username).replace("<db_password>", db_password) as string
}



export async function run() {
    
        const client = mongoose.connect(db_url(), {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
       client.then(re => {
           re.connection
           console.log("connect suss")
        }).catch(ca => {
           console.log(ca)
        })
   
}
run().catch(console.dir);

export const generateSlug = (title: string): string => {
    return title.replace(' ', '-')
}

export const hashPassword = async(password: string): Promise<string> => {
    return await bcrypt.hash(password,10)
}

export function generateToken(payload: object, expiresIn = "1d") {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}


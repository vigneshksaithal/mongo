import { MONGO_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

if (!MONGO_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
}

const client = new MongoClient(MONGO_URI);

export async function connectToDb() {
    try {
        await client.connect();
        return client.db('todoapp');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

export type Todo = {
    _id?: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}
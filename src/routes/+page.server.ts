import type { PageServerLoad } from './$types';
import { connectToDb } from '$lib/db/mongo';
import type { Todo } from '$lib/db/mongo';
import { ObjectId } from 'mongodb';

export const csr = false

export const load = (async () => {
    const db = await connectToDb();
    const todos = await db.collection<Todo>('todos')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    return {
        todos: todos.map(todo => ({
            ...todo,
            _id: todo._id.toString()
        }))
    };
}) satisfies PageServerLoad;

export const actions = {
    addTodo: async ({ request }) => {
        const formData = await request.formData();
        const text = formData.get('text')?.toString();

        if (!text) return { success: false };

        const db = await connectToDb();
        await db.collection<Todo>('todos').insertOne({
            text,
            completed: false,
            createdAt: new Date()
        });
    },

    toggleTodo: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id')?.toString();

        if (!id) return { success: false };

        const db = await connectToDb();
        await db.collection('todos').updateOne(
            { _id: new ObjectId(id) },
            { $set: { completed: formData.get('completed') === 'true' } }
        );
    },

    deleteTodo: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id')?.toString();

        if (!id) return { success: false };

        const db = await connectToDb();
        await db.collection('todos').deleteOne({ _id: new ObjectId(id) });
    }
};
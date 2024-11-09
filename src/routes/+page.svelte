<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div class="container mx-auto max-w-2xl p-4">
    <h1 class="text-3xl font-bold mb-6">MongoDB</h1>

    <form method="POST" action="?/addTodo" use:enhance class="mb-6">
        <div class="flex gap-2">
            <input
                type="text"
                name="text"
                placeholder="Add a new todo..."
                class="flex-1 px-4 py-2 border rounded"
                required
            />
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add
            </button>
        </div>
    </form>

    <ul class="space-y-2">
        {#each data.todos as todo}
            <li class="flex items-center gap-2 p-3 border rounded">
                <form method="POST" action="?/toggleTodo" use:enhance class="flex-1 flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="completed"
                        checked={todo.completed}
                        value={todo.completed ? 'false' : 'true'}
                    />
                    <input type="hidden" name="id" value={todo._id} />
                    <button type="submit" class="flex-1 text-left">
                        <span class:line-through={todo.completed}>
                            {todo.text}
                        </span>
                    </button>
                </form>
                
                <form method="POST" action="?/deleteTodo" use:enhance>
                    <input type="hidden" name="id" value={todo._id} />
                    <button type="submit" class="text-red-500 hover:text-red-700">
                        Delete
                    </button>
                </form>
            </li>
        {/each}
    </ul>
</div>
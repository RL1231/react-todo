import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { TodoState } from '../types/types';

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      tags: [],
      index: {},
      tagFilter: '',

      addTodo: (task, tags = []) =>
        set((state) => {
          const id = nanoid();

          const newIndex = { ...state.index };
          tags.forEach((t) => {
            if (!newIndex[t]) newIndex[t] = [];
            newIndex[t].push(id);
          });

          return {
            todos: [...state.todos, { id, task, completed: false, tags }],
            index: newIndex,
          };
        }),
      removeTodo: (id) =>
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
      isComplete: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        })),
      setFilter: (filter) => set({ filter }),
      addTags: (tags) =>
        set((state) => ({
          tags: [...state.tags, ...tags.filter((t) => !state.tags.includes(t))],
        })),
      setTagFilter: (tag) => set({ tagFilter: tag }),
    }),
    { name: 'todo-storage' },
  ),
);

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTodoStore } from '../store/todoStore';

export default function TodoInput() {
  const [task, setTask] = useState('');
  const [tags, setTags] = useState('');
  const [open, setOpen] = useState(false);
  const { addTodo, addTags } = useTodoStore();

  // Helper function to parse tags from tag input string
  function parseTags(tagString: string): string[] {
    // Split by commas, spaces, semicolons, or pipes and trim whitespace
    // Filter out empty strings
    return tagString ? tagString.split(/[\s,|;]+/).map((t) => t.trim()) : [];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tagsArray = parseTags(tags);

    if (task.trim() === '') return;
    addTodo(task, tagsArray);
    addTags(tagsArray);
    setTask('');
    setTags('');
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="fixed right-4 bottom-4 z-50 h-14 w-14 rounded bg-neutral-800 pb-2 text-4xl font-semibold text-white md:right-6 md:bottom-6 md:h-16 md:w-16">
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-60 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 md:max-w-lg">
          <Dialog.Title aria-label="Add new todo..." />
          <Dialog.Description aria-describedby="Add Todo" />
          <form onSubmit={handleSubmit} className="flex flex-col">
            <Dialog.Close asChild>
              <button className="mb-4 ml-auto text-xl hover:text-red-500">
                ✕
              </button>
            </Dialog.Close>
            <input
              type="text"
              value={task}
              placeholder="Add a new task..."
              className="mb-2 w-full border-b-2 border-neutral-200 p-1 text-2xl md:text-4xl"
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="flex flex-row items-center gap-2">
              <span className="mb-2 md:text-lg">Tags: </span>
              <input
                type="text"
                value={tags}
                placeholder="Add tags..."
                className="mb-2 w-full border-b-2 border-neutral-200 p-1 md:text-xl"
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="mb-2 h-8 w-full">
              {parseTags(tags).map((t) => (
                <label
                  key={t}
                  className="mr-2 mb-1 inline-flex items-center rounded-full bg-blue-200 px-2 text-blue-500"
                >
                  <span>{t}</span>
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="ml-auto rounded bg-neutral-800 px-4 py-2 text-xl font-semibold text-white md:px-6 md:py-3 md:text-2xl"
            >
              Add
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

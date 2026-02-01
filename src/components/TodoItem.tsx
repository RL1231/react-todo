import * as Dialog from '@radix-ui/react-dialog';
import { useTodoStore } from '../store/todoStore';
import type { Todo } from '../types/types';

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { removeTodo, isComplete } = useTodoStore();

  return (
    <li className="mt-6 mb-2 flex flex-row border-b-2 border-neutral-300 xl:mt-8 xl:w-full landscape:mx-auto landscape:min-w-125">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => isComplete(todo.id)}
        className="mt-3 mr-2 h-5 w-5 md:h-7 md:w-7 lg:mb-2"
      />
      <div className="my-2 w-full flex-col gap-1">
        <span className="mr-auto mb-1 flex items-center text-lg md:text-2xl xl:mb-2 xl:text-3xl">
          {todo.task}
        </span>
        <div className="flex flex-row">
          {todo.tags.map((t) => (
            <span
              key={t}
              className="mr-1 rounded bg-blue-100 px-1.5 pb-1 text-sm text-blue-500 md:text-lg xl:px-2 xl:text-2xl"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="mr-2 px-2 pb-4 text-xl hover:text-red-500">
            ✕
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-60 max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 shadow-lg">
            <Dialog.Title aria-label="Delete todo" />
            <Dialog.Description className="mb-4">
              Are you sure you want to delete this todo?
            </Dialog.Description>
            <div className="flex justify-end gap-4">
              <Dialog.Close asChild>
                <button className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => removeTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </li>
  );
}

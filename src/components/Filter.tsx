import { Funnel } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

export default function Filter() {
  const { setFilter, tagFilter, setTagFilter } = useTodoStore();
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className={`${!tagFilter.trim() ? 'hidden' : ''} fixed right-4 bottom-20 z-50 rounded-full bg-blue-500 p-4 md:right-6 md:bottom-24`}
        >
          <Funnel className="font-semibold text-white md:h-8 md:w-8" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-60 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 md:max-w-lg">
          <Dialog.Title aria-label="Clear filter" />
          <Dialog.Description
            aria-describedby="Clear filter"
            className="mb-4 text-xl md:mt-2 md:mb-24 md:ml-2 md:text-3xl"
          >
            Clear the filter and show all todos?
          </Dialog.Description>
          <button
            type="submit"
            className="ml-auto flex rounded bg-blue-500 px-4 py-2 text-xl font-semibold text-white md:mr-2 md:mb-2 md:px-6 md:py-4 md:text-3xl"
            onClick={() => {
              setTagFilter('');
              setFilter('all');
              setOpen(false);
            }}
          >
            Clear
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

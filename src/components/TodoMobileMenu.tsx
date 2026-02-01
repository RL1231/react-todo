import * as Collapsible from '@radix-ui/react-collapsible';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import SearchTag from './TagSearch';

export default function TodoMobileMenu() {
  const [open, setOpen] = useState(false);
  const { filter, setFilter } = useTodoStore();
  const filters = ['all', 'completed', 'pending'] as const;

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        aria-label="Toggle menu"
        className="fixed top-0 left-0 z-50 p-4 md:p-8 lg:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {open ? (
          <X className="h-6 w-6 md:h-8 md:w-8" />
        ) : (
          <Menu className="h-6 w-6 md:h-8 md:w-8" />
        )}
      </Collapsible.Trigger>

      <Collapsible.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp w-full overflow-hidden bg-white">
        <nav className="mt-10 flex flex-col divide-y md:mt-16 landscape:mt-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setOpen(false);
              }}
              className={`${filter === f ? 'bg-neutral-100 font-bold' : ''} border-b-0 py-8 text-xl text-neutral-800 capitalize md:text-2xl`}
            >
              {f}
            </button>
          ))}
          <div>
            <SearchTag onSubmit={() => setOpen(false)} />
          </div>
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

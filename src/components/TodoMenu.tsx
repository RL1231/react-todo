import { useTodoStore } from '../store/todoStore';
import SearchTag from './TagSearch';

export default function TodoMenu() {
  const { filter, setFilter } = useTodoStore();
  const filters = ['all', 'completed', 'pending'] as const;

  return (
    <nav className="hidden w-full lg:mt-12 lg:flex lg:flex-col">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`${filter === f ? 'bg-neutral-200 font-semibold' : ''} flex w-full justify-start border-b-2 border-transparent pt-8 pb-4 pl-6 text-2xl capitalize hover:border-neutral-200 xl:text-3xl`}
        >
          {f}
        </button>
      ))}
      <div>
        <SearchTag />
      </div>
    </nav>
  );
}

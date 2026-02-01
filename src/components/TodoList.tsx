import { useTodoStore } from '../store/todoStore';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos, filter, tagFilter } = useTodoStore();

  const filteredByStatus = todos.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    if (filter === 'all') return true;
  });
  const filteredByTag = filteredByStatus.filter((t) => {
    if (!tagFilter.trim()) return true;
    return t.tags.includes(tagFilter);
  });

  return (
    <ul className="mt-12 mb-24 flex w-full flex-col gap-2 md:mx-auto md:max-w-140 xl:max-w-200">
      {filteredByTag.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
}

import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { Search } from 'lucide-react';

type Props = {
  onSubmit?: () => void;
};

export default function TagSearch({ onSubmit }: Props) {
  const { index, setFilter, setTagFilter } = useTodoStore();
  const [tag, setTag] = useState('');

  function handleSubmit(e: React.FormEvent) {
    // Stop the browser from submitting/reloading the page.
    e.preventDefault();

    // Compute results based on the current tag and update state.
    if (tag.trim() in index) {
      setTagFilter(tag.trim());
      setFilter('all');
      setTag('');
    } else {
      setTagFilter('');
    }
    // Call the onSubmit callback if provided.
    onSubmit?.();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
      <div className="relative mx-auto">
        <input
          value={tag}
          placeholder="Search for tag..."
          className="flex w-full rounded-full py-1 pl-4 text-2xl lg:py-2"
          onChange={(e) => setTag(e.target.value)}
        />
        <Search className="absolute top-1/2 right-3 -translate-y-1/2" />
      </div>
    </form>
  );
}

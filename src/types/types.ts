export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  tags: string[];
}

export type Filter = 'all' | 'pending' | 'completed';

export type TagIndex = Record<string, string[]>;

export interface TodoState {
  todos: Todo[];
  filter: Filter;
  tags: string[];
  index: TagIndex;
  tagFilter: string;

  addTodo: (task: string, tags?: string[]) => void;
  removeTodo: (id: string) => void;
  isComplete: (id: string) => void;
  setFilter: (filter: Filter) => void;
  addTags: (tags: string[]) => void;
  setTagFilter: (tag: string) => void;
}

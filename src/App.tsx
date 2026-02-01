import TodoMobileMenu from './components/TodoMobileMenu';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import './App.css';
import TodoMenu from './components/TodoMenu';
import Filter from './components/Filter';

function App() {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-40 h-25.5 bg-linear-to-b from-white/95 to-transparent md:h-24" />
      <div className="lg:flex">
        <TodoMobileMenu />
        <Filter />
        <div className="lg:fixed lg:w-1/4">
          <TodoMenu />
        </div>
        <div className="lg:ml-auto lg:w-3/4">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;

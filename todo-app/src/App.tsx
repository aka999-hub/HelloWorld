import { useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="bg-primary">
            <CardTitle className="text-white text-center text-2xl">Todo App</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex space-x-2 mb-6">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo}>Add</Button>
            </div>
            
            <div className="space-y-3">
              {todos.length === 0 ? (
                <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
              ) : (
                todos.map(todo => (
                  <div 
                    key={todo.id} 
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      todo.completed ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <Button
                        variant={todo.completed ? "default" : "outline"}
                        size="icon"
                        className="h-6 w-6 mr-3"
                        onClick={() => toggleTodo(todo.id)}
                      >
                        {todo.completed && <Check className="h-4 w-4" />}
                      </Button>
                      <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                        {todo.text}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

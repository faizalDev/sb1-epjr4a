import React from 'react';
import { Plus, ListTodo, Timer, CheckCircle } from 'lucide-react';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: Task['status'];
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (taskId: string, newStatus: Task['status']) => void;
  onEditTask: (taskId: string, updatedTask: Partial<Task>) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onMoveTask,
  onEditTask,
}) => {
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case 'to do':
        return <ListTodo className="w-5 h-5 text-gray-600" />;
      case 'in progress':
        return <Timer className="w-5 h-5 text-blue-600" />;
      case 'done':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50/50 rounded-xl p-4 backdrop-blur-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getIcon()}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <span className="bg-gray-200 text-gray-600 text-sm px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTask}
          className="p-1.5 bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onMove={onMoveTask}
            onEdit={onEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
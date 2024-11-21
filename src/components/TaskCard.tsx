import React, { useState } from 'react';
import { Trash2, Edit2, Calendar, Tag, ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { Task } from '../types';
import TaskModal from './TaskModal';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (taskId: string, newStatus: Task['status']) => void;
  onEdit: (taskId: string, updatedTask: Partial<Task>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onMove, onEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    Low: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20',
    Medium: 'bg-amber-100 text-amber-800 ring-1 ring-amber-600/20',
    High: 'bg-rose-100 text-rose-800 ring-1 ring-rose-600/20',
  };

  const categoryColors = {
    BotWaba: 'bg-purple-100 text-purple-800 ring-1 ring-purple-600/20',
    'Digital Product': 'bg-sky-100 text-sky-800 ring-1 ring-sky-600/20',
    WhatsAuto: 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-600/20',
    'ChatFlow Crm': 'bg-blue-100 text-blue-800 ring-1 ring-blue-600/20',
    'Meta Ads': 'bg-pink-100 text-pink-800 ring-1 ring-pink-600/20',
    Other: 'bg-slate-100 text-slate-800 ring-1 ring-slate-600/20',
  };

  const handleMove = (direction: 'left' | 'right') => {
    const statusOrder: Task['status'][] = ['todo', 'inProgress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    
    if (direction === 'left' && currentIndex > 0) {
      onMove(task.id, statusOrder[currentIndex - 1]);
    } else if (direction === 'right' && currentIndex < statusOrder.length - 1) {
      onMove(task.id, statusOrder[currentIndex + 1]);
    }
  };

  const handleEditSubmit = (updatedTask: Partial<Task>) => {
    onEdit(task.id, updatedTask);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="group p-4 rounded-lg shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-start gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={isExpanded ? "Collapse description" : "Expand description"}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <h3 className="text-gray-800 font-medium">{task.title}</h3>
            </div>
          </div>
          <div className="flex gap-2 ml-2 shrink-0">
            <button
              onClick={() => handleMove('left')}
              className={`text-gray-400 transition-colors ${
                task.status !== 'todo' ? 'hover:text-blue-500' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={task.status === 'todo'}
              aria-label="Move task left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleMove('right')}
              className={`text-gray-400 transition-colors ${
                task.status !== 'done' ? 'hover:text-blue-500' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={task.status === 'done'}
              aria-label="Move task right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {isExpanded && task.description && (
          <div className="mb-3 pl-6 pr-2">
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${priorityColors[task.priority]}`}>
            <Tag className="w-3 h-3" />
            {task.priority}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
            categoryColors[task.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800 ring-1 ring-gray-600/20'
          }`}>
            {task.category}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>

      {showEditModal && (
        <TaskModal
          mode="edit"
          initialData={task}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default TaskCard;
import React, { useCallback } from 'react';

function Task({ task, handleDeleteTask, handleEditTask }) {
  const translateText = useCallback((text) => {
    if (text === 'high') {
      return 'alta';
    }
    if (text === 'medium') {
      return 'media';
    }
    return 'baja';
  }, []);
  const priorityStyles = useCallback((priority) => {
    if (priority === 'high') {
      return 'text-red-600';
    }
    if (priority === 'medium') {
      return 'text-yellow-400';
    }
    return 'text-lime-500';
  }, []);
  return (
    <div className="w-full shadow-md p-2 bg-white rounded-md my-3">
      <p className="text-center uppercase font-bold text-gray-500">
        Prioridad:
        <span className={`${priorityStyles(task.priority)}`}>
          {' '}
          {translateText(task.priority) ? translateText(task.priority) : 'Media'}
        </span>
      </p>
      <p className="bg-slate-100 p-2 rounded-md">{task.text}</p>
      <div className="my-2 flex justify-evenly">
        <button
          type="button"
          onClick={handleEditTask}
          className="bg-indigo-600 py-2 px-4 rounded-md uppercase text-white font-bold hover:bg-indigo-700 transition-colors"
        >
          Editar
        </button>
        <button
          className="bg-red-600 py-2 px-4 rounded-md uppercase text-white font-bold hover:bg-red-700 transition-colors"
          type="button"
          onClick={() => handleDeleteTask(task.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Task;

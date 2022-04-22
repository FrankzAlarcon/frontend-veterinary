import React from 'react';
import Add from '../components/Add';
import Alert from '../components/Alert';
import Searcher from '../components/Searcher';
import Task from '../components/Task';
import useTasks from '../hooks/useTasks';

function Tasks() {
  const {
    tasks, handleAddTask, input, setInput, handleDeleteTask,
  } = useTasks();
  const filteredTasks = tasks
    ?.filter((task) => task.text.toLowerCase().includes(input.toLowerCase()));

  return (
    <div>
      <h1 className="text-3xl font-black my-3 text-center md:text-5xl lg:text-6xl">
        Lista de
        {' '}
        <span className="text-indigo-600">Tareas</span>
      </h1>
      <p className="text-lg text-center my-2">
        Administra tus
        {' '}
        <span className="text-indigo-600 font-bold">Tareas y Cosas por hacer</span>
      </p>
      <Searcher input={input} setInput={setInput} placeholder="Filtra tus tareas" />
      <div className="my-5">
        {tasks?.length === 0 && (
        <div className="text-center my-5">
          <h2 className="font-black text-xl ">No tienes tareas pendientes!!</h2>
          <p className="font-bold text-indigo-600">Añade una tarea</p>
        </div>
        )}
        {
          filteredTasks?.length === 0 && tasks?.length > 0 ? (
            <Alert>
              No hay resultados para:
              {' '}
              {input}
            </Alert>
          )
            : filteredTasks?.map((task) => (
              <Task
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
              />
            ))
        }
      </div>
      <div className="absolute bottom-0 right-0 m-3">
        <Add onClick={handleAddTask} />
      </div>
    </div>
  );
}

export default Tasks;

import React from 'react';
import Add from '../components/Add';
import Alert from '../components/Alert';
import Input from '../components/Input';
import Spinner from '../components/Spinner';
import Task from '../components/Task';
import useTasks from '../hooks/useTasks';

function Tasks() {
  const {
    tasks, handleAddTask, input, setInput,
    handleDeleteTask, loading, handleEditTask,
    priorityFilter, setPriorityFilter,
  } = useTasks();
  const filteredTasks = priorityFilter ? tasks
    ?.filter((task) => (
      task.text.toLowerCase().includes(input.toLowerCase()) && task.priority === priorityFilter
    ))
    : tasks
      ?.filter((task) => (
        task.text.toLowerCase().includes(input.toLowerCase())
      ));
  return (
    <div>
      <h1 className="text-3xl font-black my-3 text-center md:text-4xl lg:text-5xl">
        Lista de
        {' '}
        <span className="text-indigo-600">Tareas</span>
      </h1>
      <p className="text-lg text-center my-2">
        Administra tus
        {' '}
        <span className="text-indigo-600 font-bold">Tareas y Cosas por hacer</span>
      </p>
      <Input input={input} setInput={setInput} placeholder="Filtra tus tareas" />
      <select
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="w-full p-2 mt-3 rounded-md md:w-1/2 mx-auto block border-2"
        name="filters"
        id="filters"
      >
        <option value="">--Filtra por prioridad--</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>
      <div className="my-5">
        {loading && <Spinner />}
        {tasks?.length === 0 && !loading && (
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
            : (
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
                {
                  filteredTasks?.map((task) => (
                    <Task
                      key={task.id}
                      task={task}
                      handleDeleteTask={handleDeleteTask}
                      handleEditTask={handleEditTask}
                    />
                  ))
                }
              </div>
            )
        }
      </div>
      <div className="absolute bottom-0 right-0 m-3">
        <Add onClick={handleAddTask} />
      </div>
    </div>
  );
}

export default Tasks;

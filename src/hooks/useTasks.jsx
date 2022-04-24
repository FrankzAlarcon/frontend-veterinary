import { useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import useUserValues from './useUserValues';

function useTasks() {
  const { user, tasks, setTasks } = useUserValues();
  const [input, setInput] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) {
      setLoading(true);
      const getTasks = async () => {
        try {
          const response = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${user.id}/tasks`);
          const { body } = await response.json();
          setTasks(body);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      getTasks();
    }
  }, []);

  const handleAddTask = () => {
    Swal.fire({
      title: 'Escribe tu tarea',
      html: `<select class="border w-full text-center" name="priority" id="priority">
      <option value="">--Prioridad--</option>
      <option value="high">Alta</option>
      <option value="medium">Media</option>
      <option value="low">Baja</option>
      </select>`,
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Añadir',
      cancelButtonText: 'Cancelar',
      preConfirm: (text) => {
        if (text === '') {
          Swal.showValidationMessage('Aún no has escrito la tarea');
        }
        return { text, priority: document.getElementById('priority').value };
      },
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const { value } = result;
          if (!value.priority) {
            value.priority = 'medium';
          }
          const response = await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${user.id}/create-task`, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { body } = await response.json();
          setTasks([...tasks, body]);
        }
      } catch (error) {
        console.log(error);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: '¿Realmente quieres eliminar esta tarea?',
      text: 'No podrás recuperarla!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        Swal.fire(
          'Eliminado!',
          'La tarea ha sido eliminada.',
          'success',
        );
        await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${user.id}/delete-task/${id}`, {
          method: 'DELETE',
        });
      }
    });
  };

  const handleEditTask = (task) => {
    Swal.fire({
      title: 'Edita tu tarea',
      html: `<select class="border w-full text-center" name="priority" id="priority">
      <option value="">--Prioridad--</option>
      <option value="high">Alta</option>
      <option value="medium">Media</option>
      <option value="low">Baja</option>
      </select>`,
      input: 'textarea',
      inputValue: task.text,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: (text) => {
        if (text === '') {
          Swal.showValidationMessage('No has escrito la tarea');
        }
        return { text, priority: document.getElementById('priority').value };
      },
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const { value } = result;
          if (!value.priority) {
            value.priority = task.priority;
          }
          const newTasks = tasks
            .map((taskItem) => (taskItem.id === task.id ? { ...task, ...value } : taskItem));
          setTasks(newTasks);
          await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${user.id}/update-task/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      } catch (error) {
        Swal.fire(
          'Algo inesperado a ocurrido mientras se actualizaba',
          'No se ha guardado lo que editaste',
          'error',
        );
        const newTasks = tasks
          .map((taskItem) => (taskItem.id === task.id ? task : taskItem));
        setTasks(newTasks);
      }
    }).catch((error) => {
      console.log(error);
    });
  };
  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    input,
    setInput,
    loading,
    priorityFilter,
    setPriorityFilter,
  };
}

export default useTasks;

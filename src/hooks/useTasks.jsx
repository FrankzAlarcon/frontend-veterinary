import { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import useUserValues from './useUserValues';

function useTasks() {
  const { user } = useUserValues();
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState(() => user.tasks);
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
      inputValue: input,
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
          'Deleted!',
          'Your file has been deleted.',
          'success',
        );
        await window.fetch(`${import.meta.env.VITE_API_URL}/veterinarians/${user.id}/delete-task/${id}`, {
          method: 'DELETE',
        });
      }
    });
  };
  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    input,
    setInput,
  };
}

export default useTasks;

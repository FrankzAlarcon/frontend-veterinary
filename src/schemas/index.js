import * as yup from 'yup';

const name = yup.string().min(3, 'Nombre demasiado corto').required('El nombre es requerido');
const email = yup.string().email('Ingrese un email válido').required('El email es requerido');
const password = yup.string().min(8, 'Se necesitan al menos 8 caracteres').required('La contraseña es requerida');
const repeatPassword = yup.string().min(8, 'Se necesitan al menos 8 caracteres').required('Repetir contraseña es requerido');
const petName = yup.string().required('El nombre de la mascota es obligatorio');
const animalType = yup.string().required('El tipo de animal es obligatorio');
const date = yup.string().required('La fecha es obligatoria');
const symptoms = yup.string().required('Los síntomas son obligatorios');

const loginSchema = yup.object().shape({
  email,
  password,
});

const registerSchema = yup.object().shape({
  name,
  email,
  password,
  repeatPassword,
});

const newPatientSchema = yup.object().shape({
  name,
  email,
  petName,
  animalType,
  date,
  symptoms,
});

export {
  loginSchema,
  registerSchema,
  newPatientSchema,
};

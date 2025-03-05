import { ChangeEvent, useRef, useState } from 'react';

function useForm<T extends { [key: string]: string }>(baseForm: T) {
  const [form, setForm] = useState<T>(baseForm);
  const prevFormRef = useRef<T>({ ...baseForm });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(prevFormRef.current);
  }

  return { form, handleChange, setForm, resetForm };
}

export { useForm };

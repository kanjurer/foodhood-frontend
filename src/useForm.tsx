import { useState } from 'react';

export default function useForm<T>(initialValues: T): [T, (e: any) => void] {
  let [values, setValues] = useState(initialValues);

  return [
    values,
    (e: any): void => {
      setValues(() => {
        if (typeof e === 'string') {
          return { ...values, type: e };
        }

        return { ...values, [e.target.name]: e.target.value };
      });
    },
  ];
}

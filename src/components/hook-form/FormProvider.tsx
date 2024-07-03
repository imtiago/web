import { ReactNode } from 'react';
import { FormProvider as Form } from 'react-hook-form';

interface IFormProvider {
  children: ReactNode;
  methods: any;
  onSubmit: () => void;
}

export default function FormProvider({ children, onSubmit, methods }: IFormProvider) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

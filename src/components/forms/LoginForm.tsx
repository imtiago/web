import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import RHFTextField from '../hook-form/RHFTextField';
import FormProvider from '../hook-form/FormProvider';
import RHFPasswordField from '../hook-form/RHFPasswordField';

const LoginSchema = z.object({
  identifier: z.string().email(),
  password: z.string(),
});

export type TDataLogin = z.infer<typeof LoginSchema>;

interface ILoginFormProps {
  onSubmit: (data: any) => any;
}
export default function LoginForm({ onSubmit }: ILoginFormProps) {
  const defaultValues = {
    identifier: 'system@system.com',
    password: 'system123',
  };

  const methods = useForm<TDataLogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField type="text" name="identifier" placeholder="Email" autoFocus />

        <RHFPasswordField name="password" placeholder="Senha" />

        <Button bg="#1e1b4b" color="white" type="submit" isLoading={isSubmitting}>
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
}

import { useFormContext, Controller } from 'react-hook-form';
import { Input, InputProps } from '@chakra-ui/react';
interface IRHFTextFieldProps extends InputProps {
  name: string;
}

export default function RHFTextField({ name, ...other }: IRHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input {...field} value={typeof field.value === 'number' && field.value === 0 ? '' : field.value} {...other} />
      )}
    />
  );
}

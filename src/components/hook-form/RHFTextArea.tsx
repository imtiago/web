import { useFormContext, Controller } from 'react-hook-form';
import { Textarea, TextareaProps } from '@chakra-ui/react';

interface IRHFTextAreaProps extends TextareaProps {
  name: string;
}

export default function RHFTextArea({ name, ...other }: IRHFTextAreaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Textarea
            {...field}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            isInvalid={!!error}
            {...other}
          />
        );
      }}
    />
  );
}

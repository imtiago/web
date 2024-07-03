import { useFormContext, Controller } from 'react-hook-form';
import { IconButton, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface IRHFPasswordFieldProps extends InputProps {
  name: string;
}

export default function RHFPasswordField({ name, ...other }: IRHFPasswordFieldProps) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputGroup size="md">
          <Input
            {...field}
            type={showPassword ? 'text' : 'password'}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            //   error={!!error}
            //   helperText={error?.message}
            {...other}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              variant="outlined"
              aria-label="button show password"
              h="1.75rem"
              size="sm"
              onClick={toggleShowPassword}
              icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            >
              {showPassword ? 'Hide' : 'Show'}
            </IconButton>
          </InputRightElement>
        </InputGroup>
      )}
    />
  );
}

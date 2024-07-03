import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, FormLabel, Stack, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import RHFTextField from '../hook-form/RHFTextField';
import FormProvider from '../hook-form/FormProvider';
import { IMovie } from '../../utils/interfaces';

interface IRentFormProps {
  onSubmit: (data: any) => any;
  movieSelected: IMovie;
}
export default function RentForm({ onSubmit, movieSelected }: IRentFormProps) {
  const SignupSchema = z.object({
    movieId: z.string(),
    initialDate: z.string().date(),
    endDate: z.string().date(),
    qnt: z.string().transform((value) => parseInt(value)),
  });

  const defaultValues = {
    movieId: movieSelected.id,
  };

  const methods = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} className="items-center">
        <Stack spacing={3} className="w-5/6">
          <FormControl>
            <FormLabel>Titulo do Filme</FormLabel>
            <Text>{movieSelected.title}</Text>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Data Inicial</FormLabel>
            <RHFTextField type="date" name="initialDate" placeholder="Data Inicial" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Data Final</FormLabel>
            <RHFTextField type="date" name="endDate" placeholder="Data Final" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Quantidade de copias</FormLabel>
            <RHFTextField type="number" name="qnt" placeholder="Quantidade" min={0} />
          </FormControl>

          <Box className="flex flex-row gap-4">
            <Button bg={'#1e1b4b'} color="white" type="submit" isLoading={isSubmitting} className="flex-1">
              Registrar
            </Button>
          </Box>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

import { Tr, Td, Button } from '@chakra-ui/react';
import { IMovie } from '../utils/interfaces';
import { alertQuestion } from './Toast';

interface ITableItemUserProps {
  item: IMovie;
  onHandleDeleteUser: (item: IMovie) => void;
}

function TableItemMovie({ item, onHandleDeleteUser }: ITableItemUserProps) {
  const onHandleDelete = async () => {
    const responseUser = await alertQuestion({
      message: `Deseja realizar o aluguel do filme de titulo: ${item.title}`,
    });
    if (responseUser) onHandleDeleteUser(item);
  };

  return (
    <Tr>
      <Td>{item.title}</Td>
      <Td>{item.description}</Td>
      <Td>{item.category}</Td>
      <Td>{item.numberOfCopies}</Td>
      <Td>{item.renteds}</Td>
      <Td>{item.available}</Td>
      <Td>
        {item.available > 0 ? (
          <Button color="green" onClick={() => onHandleDelete()}>
            Alugar
          </Button>
        ) : (
          <Button color="red" isDisabled={true}>
            Indisponivel
          </Button>
        )}
      </Td>
    </Tr>
  );
}

export default TableItemMovie;

import { Tr, Td } from '@chakra-ui/react';
import { formatDate } from '../utils';
import CustomTag from './CustomTag';

export interface IItem {
  id: string;
  initialDate: Date;
  endDate: Date;
  qnt: number;
  status: string;
  title: string;
}

interface ITableItemUserProps {
  item: IItem;
}

function TableItemRent({ item }: ITableItemUserProps) {
  return (
    <Tr>
      <Td>{item.title}</Td>
      <Td>{formatDate(item.initialDate)}</Td>
      <Td>{formatDate(item.endDate)}</Td>
      <Td>{item.qnt}</Td>
      <Td>
        <CustomTag status={item.status === 'OPEN'} label={item.status === 'OPEN' ? 'Aberto' : 'Fechado'} />
      </Td>
    </Tr>
  );
}

export default TableItemRent;

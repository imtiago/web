import { Tr, Th, Text, Box } from '@chakra-ui/react';
import { ArrowDown } from 'lucide-react';

interface IColumn {
  columnName: string;
  asc: boolean;
}
interface ITableColumnProps {
  columns: IColumn[];
}

function TableColumns({ columns }: ITableColumnProps) {
  return (
    <Tr>
      {columns.map((column) => (
        <Th>
          <Box className="flex items-center justify-between">
            <Text>{column.columnName}</Text>
            <ArrowDown size={10} />
          </Box>
        </Th>
      ))}
    </Tr>
  );
}

export default TableColumns;

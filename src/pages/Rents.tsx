import { Box, IconButton, Table, TableContainer, Tbody, Thead, Tooltip } from '@chakra-ui/react';
import Page from '../components/Page';
import { useEffect, useState } from 'react';
import { endPoints } from '../services/api';
import TableColumns from '../components/TableColumns';
import { CustomToolbar } from '../components/CustomToobar';
import { FileDown } from 'lucide-react';

import { IRent } from '../utils/interfaces';
import TableItemRent, { IItem } from '../components/TableItemRent';
import { onHandleGenerateXLSX } from '../utils';

interface ICalledsProps {
  title?: string;
}
interface IColumn {
  columnName: string;
  asc: boolean;
}

const mapperData = (itens: IRent[]) => {
  return itens.map(({ movie, ...rest }) => {
    const result: IItem = {
      ...rest,
      title: movie.title,
    };
    return result;
  });
};

export default function Rents({ title }: ICalledsProps) {
  const [itens, setItens] = useState<IItem[]>([]);
  const [itensFiltered, setItensFiltered] = useState<IItem[]>([]);
  const [columns] = useState<IColumn[]>([
    {
      columnName: 'titulo',
      asc: true,
    },
    {
      columnName: 'Data inicial',
      asc: true,
    },
    {
      columnName: 'Data Final',
      asc: true,
    },
    {
      columnName: 'Quantidade',
      asc: true,
    },
    {
      columnName: 'status',
      asc: true,
    },
  ]);

  const onHandleExport = () => {
    onHandleGenerateXLSX(itens);
  };

  const fetchRents = async () => {
    const response = await endPoints.rent.list();

    const result = mapperData(response.data);
    setItens(result);
  };

  useEffect(() => {
    fetchRents();
  }, []);

  useEffect(() => {
    setItensFiltered(itens);
  }, [itens]);

  return (
    <Page title={title} className="flex ">
      <Box className="p-4">
        <CustomToolbar>
          <Box></Box>
          <Box className="flex gap-1">
            <Tooltip label="Download Excel">
              <IconButton
                bg={'#1e1b4b'}
                color={'white'}
                isRound={true}
                aria-label="Download File"
                onClick={() => {
                  onHandleExport();
                }}
              >
                {/* <CSVDownload data={itens} target="_blank" /> */}
                <FileDown />
              </IconButton>
            </Tooltip>
          </Box>
        </CustomToolbar>
        <TableContainer className="h-full w-full">
          <Table variant="simple">
            <Thead>
              <TableColumns columns={columns} />
            </Thead>
            <Tbody>
              {itensFiltered.map((item, index) => (
                <TableItemRent key={index} item={item} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Page>
  );
}

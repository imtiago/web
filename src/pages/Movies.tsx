import { Box, Button, IconButton, Table, TableContainer, Tbody, Thead, Tooltip } from '@chakra-ui/react';
import Page from '../components/Page';
import { useEffect, useRef, useState } from 'react';
import CustomModal, { ICustomModalRef } from '../components/CustomModal';
import { endPoints } from '../services/api';
import TableColumns from '../components/TableColumns';
import { CustomToolbar } from '../components/CustomToobar';
import { FileDown } from 'lucide-react';
import TableItemMovie from '../components/TableItemMovie';
import { IMovie } from '../utils/interfaces';
import SignupForm from '../components/forms/RentForm';
import { alertError, alertSuccess } from '../components/Toast';
import { onHandleGenerateXLSX } from '../utils';

interface ICalledsProps {
  title?: string;
}
interface IColumn {
  columnName: string;
  asc: boolean;
}

type TSelectedOptions = 'ALL' | 'OK' | 'NOK' | 'RENT';

export default function Movies({ title }: ICalledsProps) {
  const modalRef = useRef<ICustomModalRef>(null);
  const [itens, setItens] = useState<IMovie[]>([]);
  const [optionSelected, setOptionSelected] = useState<TSelectedOptions>('ALL');
  const [itensFiltered, setItensFiltered] = useState<IMovie[]>([]);
  const [itemSelected, setItemSelected] = useState<IMovie | null>(null);

  const [columns] = useState<IColumn[]>([
    {
      columnName: 'titulo',
      asc: true,
    },
    {
      columnName: 'descrição',
      asc: true,
    },
    {
      columnName: 'categoria',
      asc: true,
    },
    {
      columnName: 'numero de unidades',
      asc: true,
    },
    {
      columnName: 'alugadas',
      asc: true,
    },
    {
      columnName: 'disponiveis',
      asc: true,
    },
    {
      asc: true,
      columnName: 'ações',
    },
  ]);

  const onSelectedOption = (option: TSelectedOptions) => {
    setOptionSelected((oldOption) => {
      return oldOption !== option ? option : 'ALL';
    });
  };
  const onHandleExport = () => {
    onHandleGenerateXLSX(itensFiltered);
  };

  const onHandleDeleteUser = async (item: IMovie) => {
    setItemSelected(item);
    modalRef.current?.toggleModal();
  };

  const onCreateUser = async (data: any) => {
    try {
      const responseCreateUser = await endPoints.rent.create(data);
      if (responseCreateUser.status === 201) {
        alertSuccess({ message: 'Aluguel realizado com sucesso!!' });
        fetchUsers();
        setItemSelected(null);
        modalRef.current?.toggleModal();
      } else alertError({ message: 'Error Inesperado!' });
    } catch ({ response }: any) {
      alertError({ message: 'Quantidade de copias não disponiveis!!' });
    }
  };

  const fetchUsers = async () => {
    const response = await endPoints.movie.list();
    setItens(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let response = itens;
    switch (optionSelected) {
      case 'OK':
        response = itens.filter((item) => item.available > 0);
        break;
      case 'NOK':
        response = itens.filter((item) => item.available === 0);
        break;
      case 'RENT':
        response = itens.filter((item) => item.available > 0 && item.available < item.numberOfCopies);
        break;
      default:
        break;
    }
    setItensFiltered(response);
  }, [itens, optionSelected]);

  // const columns = ['name', 'email', 'telefone', 'status'];
  return (
    <Page title={title} className="flex ">
      <Box className="p-4">
        <CustomToolbar>
          <Box></Box>
          <Box className="flex gap-1">
            <Button variant={optionSelected === 'OK' ? 'solid' : 'outline'} onClick={() => onSelectedOption('OK')}>
              Disponiveis
            </Button>
            <Button variant={optionSelected === 'NOK' ? 'solid' : 'outline'} onClick={() => onSelectedOption('NOK')}>
              Indisponiveis
            </Button>
            <Button variant={optionSelected === 'RENT' ? 'solid' : 'outline'} onClick={() => onSelectedOption('RENT')}>
              Alugados
            </Button>
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
                <TableItemMovie key={index} item={item} onHandleDeleteUser={onHandleDeleteUser} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <CustomModal ref={modalRef} title="Registro de Aluguel" isOpen={true} onClose={() => {}}>
        {itemSelected && <SignupForm onSubmit={onCreateUser} movieSelected={itemSelected} />}
      </CustomModal>
    </Page>
  );
}

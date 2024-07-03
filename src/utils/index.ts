import moment from 'moment';
// @ts-ignore
import * as XLSX from 'xlsx/xlsx';

export const formatDate = (date: string | Date) => {
  return moment(date).format('L');
};

export const onHandleGenerateXLSX = (itens: any[]) => {
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.json_to_sheet(itens);
  XLSX.utils.book_append_sheet(wb, ws, 'sheet');
  XLSX.writeFile(wb, 'file.csv');
};

import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface IButtonItem extends ButtonProps {
  label: string;
  icon: ReactElement;
}

function ButtonItem({ label, icon, ...rest }: IButtonItem) {
  return (
    <Button justifyContent={'left'} variant="ghost" {...rest} leftIcon={icon}>
      {label}
    </Button>
  );
}

export default ButtonItem;

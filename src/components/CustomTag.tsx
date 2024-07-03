import { Tag, TagLabel, TagProps } from '@chakra-ui/react';
import { Check, X } from 'lucide-react';

interface ICustomTag extends TagProps {
  status: boolean;
  label: string;
}
const CustomTag = ({ status, label }: ICustomTag) => {
  return (
    <Tag size="md" borderRadius="full" variant="solid" colorScheme={status ? 'green' : 'red'}>
      <TagLabel>{label}</TagLabel>
      {status ? <Check size="14" className="ml-1" /> : <X size="14" className="ml-1" />}
    </Tag>
  );
};

export default CustomTag;

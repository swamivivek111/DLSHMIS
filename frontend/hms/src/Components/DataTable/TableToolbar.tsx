import { Button, Group, TextInput } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import ExportButton from './ExportButton';

interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAdd?: () => void;
  canExport?: boolean;
}

export default function TableToolbar({ searchValue, onSearchChange, onAdd, canExport }: Props) {
  return (
    <Group justify="space-between" style={{ width: '100%' }} align="center">
      <TextInput
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        leftSection={<IconSearch size={14} />}
        style={{ flex: 1, minWidth: 200 }}
      />

      <Group wrap="nowrap">
        {canExport && <ExportButton />}
        {onAdd && (
          <Button onClick={onAdd} className="flex items-center gap-2 ml-4 bg-[#202A44] text-white hover:bg-[#1a2236]">
            Add
            <IconPlus size={16} />
          </Button>
        )}
      </Group>
    </Group>
  );
}

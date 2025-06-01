import { Group, Pagination } from '@mantine/core';

interface Props {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({ page, total, onPageChange }: Props) {
  if (total <= 1) return null; // Hide pagination entirely if there's only one page

  return (
    <Group justify="center" mt="md">
      <Pagination
        total={total}
        value={page}
        onChange={onPageChange}
        size="sm"
        classNames={{
          control:
            'bg-violet-100 hover:bg-violet-200 data-[active]:bg-violet-400 data-[active]:text-white data-[active]:border-violet-400',
        }}
      />
    </Group>
  );
}

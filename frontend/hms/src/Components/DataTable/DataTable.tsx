import { Table, ActionIcon, TableThead } from '@mantine/core';
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react';
import { TableColumn } from '../Types/Table';
import PaginationControls from './PaginationControls';
import TableToolbar from './TableToolbar';
import { useRole } from '../Hooks/useRole';

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onAdd?: () => void;
  canExport?: boolean;
  pagination: {
    page: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  search: {
    value: string;
    onChange: (value: string) => void;
  };
}

export default function DataTable<T>({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  onAdd,
  canExport,
  pagination,
  search,
}: DataTableProps<T>) {
  const { can } = useRole();

  return (
    <div className="space-y-4">
      <TableToolbar
        searchValue={search.value}
        onSearchChange={search.onChange}
        onAdd={onAdd}
        canExport={canExport}
      />

      <Table striped highlightOnHover withColumnBorders withRowBorders style={{ border: '1px solid #ccc' }}>
        <TableThead>
          <tr className="border-b">
            {columns.map(col => (
              <th key={col.key.toString()}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </TableThead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b">
              {columns.map(col => (
                <td key={col.key.toString()} className="border-r px-2 py-1">
                  {col.render ? col.render(row) : (row[col.key] as any)}
                </td>
              ))}
              <td className="flex gap-2 border-r px-2 py-1">
                {onView && (
                  <ActionIcon variant="light" onClick={() => onView(row)}>
                    <IconEye size={16} />
                  </ActionIcon>
                )}
                {onEdit && can(['admin']) && (
                  <ActionIcon variant="light" onClick={() => onEdit(row)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                )}
                {onDelete && can(['admin']) && (
                  <ActionIcon variant="light" color="red" onClick={() => onDelete(row)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <PaginationControls
        page={pagination.page}
        total={pagination.total}
        onPageChange={pagination.onPageChange}
      />
    </div>
  );
}

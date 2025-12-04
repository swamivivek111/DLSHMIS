import { Table, ActionIcon, TableThead } from '@mantine/core';
import { IconEye, IconEdit, IconTrash, IconUserPlus } from '@tabler/icons-react';
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
  onSync?: (row: T) => void;
  onAdd?: () => void;
  canExport?: boolean;
  exportData?: T[];
  exportFilename?: string;
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
  onSync,
  onAdd,
  canExport,
  exportData,
  exportFilename,
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
        exportData={exportData || data}
        exportFilename={exportFilename || "table-data"}
      />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table striped highlightOnHover withColumnBorders withRowBorders className="min-w-full">
          <TableThead>
            <tr className="border-b">
              <th className="w-16 text-center">Sr.</th>
              {columns.map(col => (
                <th key={col.key.toString()} className="px-2 py-1 text-left whitespace-nowrap">{col.label}</th>
              ))}
              <th className="w-24 text-center">Actions</th>
            </tr>
          </TableThead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="w-16 text-center px-2 py-1">{(pagination.page - 1) * 10 + i + 1}</td>
                {columns.map(col => (
                  <td key={col.key.toString()} className="px-2 py-1 max-w-32 truncate" title={String(row[col.key])}>
                    {col.render ? col.render(row) : (row[col.key] as any)}
                  </td>
                ))}
                <td className="w-24 px-2 py-1">
                  <div className="flex gap-1 justify-center">
                    {onView && (
                      <ActionIcon size="sm" variant="light" onClick={() => onView(row)}>
                        <IconEye size={14} />
                      </ActionIcon>
                    )}
                    {onEdit && can(['admin']) && (
                      <ActionIcon size="sm" variant="light" onClick={() => onEdit(row)}>
                        <IconEdit size={14} />
                      </ActionIcon>
                    )}
                    {onDelete && can(['admin']) && (
                      <ActionIcon size="sm" variant="light" color="red" onClick={() => onDelete(row)}>
                        <IconTrash size={14} />
                      </ActionIcon>
                    )}
                    {onSync && can(['admin']) && (
                      <ActionIcon size="sm" variant="light" color="blue" onClick={() => onSync(row)}>
                        <IconUserPlus size={14} />
                      </ActionIcon>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {data.map((row, i) => (
          <div key={i} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-medium text-gray-500">#{(pagination.page - 1) * 10 + i + 1}</span>
              <div className="flex gap-2">
                {onView && (
                  <ActionIcon size="sm" variant="light" onClick={() => onView(row)}>
                    <IconEye size={14} />
                  </ActionIcon>
                )}
                {onEdit && can(['admin']) && (
                  <ActionIcon size="sm" variant="light" onClick={() => onEdit(row)}>
                    <IconEdit size={14} />
                  </ActionIcon>
                )}
                {onDelete && can(['admin']) && (
                  <ActionIcon size="sm" variant="light" color="red" onClick={() => onDelete(row)}>
                    <IconTrash size={14} />
                  </ActionIcon>
                )}
                {onSync && can(['admin']) && (
                  <ActionIcon size="sm" variant="light" color="blue" onClick={() => onSync(row)}>
                    <IconUserPlus size={14} />
                  </ActionIcon>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {columns.map(col => (
                <div key={col.key.toString()} className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">{col.label}:</span>
                  <span className="text-sm text-gray-900 text-right">
                    {col.render ? col.render(row) : (row[col.key] as any)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


      <PaginationControls
        page={pagination.page}
        total={pagination.total}
        onPageChange={pagination.onPageChange}
      />
    </div>
  );
}

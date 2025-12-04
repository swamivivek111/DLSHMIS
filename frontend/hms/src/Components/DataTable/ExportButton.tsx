import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface ExportButtonProps {
  data?: any[];
  filename?: string;
}

export default function ExportButton({ data = [], filename = 'export' }: ExportButtonProps) {
  const handleExport = () => {
    if (data.length === 0) {
      notifications.show({
        title: 'Export',
        message: 'No data to export',
        color: 'orange',
      });
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    notifications.show({
      title: 'Export',
      message: 'Data exported successfully!',
      color: 'green',
    });
  };

  return (
    <Button variant="outline" className="flex items-center gap-2 bg-[#202A44] text-white hover:bg-[#1a2236]" onClick={handleExport}>
      <IconDownload size={16} />
      Export
    </Button>
  );
}

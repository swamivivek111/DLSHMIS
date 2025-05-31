import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

export default function ExportButton() {
  const handleExport = () => {
    // Mocked download (CSV or PDF)
    alert('Export triggered!');
  };

  return (
    <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
      <IconDownload size={16} />
      Export
    </Button>
  );
}

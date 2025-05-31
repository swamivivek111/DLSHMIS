export interface TableColumn<T> {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
  }
  
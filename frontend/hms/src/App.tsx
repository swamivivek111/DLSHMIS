import {MantineProvider} from '@mantine/core';
import AppRoutes from './Routes/AppRoutes';
import { Provider } from 'react-redux';
import Store from './Store';

function App() {
  return (
    <Provider store={Store}>
      <MantineProvider>
          <AppRoutes />
      </MantineProvider>
    </Provider>
  );
}

export default App;

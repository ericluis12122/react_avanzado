import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './routes/AppRouter'
import { AuthProvider } from './auth/context';
import { ModalProvider } from './shared/components/modal/context/ModalContext';

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App
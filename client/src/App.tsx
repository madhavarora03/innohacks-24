import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { RootState } from './lib/store';

function App() {
  const { value } = useSelector((state: RootState) => state.themeReducer);
  document.querySelector('html')?.setAttribute('data-theme', value);
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App


import './App.css'
import router from './routes/router';
import { RouterProvider } from 'react-router-dom'
import UserContextProvider from './user/context/UserContextProvider';

function App() {


  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App

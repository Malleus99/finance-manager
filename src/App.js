import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Authentication from 'components/sections/Auth/Authentication';
import GoalsSection from 'components/sections/goals/GoalsSection';
import ProfilePage from 'pages/Profile';
import MainPage from './pages/MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainPage />}>
      <Route index element={<Authentication />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/goals' element={<GoalsSection />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

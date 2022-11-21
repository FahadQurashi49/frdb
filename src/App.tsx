import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';
import Restaurants from './pages/Restaurants';
import Home from './pages/Home';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/restaurants/:cityArea",
    element: <Restaurants />,
  },
]);

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;

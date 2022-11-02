import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';
import Restaurants from './components/Restaurants';
import Home from './components/Home';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/restaurants",
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

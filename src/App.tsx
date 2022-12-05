import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';
import Restaurants from './pages/Restaurants';
import Restaurant from './pages/Restaurant';
import Home from './pages/Home';
import Layout from './components/Layout';
import AddReview from "./pages/AddReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/restaurants/:cityArea",
    element: <Restaurants />,
  },
  {
    path: "/restaurant/:restaurantId",
    element: <Restaurant />
  },
  {
    path: "/restaurant/:restaurantId/review/add",
    element: <AddReview />,
  }
]);

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;

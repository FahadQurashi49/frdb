import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';
import Restaurants from './pages/Restaurants';
import Restaurant from './pages/Restaurant';
import Home from './pages/Home';
import Layout from './components/Layout';
import AddReview from "./pages/AddReview";
import ErrorPage from "./pages/ErrorPage";
import { fetchRestaurants, fetchRestaurant } from "./services/RestaurantService";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/restaurants/:cityArea",
        element: <Restaurants />,
        loader: async ({ params }) => {
          return await fetchRestaurants(params.cityArea);
        }
      },
      {
        path: "/restaurant/:restaurantId",
        element: <Restaurant />,
        loader: async ({ params }) => {
          return await fetchRestaurant(params.restaurantId);
        }
      },
      {
        path: "/restaurant/:restaurantId/review/add",
        element: <AddReview />,
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;

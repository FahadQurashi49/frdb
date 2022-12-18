import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme } from "@mui/material";
import { green, purple } from "@mui/material/colors";

import './App.css';
import Restaurants from './pages/Restaurants';
import Restaurant from './pages/Restaurant';
import Home from './pages/Home';
import Layout from './components/Layout';
import { AddReview, action as reviewAction } from "./pages/AddReview";
import ErrorPage from "./pages/ErrorPage";
import { fetchRestaurants, fetchRestaurant } from "./services/RestaurantService";
import ReviewsList from "./components/ReviewsList";
import { fetchReviews } from "./services/ReviewService";
import { getLoginUser } from "./services/UserService";
import { ThemeProvider } from "@emotion/react";


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: getLoginUser,
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
        },
        children: [
          {
            path: '/restaurant/:restaurantId/reviews',
            element: <ReviewsList />,
            loader: async ({ params }) => {
              return await fetchReviews(params.restaurantId)
            }
          }
        ]
      },
      {
        path: "/restaurant/:restaurantId/review/add",
        element: <AddReview />,
        action: reviewAction
      }
    ]
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme} >
      <RouterProvider router={router} />
    </ThemeProvider>);
}

export default App;

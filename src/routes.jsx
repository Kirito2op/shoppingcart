import App from "./App";
import Item from "./components/Item";
import Home from "./components/Home";
import Shop from './components/Shop'
import ItemPage from "./components/ItemPage";
import ErrorPage from "./components/ErrorPage";
import Cart from "./components/Cart";


const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/shop',
    element: <Shop />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/product/:id',
    element: <ItemPage />
  }
];

export default routes;

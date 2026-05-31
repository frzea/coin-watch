import { createRoot } from 'react-dom/client'
import App from './App'
import { CoinPage } from './components/coin-page/index';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "coin/:coinId",
        element: <CoinPage/>,
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)




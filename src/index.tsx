
import {AboutLazy} from "@/pages/about/About.lazy";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {App} from "@/components/app";
import {Suspense} from "react";
import {ShopLazy} from "@/pages/shop/shop.lazy";
import {createRoot} from "react-dom/client";



const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found')
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={'loading...'}><AboutLazy/></Suspense>
            },
            {
                path: '/shop',
                element: <Suspense fallback={'loading...'}><ShopLazy/></Suspense>
            }
        ]
    }
])

const container = createRoot(root)
container.render(
    <RouterProvider router={router}/>
)

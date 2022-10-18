import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserContext from './contexts/UserContext';
import Main from './layout/Main';
import Home from './pages/Home';
import PrivateRoute from './pages/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: (
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                ),
            },
            {
                path: '/home',
                element: (
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                ),
            },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
]);

function App() {
    return (
        <UserContext>
            <RouterProvider router={router} />
        </UserContext>
    );
}

export default App;

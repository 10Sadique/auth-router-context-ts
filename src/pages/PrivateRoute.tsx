import React, { ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext, UserContextInterface } from '../contexts/UserContext';

interface Child {
    children: ReactNode;
}

const PrivateRoute = ({ children }: Child): any => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext) as UserContextInterface;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user && user.uid) {
        return children;
    }

    return <Navigate to={`/login`} state={{ from: location }} replace={true} />;
};

export default PrivateRoute;

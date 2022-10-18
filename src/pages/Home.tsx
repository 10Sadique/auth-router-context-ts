import React, { useContext } from 'react';
import { AuthContext, UserContextInterface } from '../contexts/UserContext';

const Home = () => {
    const { user } = useContext(AuthContext) as UserContextInterface;

    return (
        <div>
            <p>Home Page</p>
            <p>Welcome {user?.email}</p>
        </div>
    );
};

export default Home;

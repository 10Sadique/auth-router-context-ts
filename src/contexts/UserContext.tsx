import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import app from '../firebase/firebase.config';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    UserCredential,
} from 'firebase/auth';

export interface UserContextInterface {
    user: User | null;
    loading: boolean;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
    setName: (name: string) => Promise<void> | undefined;
}

export const AuthContext = createContext<UserContextInterface | null>(null);

const auth = getAuth(app);

const UserContext = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const setName = (name: string) => {
        if (auth.currentUser !== null)
            return updateProfile(auth.currentUser, { displayName: name });
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (presentUser: User | null) => {
                setUser(presentUser);
                setLoading(false);
            }
        );

        return () => {
            unSubscribe();
        };
    }, []);

    // console.log(user);

    const authInfo: UserContextInterface = {
        user,
        createUser,
        signIn,
        logOut,
        loading,
        setName,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default UserContext;

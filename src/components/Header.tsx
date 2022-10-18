import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, UserContextInterface } from '../contexts/UserContext';

const Header = () => {
    const { user, logOut } = useContext(AuthContext) as UserContextInterface;

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Logged Out.');
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <div className="flex items-center justify-between px-5 navbar bg-primary text-primary-content lg:px-20">
                <p className="text-xl font-bold normal-case btn btn-ghost">
                    <Link to={`/`}>AwsomeAuth</Link>
                </p>
                {user?.uid && <p>{user?.displayName || user.email}</p>}
                <div className="space-x-5 font-semibold">
                    <Link className="" to={`/home`}>
                        Home
                    </Link>
                    {user?.uid ? (
                        <Link onClick={handleLogOut} to={`/`}>
                            Log Out
                        </Link>
                    ) : (
                        <div className="space-x-5">
                            <Link className="" to={`/login`}>
                                Log in
                            </Link>
                            <Link className="" to={`/register`}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

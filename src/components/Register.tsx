import React, { FormEvent, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, UserContextInterface } from '../contexts/UserContext';

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const { createUser, setName } = useContext(
        AuthContext
    ) as UserContextInterface;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, email, password } = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            password: { value: string };
        };

        const email1 = email.value;
        const password1 = password.value;

        createUser(email1, password1)
            .then((result) => {
                const user = result.user;

                setName(name.value)
                    ?.then(() => {
                        console.log('Name Updated');
                    })
                    .catch((err) => console.log(err));

                // console.log(user);
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <div className="min-h-screen hero bg-base-200">
                <div className="flex-col hero-content">
                    <div className="text-center lg:text-left">
                        <h1 className="mb-6 text-5xl font-bold">
                            Please Register Now!
                        </h1>
                    </div>
                    <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <Link
                                        to={`/login`}
                                        className="label-text-alt link link-hover"
                                    >
                                        Already have an account?
                                    </Link>
                                </label>
                            </div>
                            <div className="mt-6 form-control">
                                <button className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

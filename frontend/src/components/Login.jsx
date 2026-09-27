import { useState } from "react";

function Login({ onLogin, switchToSignup }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");

        // Empty validation
        if (!email || !password) {

            setError(
                "Please enter email and password."
            );

            return;
        }


        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            setError(
                "Please enter a valid email address."
            );

            return;
        }


        // Password validation
        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }


        setLoading(true);


        // Check login
        setTimeout(() => {

            const result = onLogin({
                email,
                password
            });


            if (!result.success) {

                setError(result.message);

                setLoading(false);

                return;
            }


            setLoading(false);

        }, 700);
    };


    return (
        <div className="form-wrapper">

            <div className="form-heading">

                <h2>
                    Welcome Back
                </h2>

                <p>
                    Login to access your account.
                </p>

            </div>


            <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <div className="input-group">

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                    />

                </div>


                {/* PASSWORD */}

                <div className="input-group">

                    <div className="password-label">

                        <label>
                            Password
                        </label>

                        <a href="#forgot">
                            Forgot password?
                        </a>

                    </div>


                    <div className="password-box">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(
                                    e.target.value
                                );

                                setError("");
                            }}
                        />


                        <button
                            type="button"
                            className="show-btn"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >
                            {showPassword
                                ? "Hide"
                                : "Show"}
                        </button>

                    </div>

                </div>


                {/* REMEMBER */}

                <label className="remember">

                    <input
                        type="checkbox"
                    />

                    <span>
                        Remember me
                    </span>

                </label>


                {/* ERROR */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                {/* LOGIN BUTTON */}

                <button
                    type="submit"
                    className="main-btn"
                    disabled={loading}
                >

                    {loading
                        ? "Signing In..."
                        : "Sign In"}

                </button>

            </form>


            {/* DIVIDER */}

            <div className="divider">

                <span>
                    OR
                </span>

            </div>


            {/* CREATE ACCOUNT */}

            <div className="create-section">

                <p>
                    Don't have an account?
                </p>

                <button
                    className="create-btn"
                    onClick={switchToSignup}
                >
                    Create an Account
                </button>

            </div>


            <p className="terms">

                By continuing, you agree to our
                Terms of Service and Privacy Policy.

            </p>

        </div>
    );
}

export default Login;


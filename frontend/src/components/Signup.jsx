import { useState } from "react";
function Signup({ onSignup, switchToLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Empty validation

        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please fill in all fields."
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


        // Confirm password

        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        setLoading(true);


        // Create account

        setTimeout(() => {

            const result = onSignup({
                name,
                email,
                password
            });


            if (!result.success) {

                setError(result.message);

                setLoading(false);

                return;
            }


            setSuccess(
                "Account created successfully!"
            );


            // Clear form

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");


            setLoading(false);


            // Go to login

            setTimeout(() => {

                switchToLogin();

            }, 1200);

        }, 700);
    };


    return (
        <div className="form-wrapper">

            <div className="form-heading">

                <button
                    className="back-btn"
                    onClick={switchToLogin}
                >
                    ← Back to Login
                </button>


                <h2>
                    Create Account
                </h2>


                <p>
                    Create your NovaLogin account
                    to get started.
                </p>

            </div>


            <form onSubmit={handleSubmit}>

                {/* NAME */}

                <div className="input-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                        }}
                    />

                </div>


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

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                    />

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="input-group">

                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(
                                e.target.value
                            );

                            setError("");
                        }}
                    />

                </div>


                {/* ERROR */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}


                {/* SUCCESS */}

                {success && (
                    <div className="success">
                        {success}
                    </div>
                )}


                {/* CREATE BUTTON */}

                <button
                    type="submit"
                    className="main-btn"
                    disabled={loading}
                >

                    {loading
                        ? "Creating Account..."
                        : "Create Account"}

                </button>

            </form>


            {/* LOGIN */}

            <div className="login-link">

                <p>
                    Already have an account?
                </p>

                <button
                    onClick={switchToLogin}
                >
                    Sign In
                </button>

            </div>

        </div>
    );
}

export default Signup;


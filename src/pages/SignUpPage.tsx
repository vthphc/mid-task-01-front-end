import React from "react";
import signUpImage from "../assets/images/sign-up.png";

export default function SignUpPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [isUsernameValid, setIsUsernameValid] = React.useState(true);
    const [isPasswordValid, setIsPasswordValid] = React.useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
        React.useState(true);

    const [isUsernameExists, setIsUsernameExists] = React.useState(false);

    const validateUsername = () => {
        if (!username) {
            setIsUsernameValid(false);
            return false;
        }

        if (username.includes(" ")) {
            setIsUsernameValid(false);
            return false;
        }

        setIsUsernameValid(true);
        return true;
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setIsPasswordValid(false);
            return;
        }

        if (password.includes(" ")) {
            setIsPasswordValid(false);
            return false;
        }

        setIsPasswordValid(true);
        return true;
    };

    const validateConfirmPassword = () => {
        if (confirmPassword !== password) {
            setIsConfirmPasswordValid(false);
            return false;
        }

        setIsConfirmPasswordValid(true);
        return true;
    };

    const handleSubmit = async () => {
        if (!validateUsername()) {
            return;
        }

        if (!validatePassword()) {
            return;
        }

        if (!validateConfirmPassword()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    role: "admin",
                }),
            });

            if (response.status === 401) {
                setIsUsernameExists(true);
                return;
            }

            if (!response.ok) {
                alert("Invalid username or password");
                throw new Error("Signup failed");
            }

            const { token } = await response.json();
            localStorage.setItem("token", token);

            console.log("Signup successful");
            alert("Signup successful");
            window.location.href = "/";
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <div className="flex w-full h-screen px-24 pt-24 items-center bg-blue-600 justify-center">
            <div className="flex flex-row justify-between">
                <img
                    src={signUpImage}
                    alt="Sign up"
                    className="w-1/2 object-cover"
                />
                <div className="flex flex-col w-[32rem] bg-white rounded-2xl space-y-2 px-24 py-12">
                    <div className="flex w-full justify-center">
                        <h1 className="font-montserrat text-[24px] font-bold">
                            Create an Account
                        </h1>
                    </div>
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col space-y-2">
                            <label
                                className="font-montserrat text-[14px] font-light"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="w-full transform duration-300 hover:cursor-default hover:border-blue-400 focus:outline-none font-montserrat focus:border-blue-600 border-2 text-[14px] font-light border-[#a1a1a1] p-4"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {!isUsernameValid && (
                                <p className="text-red-600 font-montserrat text-[14px] font-light">
                                    Invalid username
                                </p>
                            )}
                            {isUsernameExists && (
                                <p className="text-red-600 font-montserrat text-[14px] font-light">
                                    Username already exists
                                </p>
                            )}
                            <label
                                className="font-montserrat text-[14px] font-light"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full transform duration-300 hover:cursor-default hover:border-blue-400 focus:outline-none font-montserrat focus:border-blue-600 border-2 text-[14px] font-light border-[#a1a1a1] p-4"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!isPasswordValid && (
                                <p className="text-red-600 font-montserrat text-[14px] font-light">
                                    Password must be at least 8 characters
                                </p>
                            )}
                            <label
                                className="font-montserrat text-[14px] font-light"
                                htmlFor="password"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                className="w-full transform duration-300 hover:cursor-default hover:border-blue-400 focus:outline-none font-montserrat focus:border-blue-600 border-2 text-[14px] font-light border-[#a1a1a1] p-4"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            {!isConfirmPasswordValid && (
                                <p className="text-red-600 font-montserrat text-[14px] font-light">
                                    Passwords do not match
                                </p>
                            )}
                        </div>
                        <div className="flex justify-between space-x-8">
                            <button
                                onClick={handleSubmit}
                                className="w-full hover:scale-105 transform duration-300 bg-blue-600 text-white font-montserrat text-[14px] font-light p-4"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

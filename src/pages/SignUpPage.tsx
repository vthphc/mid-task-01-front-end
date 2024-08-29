import React from "react";

export default function SignUpPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else {
            try {
                const response = await fetch(
                    "http://localhost:5000/auth/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username,
                            password,
                            role: "admin",
                        }),
                    }
                );

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
        }
    };

    return (
        <div className="flex w-full h-screen pt-24 items-center bg-blue-600 justify-center">
            <div className="flex flex-col">
                <div className="flex flex-col w-[42rem] bg-white rounded-2xl space-y-2 px-24 py-12">
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
                                className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label
                                className="font-montserrat text-[14px] font-light"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                className="font-montserrat text-[14px] font-light"
                                htmlFor="password"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex justify-between space-x-8">
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white font-montserrat text-[14px] font-light p-4"
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

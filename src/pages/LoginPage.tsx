import React from "react";

export default function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                alert("Invalid username or password");
                throw new Error("Login failed");
            }

            const { accessToken } = await response.json();
            localStorage.setItem("token", accessToken);

            console.log("Login successful");
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex w-full h-screen pt-24 items-center bg-blue-600 justify-center">
            <div className="flex flex-col">
                <div className="flex flex-col w-[42rem] bg-white rounded-2xl space-y-2 px-24 py-12">
                    <div className="flex w-full justify-center">
                        <h1 className="font-montserrat text-[24px] font-bold">
                            Login
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
                                value={password}
                                className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between space-x-8">
                            <button
                                onClick={() =>
                                    (window.location.href = "/signup")
                                }
                                className="w-full bg-zinc-200 text-black font-montserrat text-[14px] font-light p-4"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white font-montserrat text-[14px] font-light p-4"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import SideBar from "../components/SideBar";

interface Customer {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    dateOfBirth: string;
}

export default function EditCustomer() {
    function formatDateToYYYYMMDD(dateString: string): string {
        const date = new Date(dateString);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const [newCustomer, setNewCustomer] = React.useState<Customer>({
        id: 0,
        fullName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        dateOfBirth: "",
    });

    const customerID = window.location.pathname.split("/").pop();

    React.useEffect(() => {
        fetch(`http://localhost:5000/customers/${customerID}`)
            .then((res) => res.json())
            .then((data) => {
                const adjustedDateOfBirth = new Date(data.dateOfBirth);
                adjustedDateOfBirth.setDate(adjustedDateOfBirth.getDate() + 1);

                const formattedDateOfBirth = adjustedDateOfBirth
                    .toISOString()
                    .split("T")[0];
                setNewCustomer({
                    ...data,
                    dateOfBirth: formattedDateOfBirth,
                });
            });
    }, [customerID]);

    const handleSave = async () => {
        try {
            const adjustedCustomer = {
                ...newCustomer,
                dateOfBirth: new Date(newCustomer.dateOfBirth)
                    .toISOString()
                    .split("T")[0],
            };

            const response = await fetch(
                `http://localhost:5000/customers/${customerID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(adjustedCustomer),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update customer");
            }

            alert("Customer updated successfully");
            window.location.href = "/dashboard/customers";
        } catch (error) {
            console.error("Failed to update customer:", error);
        }
    };

    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="py-8 ml-64 w-full space-y-4 px-8">
                <div className="flex items-center flex-row justify-between">
                    <h1 className="text-3xl font-bold">Update Customer</h1>
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-md"
                    >
                        Save
                    </button>
                </div>
                <div className="flex w-full px-48 flex-col space-y-2">
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="username"
                    >
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.fullName}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                fullName: e.target.value,
                            })
                        }
                    />
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="phoneNumber"
                    >
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.phoneNumber}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                phoneNumber: e.target.value,
                            })
                        }
                    />
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.email}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                email: e.target.value,
                            })
                        }
                    />
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="gender"
                    >
                        Gender
                    </label>
                    <input
                        id="dateOfBirth"
                        type="text"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.gender}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                gender: e.target.value,
                            })
                        }
                    />
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="dateOfBirth"
                    >
                        Date of Birth
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] border-[#a1a1a1] p-4"
                        required
                        value={formatDateToYYYYMMDD(newCustomer.dateOfBirth)}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                dateOfBirth: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
}

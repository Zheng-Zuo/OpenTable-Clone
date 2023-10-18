import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface Props {
    inputs: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        city: string;
        password: string;
    }
    handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
    isSignIn: boolean;
}

const AuthModalInputs = ({
    inputs,
    handleChangeInput,
    isSignIn
}: Props) => {
    return (
        <div>
            {isSignIn ? null : (
                <div className="my-3 flex justify-between text-sm">
                    <Input
                        type="text"
                        className="border rounded p-2 py-3 w-[49%]"
                        placeholder="First Name"
                        value={inputs.firstName}
                        onChange={(e) => handleChangeInput(e)}
                        name="firstName"
                    />
                    <Input
                        type="text"
                        className="border rounded p-2 py-3 w-[49%]"
                        placeholder="Last Name"
                        value={inputs.lastName}
                        onChange={(e) => handleChangeInput(e)}
                        name="lastName"
                    />
                </div>
            )}

            <div className="my-3 flex justify-between text-sm">
                <Input
                    type="text"
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={(e) => handleChangeInput(e)}
                    name="email"
                />
            </div>

            {isSignIn ? null : (
                <div className="my-3 flex justify-between text-sm">
                    <Input
                        type="text"
                        className="border rounded p-2 py-3 w-[49%]"
                        placeholder="Phone"
                        value={inputs.phone}
                        onChange={(e) => handleChangeInput(e)}
                        name="phone"
                    />
                    <Input
                        type="text"
                        className="border rounded p-2 py-3 w-[49%]"
                        placeholder="City"
                        value={inputs.city}
                        onChange={(e) => handleChangeInput(e)}
                        name="city"
                    />
                </div>
            )}

            <div className="my-3 flex justify-between text-sm">
                <Input
                    type="password"
                    className="border rounded p-2 py-3 w-full"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={(e) => handleChangeInput(e)}
                    name="password"
                />
            </div>

        </div>
    )
}

export default AuthModalInputs

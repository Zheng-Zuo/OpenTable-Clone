import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useGlobalStates } from "@/components/ContextApi/GlobalStatesProvider";

interface signInProps {
    email: string;
    password: string;
    handleClose: () => void;
}

interface signUpProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
    handleClose: () => void;
}

export default function useAuth() {
    const { setAuthState } = useGlobalStates()

    const signin = async (
        { email, password, handleClose }: signInProps
    ) => {
        setAuthState({
            loading: true,
            signInError: null,
            signUpError: null,
            data: null,
        })

        try {
            const response = await axios.post(
                '/api/auth/signin',
                { email, password }
            )
            setAuthState({
                loading: false,
                signInError: null,
                signUpError: null,
                data: response.data,
            })
            handleClose()
        } catch (error: any) {
            setAuthState({
                loading: false,
                signInError: error.response.data.errorMessage,
                signUpError: null,
                data: null,
            })
        }
    }

    const signup = async (
        { email, password, firstName, lastName, city, phone, handleClose }: signUpProps
    ) => {
        setAuthState({
            loading: true,
            signInError: null,
            signUpError: null,
            data: null,
        })

        try {
            const response = await axios.post(
                '/api/auth/signup',
                { email, password, firstName, lastName, city, phone }
            )
            setAuthState({
                loading: false,
                signInError: null,
                signUpError: null,
                data: response.data,
            })
            handleClose()
        } catch (error: any) {
            setAuthState({
                loading: false,
                signInError: null,
                signUpError: error.response.data.errorMessage,
                data: null,
            })
        }
    }

    const signout = () => {
        deleteCookie('jwt')

        setAuthState({
            loading: false,
            signInError: null,
            signUpError: null,
            data: null,
        })
    }

    return { signin, signup, signout }

}
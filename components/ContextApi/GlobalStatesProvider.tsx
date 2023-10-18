"use client"

import { Filters } from "@/lib/actions/search.actions";
import axios from "axios";
import { getCookie } from "cookies-next";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

interface AuthState {
    loading: boolean;
    signInError: string | null;
    signUpError: string | null;
    data: User | null
}

type ContextState = {
    filters: Filters;
    setFilters(value: Filters): void;

    searchText: string;
    setSearchText(value: string): void;

    shouldRedirect: boolean;
    setShouldRedirect(value: boolean): void;

    activePriceButtons: string[];
    setActivePriceButtons(value: string[]): void;

    authState: AuthState;
    setAuthState(value: AuthState): void;

    checkCookie: boolean;
    setCheckCookie(value: boolean): void;

}

export const globalStates = createContext<ContextState | null>(null)

export const GlobalStatesProvider = (props: PropsWithChildren) => {

    const [filters, setFilters] = useState<Filters>(
        { locations: [], cuisines: [], prices: [] })
    const [searchText, setSearchText] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [activePriceButtons, setActivePriceButtons] = useState<string[]>([])
    const [checkCookie, setCheckCookie] = useState(true)
    const [authState, setAuthState] = useState<AuthState>({
        loading: false,
        data: null,
        signInError: null,
        signUpError: null
    })

    const fetchUser = async () => {
        setAuthState({
            data: null,
            signInError: null,
            signUpError: null,
            loading: true,
        });
        setCheckCookie(true)
        try {
            const jwt = getCookie("jwt");

            if (!jwt) {
                setCheckCookie(false)
                return setAuthState({
                    data: null,
                    signInError: null,
                    signUpError: null,
                    loading: false,
                });
            }


            const response = await axios.get("http://localhost:3000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

            setAuthState({
                data: response.data,
                signInError: null,
                signUpError: null,
                loading: false,
            });
            setCheckCookie(false)
        } catch (error: any) {
            setCheckCookie(false)
            setAuthState({
                data: null,
                signInError: error.response.data.errorMessage,
                signUpError: null,
                loading: false,
            });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    const default_value = {
        filters,
        setFilters,
        searchText,
        setSearchText,
        shouldRedirect,
        setShouldRedirect,
        activePriceButtons,
        setActivePriceButtons,
        authState,
        setAuthState,
        checkCookie,
        setCheckCookie
    }

    return (
        <globalStates.Provider value={default_value}>
            {props.children}
        </globalStates.Provider>
    )
}

export const useGlobalStates = () => {
    const context = useContext(globalStates)
    if (!context) {
        throw new Error("Please use filter provider in the parent element")
    }
    return context
}
"use client"

import Box from '@mui/material/Box';
import { Button } from "../../components/ui/button"
import Modal from '@mui/material/Modal';
import { ChangeEvent, useEffect, useState } from 'react';
import AuthModalInputs from './AuthModalInputs';
import { useGlobalStates } from '@/components/ContextApi/GlobalStatesProvider';
import { Alert, CircularProgress } from '@mui/material';
import useAuth from '@/hooks/useAuth';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: ""
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { authState } = useGlobalStates();
    const { loading, data, signInError, signUpError } = authState;
    const { signin, signup } = useAuth()

    const renderContent = (signInContent: string, signUpContent: string) => {
        return isSignIn ? signInContent : signUpContent
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (isSignIn) {
            if (inputs.email && inputs.password) {
                return setDisabled(false)
            }
        } else {
            if (
                inputs.firstName &&
                inputs.lastName &&
                inputs.email &&
                inputs.phone &&
                inputs.city &&
                inputs.password) {
                return setDisabled(false)
            }
        }
        setDisabled(true)
    }, [inputs])

    const handleClick = () => {
        if (isSignIn) {
            signin({
                email: inputs.email,
                password: inputs.password,
                handleClose: handleClose
            })
        } else {
            signup({ ...inputs, handleClose: handleClose })
        }
    }

    return (
        <div>
            <Button
                className={`${renderContent("bg-cyan-700 text-white", "bg-white text-black hover:bg-black hover:text-white")} 
                flex-grow border p-2 rounded`}
                onClick={handleOpen}
            >
                {renderContent("Sign in", "Sign up")}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loading ? (
                        <div className='py-24 px-2 h-[600px] flex justify-center'>
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="p-2 h-[600px]">
                            {isSignIn && signInError ? (
                                <Alert severity="error" className='mb-4'>
                                    {signInError}
                                </Alert>
                            ) : null}

                            {!isSignIn && signUpError ? (
                                <Alert severity="error" className='mb-4'>
                                    {signUpError}
                                </Alert>
                            ) : null}
                            <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
                                <p className='text-sm'>
                                    {renderContent("Sign in", "Create Account")}
                                </p>
                            </div>

                            <div className='m-auto'>
                                <h2 className='text-2xl font-light text-center'>
                                    {renderContent(
                                        "Log Into Your Account",
                                        "Create Your ReserveSeat Account",
                                    )}
                                </h2>
                                <h2 className='text-sm font-light text-center'>This is a demo site, please don't use your real credentials</h2>
                                <AuthModalInputs
                                    inputs={inputs}
                                    handleChangeInput={handleChangeInput}
                                    isSignIn={isSignIn}
                                />
                                <Button
                                    className='uppercase bg-red-600 w-full text-white p-3 
                              rounded text-sm mb-5 disabled:bg-gray-400'
                                    disabled={disabled}
                                    onClick={handleClick}
                                >
                                    {renderContent("Sign In", "Create Account")}
                                </Button>
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
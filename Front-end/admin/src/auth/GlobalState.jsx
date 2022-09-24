import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers'

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const nav = useNavigate();

    const [isLogged, setIsLogged] = React.useState(false);
    const [token, setToken] = React.useState("");

    const [isAdd, setIsAdd] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [isDelete, setIsDelete] = React.useState(false);
    const [isContinue, setIsContinue] = React.useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("token");
        if (saved !== null) {
            setIsLogged(true);
            setToken(saved);
        }
        else
            nav("/", { replace: true });
    }, [isLogged])

    return (

        <GlobalState.Provider value={{
            token,
            setToken,
            isLogged,
            setIsLogged,
            isAdd,
            setIsAdd,
            isEdit,
            setIsEdit,
            isDelete,
            setIsDelete,
            isContinue,
            setIsContinue
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
            </LocalizationProvider>
        </GlobalState.Provider>

    )
}
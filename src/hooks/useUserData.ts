import { UserDataState } from "@/types";
import { USER_DATA_LOCAL_STORAGE_KEY } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function useUserData() {

    const initialUserDataState: UserDataState = {
        userId: "",
        userEmail: "",
        userName: ""
    };

    const [userDataState, setUserDataState] = useState<UserDataState>({
        ...initialUserDataState
    });

    useEffect(() => {

        // get the user data from local storage
        const userDataString = localStorage.getItem(USER_DATA_LOCAL_STORAGE_KEY);

        if (userDataString)
        {
            const userData = JSON.parse(userDataString);

            setUserDataState({
                ...userData
            });
        }
        
    }, []);

    const setUserData = (userData: UserDataState) => {

        // set the update user data to local storage as well as state
        localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(userData));

        setUserDataState({
            ...userData
        });
    };

    const clearUserData = () => {

        // remove user data from local storage and state
        localStorage.removeItem(USER_DATA_LOCAL_STORAGE_KEY);

        setUserData({
            ...initialUserDataState
        });
    };

    return { 
        userData: userDataState,
        setUserData,
        clearUserData,
    };
};
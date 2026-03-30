// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { getAccessToken } from '../lib/token';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

    useEffect(() => {
        setIsLoggedIn(!!getAccessToken());
    }, []);

    return { isLoggedIn };
};
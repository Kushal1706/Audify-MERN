import { createContext, useContext, useState} from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("audify_user")) || null
    );
    const [token, setToken] = useState(
        localStorage.getItem("audify_token") || null
    );

    function saveAuth(userData, tokenData){
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("audify_user", JSON.stringify(userData));
        localStorage.setItem("audify_token", tokenData);
    }

    function logout(){
        setUser(null);
        setToken(null);
        localStorage.removeItem("audify_user");
        localStorage.removeItem("audify_token");
    }

    return (
        <AuthContext.Provider value={{user, token, saveAuth, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}
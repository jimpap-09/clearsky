/* this component covers user authorization */
import { createContext, useContext, useState } from "react";
import {jwtDecode} from 'jwt-decode';

/*
  first we create the context that we store the user data
  and we can access those data from every other part of the app
*/
const AuthContext = createContext();

function AuthProvider({ children }) {

  /* we create user state that stores the logged in userData */
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [userData, setUserData] = useState(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if(tokenFromStorage){
      try {
        return jwtDecode(tokenFromStorage);
      } catch {
        return null;
      }
    }
    return null;
  });

  /* if a user has logged in then user = userData */
  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);  // Αποθήκευση εδώ
    const decoded = jwtDecode(token);
    console.log(`AuthContext has stored token: ${token}`);
    setUserData(decoded);
    console.log(`User Data is: ${decoded}`);
  }

  /* if no one is logged in then user = null */
  const logout = () => {
  setToken('');
  setUserData(null);
  localStorage.removeItem('token');
  };

  /* we return json with user, login, logout */
  return (
    <AuthContext.Provider value={{ token, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/* export AuthProvider to cover the app with it */
export { AuthProvider };

/*
  we use useAuth to write
  const {user, login, logout } = useAuth();
  instead of writing every time
  const {user, login, logout } = useContext(AuthContext);
*/
export default function useAuth() {
  return useContext(AuthContext)
}
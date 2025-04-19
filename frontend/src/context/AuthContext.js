/* this component covers user authorization */

import { createContext, useContext, useState } from "react";
/*
  first we create the context that we store the user data
  and we can access those data from every other part of the app
*/
const AuthContext = createContext();


function AuthProvider({ children }) {

  /* we create user state that stores the logged in userData */
  const [user, setUser] = useState(null)

  /* if a user has logged in then user = userData */
  const login = (userData) => {
    setUser(userData)
  }

  /* if no one is logged in then user = null */
  const logout = () => {
    setUser(null)
  }

  /* we return json with user, login, logout */
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
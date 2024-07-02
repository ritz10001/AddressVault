import react, {createContext, useState} from 'react';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
  
    return (
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    );
  };
import React, { createContext, useState, ReactNode } from 'react';

type UserContextType = {
  userId: string | null;
  username: string | null;
  setUserId: (id: string | null) => void;
  setUsername: (name: string | null) => void;
};

export const UserContext = createContext<UserContextType>({
  userId: null,
  username: null,
  setUserId: () => {},
  setUsername: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, username, setUserId, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useContext, useState } from "react";


export type AuthContext = ReturnType<
 typeof useAuthContext
>;
const AuthContext = createContext<AuthContext>(
 {} as AuthContext,
);

type Props = {
 children: React.ReactNode
}
export const AuthConfigurationContextProvider = ({ children }: Props) => {
 const authConfigurationContext = useAuthContext()
 return (
  <AuthContext.Provider value={authConfigurationContext}>
   {children}
  </AuthContext.Provider>
 );
};

export const useAuthConfigurationContext = () =>
 useContext(AuthContext);

const useAuthContext = () => {
 const [visible, setVisible] = useState<boolean>(false);
 const [visiblePage, setVisiblePage] = useState<boolean>(false);

 return {
  visible,
  setVisible,
  visiblePage,
  setVisiblePage
 }
}
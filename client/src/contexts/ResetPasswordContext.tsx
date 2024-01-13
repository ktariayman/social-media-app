import { createContext, useContext, useState } from "react";


export type ResetPasswordContext = ReturnType<
 typeof usePasswordState
>;
const ResetPasswordContext = createContext<ResetPasswordContext>(
 {} as ResetPasswordContext,
);

type Props = {
 children: React.ReactNode
}
export const ResetPassConfigurationContextProvider = ({ children }: Props) => {
 const resetPassConfigurationContext = usePasswordState()
 return (
  <ResetPasswordContext.Provider value={resetPassConfigurationContext}>
   {children}
  </ResetPasswordContext.Provider>
 );
};

export const useResetPassConfigurationContext = () =>
 useContext(ResetPasswordContext);


export const usePasswordState = () => {
 const visiblePages = {
  search: 0,
  sendEmail: 1,
  code: 2,
  changePass: 3,
 } as const;

 type TypeOfVisiblePages = typeof visiblePages[keyof typeof visiblePages];
 const [visible, setVisible] = useState<TypeOfVisiblePages>(visiblePages.search);
 const [loading, setLoading] = useState(false);
 const [email, setEmail] = useState<any>();
 const [code, setCode] = useState('');
 const [password, setPassword] = useState('');
 const [conf_password, setConf_password] = useState('');
 const [error, setError] = useState('');
 const [userInfos, setUserInfos] = useState<any>();

 return {
  visible,
  setVisible,
  loading,
  setLoading,
  email,
  setEmail,
  code,
  setCode,
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  setError,
  userInfos,
  setUserInfos,
  visiblePages
 };
};


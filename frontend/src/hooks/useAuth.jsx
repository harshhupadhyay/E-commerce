import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


//now I don't need to write everyhwhere const auth = useContext(AuthContext);
export const useAuth =()=>{
  return useContext(AuthContext)
}

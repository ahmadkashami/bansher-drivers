import { create } from 'zustand'
import { devtools, persist} from "zustand/middleware";
import {UserDto} from "../dtos/UserDto";
import AsyncStorage from "@react-native-async-storage/async-storage";


const userInitial = new UserDto({
    _id: '',
    status:false,
    name:'',
    email:'',
    licenseExpiredAt:'',
    createdAt:'',
    phoneNum:'',
    branchId:'',
    companyId:'',
    vehicleId:'',
});

interface State {
    authToken: string,
    isAuthenticated: boolean,
    user: UserDto,
    setAuthToken:(token:string)=>void
    setUser:(user:UserDto)=>void
    logout:()=>void
}




const useAppStore = create<State>((set,get) => ({
    authToken: '',
    isAuthenticated: false,
    user: userInitial,
    setAuthToken: (value:string)=>set(()=>({authToken:value,isAuthenticated:true})),
    setUser: (user: UserDto) =>set(()=>({user:user})) ,
    logout: () => {
        console.log("hi")
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
        set(()=>({authToken:'',isAuthenticated:false}))
    },
}))


export default useAppStore;


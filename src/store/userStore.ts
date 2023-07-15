import { create } from 'zustand'
import { devtools, persist} from "zustand/middleware";
import {UserDto} from "../dtos/UserDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TruckDto} from "../dtos/TruckDto";


const userInitial = new UserDto({
    id: 0,
    name: "",
    company_id: 0,
    email: "",
    phone: "",
    truck: {
        id: 0,
        active: false,
        status: false,
        company_id: 0,
        fieldwork: "",
        lang: 0,
        lat: 0,
        user_id: 0,
    },
});

interface State {
    authToken: string,
    isAuthenticated: boolean,
    user: UserDto,
    setAuthToken:(token:string)=>void
    setUser:(user:UserDto)=>void
    logout:()=>void
    truck: TruckDto
    updateTruck: (truck: TruckDto) => void
}


const truckInitState: TruckDto = {
    id: 0,
    active: false,
    status: false,
    company_id: 0,
    fieldwork: "",
    location: {
        lat: 0,
        long: 0,
    },
    user_id: 0,
};



const store = create<State>((set,get) => ({
    authToken: '',
    isAuthenticated: false,
    user: userInitial,
    truck:truckInitState,
    setAuthToken: (value:string)=>set(()=>({authToken:value,isAuthenticated:true})),
    setUser: (user: UserDto) =>set(()=>({user:user})) ,
    logout: () => {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
        set(()=>({authToken:'',isAuthenticated:false}))
    },
    updateTruck:(truck:TruckDto)=>set(()=>({truck:truck}))

}))


const useStore = create(
    devtools(
        persist(store, {
            name: "user",
        })
    )
)


export default useStore;


import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware";
import { UserDto } from "../dtos/UserDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VehicleDto } from "../dtos/VehicleDto";
import { updateVehicleLink } from '../api/AuthApi';


const userInitial = new UserDto({
    _id: '',
    status: '',
    name: '',
    email: '',
    licenseExpiredAt: '',
    createdAt: '',
    phoneNum: '',
    branchId: '',
    companyId: '',
    vehicleId: '',
    photo: require("../contants/images/profile.png"),
});


const vehicleInitial = new VehicleDto({
    _id: '',
    drivers: [],
    services: [],
    currentDriver: '',
    branchId: '',
    companyId: '',
    status: '',
    workStatus: '',
    lastActiveDate: '',
    appCode: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    id: '',
});


interface State {
    authToken: string,
    isAuthenticated: boolean,
    user: UserDto,
    setAuthToken: (token: string) => void
    setUser: (user: UserDto) => void
    logout: () => void,
    vehicle: VehicleDto,
    setVehicle: (vehicle: VehicleDto) => void
}


const useAppStore = create<State>((set, get) => ({
    authToken: '',
    isAuthenticated: false,
    user: userInitial,
    vehicle: vehicleInitial,
    setAuthToken: (value: string) => set(() => ({ authToken: value, isAuthenticated: true })),
    setUser: (user: UserDto) => set(() => ({ user: user })),
    setVehicle: (vehicle: VehicleDto) => set(() => ({ vehicle: vehicle })),
    logout: async () => {
        await updateVehicleLink()
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("vehicle");
        set(() => ({ authToken: '', isAuthenticated: false }))
    },
}))


export default useAppStore;


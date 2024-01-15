import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVehicle } from "../api/vehiclesApi";
import { showMessage } from "react-native-flash-message";
import { ErrorHandlerApi } from "../helpers/AppHelpers";



export async function CallDriverVehicle(stateApp) {
    try {

        const response = await getVehicle()
        const vehicle = response.data.data
        stateApp.setVehicle(vehicle)
        AsyncStorage.setItem("vehicle", JSON.stringify(vehicle));
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = ErrorHandlerApi(error);
            showMessage({
                message: "Error Message",
                description: errorMessage,
                type: "danger",
            });
        } else {
            showMessage({
                message: "Error Message",
                description: error.message,
                type: "danger",
            });
        }
    }

}
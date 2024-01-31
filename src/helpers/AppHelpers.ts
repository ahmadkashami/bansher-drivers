import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export function ErrorHandlerApi(e: any) {

  const errors: string[] = [];
  const errorResponse = e.response.data;

  if (errorResponse.errors && errorResponse.errors.lenght > 0) {
    for (const [key, value] of Object.entries(errorResponse.errors)) {
      errors.push(value as string);
    }
    return;
  }

  if (errorResponse.error) {
    const values = Object.values(errorResponse.error);
    values.map((val) => {
      Array.isArray(val) ? errors.push(val[0]) : errors.push(val as string);
    });
  }
  return errors.join(" ");
}

export function errorMessageToast(title: string, message: string = "",) {
  console.log(message);

  Toast.show({
    text1: title,
    text2: message,
    text2Style: { textAlign: "right" },
    type: "error"
  })
}
export function successMessageToast(title: string, message: string = "",) {
  Toast.show({
    text1: title,
    text2: message,
    autoHide: true,
    type: "success"
  })
}

export function TrimPhoneExt(phone: string) {
  return phone.slice(3);
}
export function fixNumber(number: number, numOfFix: number = 3) {
  return number.toFixed(numOfFix)
}

export function wait(timeout: number) {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

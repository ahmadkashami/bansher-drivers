import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
  useBackgroundPermissions,
} from "expo-location";
import { Alert } from "react-native";

function UseCurrntLocation() {
  const [fgstatus, fgrequestPermission] = useBackgroundPermissions();
  async function verfyPermission() {
    if (fgstatus?.status === PermissionStatus.UNDETERMINED) {
      const status = await fgrequestPermission();
      return status.granted;
    }
    if (fgstatus?.status === PermissionStatus.DENIED) {
      Alert.alert("permission should be granted why sss");
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const isGranted = await verfyPermission();
    console.log({ isGranted });

    if (!isGranted) {
      return;
    }

    const currentLocation = await getCurrentPositionAsync();
    console.log(currentLocation);
  }
  getLocationHandler();

  return "";
}

export default UseCurrntLocation;

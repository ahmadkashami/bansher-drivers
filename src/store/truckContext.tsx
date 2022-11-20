import { useMemo } from "react";
import { createContext, ReactNode, useState } from "react";
import { TruckDto } from "../Dtos/user.dto";

const truckInitalState: TruckDto = {
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
export const TruckContext = createContext({
  truck: truckInitalState,
  updateTruck: (truck: TruckDto) => {},
});

export const TruckProvider = ({ children }: { children: ReactNode }) => {
  const [truck, setTruck] = useState<TruckDto | null>(null);

  function updateTruck(truck: TruckDto) {
    setTruck(truck);
  }
  const value = useMemo(() => ({ truck, updateTruck }), [truck, updateTruck]);

  return (
    <TruckContext.Provider value={value}>{children}</TruckContext.Provider>
  );
};

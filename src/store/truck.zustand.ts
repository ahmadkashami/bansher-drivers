import create from "zustand";
import { TruckDto } from "../Dtos/user.dto";

export const useTruckStore = create((set) => ({
  truck: null,
  updateTruck: (truck: TruckDto) => set((state) => ({ truck: truck })),
  removeTruck: () => set({ truck: null }),
}));

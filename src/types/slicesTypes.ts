/* eslint-disable @typescript-eslint/no-explicit-any */
import { customer_info } from "../store/slices/CustomerSlice";
import { local_DB } from "../store/slices/ServicesSlice";

export interface SuperbaseState {
  data: any;
  error: string | null;
  isLoading: boolean;
  onDelete: boolean;
  onUpdate: boolean;
}

export type Services = {
  cycle_time: number;
  description: string;
  price: number;
  service_name: string;
  vehicle_size: string;
};

export type local_DB = {
  local_DB: ReturnType<typeof local_DB>;
};

export type customer_info = {
  customer_info: ReturnType<typeof customer_info>;
};

export type add_info = {
  customer_name: string | undefined;
  address: string | undefined;
  contact_primary: number | undefined;
  contact_secondary: number | undefined;
  vehicle_id: number | undefined;
  loyalty_sticker: boolean | undefined;
  customer_id: number | undefined;
};

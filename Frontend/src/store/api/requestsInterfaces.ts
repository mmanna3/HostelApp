export interface ISliceHttpGetInfo {
  nombreDelSlice: string;
  endpoint: string;
  params?: {
    [key: string]: string;
  };
}

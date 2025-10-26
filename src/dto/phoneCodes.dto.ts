export interface IPhoneCodesSuccessResponse {
  data: {
    id: number;
    code: string;
    alpha_2_code: string;
  }[];
  message: string;
}

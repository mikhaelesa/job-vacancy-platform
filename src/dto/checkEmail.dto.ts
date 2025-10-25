export interface ICheckEmailRequestBody {
  email: string;
}

export interface ICheckEmailSuccessResponse {
  exists: boolean;
  confirmed: boolean;
}

export interface ICheckEmailErrorResponse {
  message: string;
}

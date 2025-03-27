export interface ErrorResponse {
  errors?: {
    [key: string]: string[] | undefined;
    google_id?: string[];
    google_token?: string[];
  };
  message?: string;
}

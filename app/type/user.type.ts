import { PaginationRequest } from "./pagination";

export interface SearchUserRequest extends PaginationRequest {
  username?: string;
  email?: string;
  role?: string;
}

export interface List<T = any> {
  result: T[];
  total: number;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignInResult {
  token: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  id: string;
  pid: string;
  name: string;
  path: string;
  type: string;
}

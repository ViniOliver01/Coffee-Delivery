export const TOKEN_KEY = "@coffee-delivery-token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

interface IResponseToken {
  token: string;
  refresh_token: string;
  user: {
    name: string;
    email: string;
  };
}
export function getToken() {
  const data = localStorage.getItem(TOKEN_KEY);
  if (data) {
    return JSON.parse(data) as IResponseToken;
  }
}

export const login = ({ user, refresh_token, token }: IResponseToken) => {
  const data = {
    user,
    refresh_token,
    token,
  };

  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};

export const refreshToken = (refresh_token: string, token: string) => {
  const data = getToken();

  if (data) {
    data.refresh_token = refresh_token;
    data.token = token;
  }

  localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

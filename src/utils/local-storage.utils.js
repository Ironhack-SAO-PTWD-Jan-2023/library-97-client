export function saveToken(token) {
  localStorage.setItem('token', token);
}

export const retrieveToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
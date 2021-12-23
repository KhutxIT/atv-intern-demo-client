const user = JSON.parse(localStorage.getItem("user"));
const authHeader = user && user.accessToken ? { 'x-access-token': user.accessToken } : {};

export default authHeader;
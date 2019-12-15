const API_BASE_URL = 'http://llamas.kunnect.co/kunnect'

/* User Endpoints */

export const changePasswordAPI = () => `${API_BASE_URL}/user/changePassword`;

export const createUserAPI = () => `${API_BASE_URL}/user`;

export const forgotPasswordAPI = () => `${API_BASE_URL}/user/forgotPassword`;

export const getUserDataAPI = () => `${API_BASE_URL}/user`;

export const loginAPI = () => `${API_BASE_URL}/login`;

export const verifyMailAPI = () => `${API_BASE_URL}/user/verify`;

/* Kuluster Endpoints */

export const createKulusterAPI = () => `${API_BASE_URL}/kuluster`;

export const getKulusterInfoAPI = kulusterName => `${API_BASE_URL}/kuluster/${kulusterName}`;

export const getKulusterListAPI = () => `${API_BASE_URL}/kuluster`;

/* Feed Endpoints */

export const getFeedAPI = () => `${API_BASE_URL}/user/feed`;

/* Post Endpoints */

export const createPostAPI = () => `${API_BASE_URL}/post`;

export const getPostInfoAPI = postID => `${API_BASE_URL}/post/${postID}`;

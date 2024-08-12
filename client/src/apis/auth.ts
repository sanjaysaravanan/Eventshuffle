import { handleApi } from "./utils";

// Login a User
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return await handleApi(
    "auth/login",
    {
      method: "POST",
    },
    payload
  );
};

export const registerUser = async (payload: {
  email: string;
  password: string;
}) => {
  return await handleApi(
    "auth/register",
    {
      method: "POST",
    },
    payload
  );
};

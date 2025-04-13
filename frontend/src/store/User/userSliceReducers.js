import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};

//function for registeration of user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      const { data } = await axios.post(
        "/api/v1/users/register",
        userData,
        config
      );
      //   console.log(data?.data);

      return data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message || "Registration failed"
      );
    }
  }
);

//For user verification
export const verifyUser = createAsyncThunk(
  "user/verification",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      /*making api call with axios for sending user data and picking response from backend */
      const { data } = await axios.post(
        "/api/v1/users/opt-verification",
        userData,
        config
      );

      //   console.log(data);
      return data; //returning fetched data
    } catch (error) {
      // console.log(error.response?.data || error.message);
      return (
        rejectWithValue(error.response?.data || error.message) ||
        "Registration failed"
      );
    }
  }
);

//For login
export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      const { data } = await axios.post(
        "/api/v1/users/login",
        userData,
        config
      );
      // console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message || "Login failed"
      );
    }
  }
);

//For logout
export const userLogOut = createAsyncThunk("user/logOut", async () => {
  // console.log(userData);

  try {
    const { data } = await axios.get("/api/v1/users/logout");
    // console.log(data?.data);
    // console.log(response);

    return data?.data;
  } catch (error) {
    return error.response.data?.message || error.message || "LogOut failed";
  }
});

//For fetching userdetails
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/me"); // secure route to get current user
      // console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || error.message || "Could not load user"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/users/me/profile/update",
        userData,
        config
      );

      // console.log(data);

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(
        error.response?.data || error.message || "Update failed"
      );
    }
  }
);

//for update password
export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/users/me/password/update",
        userData,
        config
      );

      console.log(data);

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(
        error.response?.data || error.message || "Update password failed"
      );
    }
  }
);

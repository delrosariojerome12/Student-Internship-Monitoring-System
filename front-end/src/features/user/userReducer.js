/** @format */

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {
  timeOutAttendance,
  checkStartingDate,
} from "../interns/attendanceReducer";
import {enrollInternship, unEnrollInternship} from "../coordinator/internship";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // signOut
} from "firebase/auth";
import axios from "axios";
import {auth} from "../../Firebase";
import {sendDocument, removeDocument} from "../interns/documentsReducer";

const initialState = {
  pendingUser: null,
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  createdSuccessful: false,
  createdUser: null,
  isVerifyModalOpen: false,
  isVerifyError: false,
  visitorEmail: null,
  isVerifyLoading: false,
  isVerifyError: false,
  isForgotModalOpen: false,
  resetErrorMessage: "",
  isLoadingReset: false,
  isSuccessResetSent: false,
  isResetError: false,
  isCodeVerified: false,
  isPasswordChangeSuccess: false,
};

const convertForm = (form) => {
  const newData = form.map((input) => {
    const {code, value} = input;
    return {
      code,
      value,
    };
  });

  const newObject = Object.assign(
    {},
    ...newData.map((item) => ({[item.code]: item.value}))
  );

  return newObject;
};

export const handleCreateUser = createAsyncThunk(
  "/user/createUser",
  async ({form}, {rejectWithValue}) => {
    try {
      const url = "https://sims-twqb.onrender.com/auth/createUser";
      // const url = "http://localhost:5000/auth/createUser";
      const {data: res} = await axios.post(url, convertForm(form));
      return {res};
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const handleSignup = createAsyncThunk(
  "/user/signUser",
  async (form, {rejectWithValue}) => {
    try {
      const {email, firstName, lastName, password} = convertForm(form);
      const url = "https://sims-twqb.onrender.com/auth/signup";
      // const url = "http://localhost:5000/auth/signup";
      // const user = await createUserWithEmailAndPassword(auth, email, password);
      const {data: res} = await axios.post(url, convertForm(form));
      return {res};
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "/user/logUser",
  async (form, {rejectWithValue}) => {
    try {
      const {email, firstName, lastName, password} = convertForm(form);
      // const user = signInWithEmailAndPassword(auth, email, password);
      const url = "https://sims-twqb.onrender.com/auth/login";
      // const url = "http://localhost:5000/auth/login";
      const {data: res} = await axios.post(url, convertForm(form));
      return {res};
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserOnLoad = createAsyncThunk(
  "/user/getUserOnLoad",
  async (email, {rejectWithValue}) => {
    try {
      const url = `https://sims-twqb.onrender.com/user/getUser/${email}`;
      const {data: res} = await axios.get(url);
      return {res: res.user};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const requestVerification = createAsyncThunk(
  "/user/requestVerify",
  async (form, {rejectWithValue}) => {
    console.log(form);
    try {
      const url = `https://sims-twqb.onrender.com/intern/requestVerify`;
      const {data: res} = await axios.patch(url, form);
      return {res: res.user};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/user/forgotPassword",
  async ({email}, {rejectWithValue}) => {
    console.log(email);
    try {
      // const url = `http://localhost:5000/auth/forgotPassword`;
      const url = `https://sims-twqb.onrender.com/auth/forgotPassword`;
      const {data: res} = await axios.post(url, {email});
      // console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "/user/verifyCode",
  async ({email, code, pendingUser}, {rejectWithValue}) => {
    console.log(email, code, pendingUser);
    try {
      // const url = `http://localhost:5000/auth/verify`;
      const url = `https://sims-twqb.onrender.com/auth/verify`;
      const {data: res} = await axios.post(url, {
        email,
        code,
        pendingUser,
        usage: "signup",
      });
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  "/user/verifyResetCode",
  async ({email, code}, {rejectWithValue}) => {
    console.log(email, code);
    try {
      // const url = `http://localhost:5000/auth/verify`;
      const url = `https://sims-twqb.onrender.com/auth/verify`;
      const {data: res} = await axios.post(url, {email, code, usage: "reset"});
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/user/resetPassword",
  async ({email, password}, {rejectWithValue}) => {
    console.log(email, password);
    try {
      const url = `https://sims-twqb.onrender.com/auth/resetPassword`;
      // const url = `http://localhost:5000/auth/resetPassword`;
      const {data: res} = await axios.patch(url, {email, password});
      console.log(res);
      return {res};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    handlePendingUser: (state, action) => {
      console.log(action.payload);
      state.pendingUser = action.payload;
    },
    handleClosePasswordChanged: (state, action) => {
      state.isPasswordChangeSuccess = false;
    },
    handleForgetModal: (state, action) => {
      state.isForgotModalOpen = !state.isForgotModalOpen;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    handleLogout: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    handleCloseSuccess: (state, action) => {
      state.createdSuccessful = !state.createdSuccessful;
      state.createdUser = null;
    },
    handleCloseError: (state, action) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    // reset password
    builder
      .addCase(resetPassword.pending, (state, action) => {})
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isCodeVerified = false;
        state.isPasswordChangeSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {});
    // verify reset code
    builder
      .addCase(verifyResetCode.pending, (state, action) => {
        state.isVerifyLoading = true;
        state.isVerifyError = false;
      })
      .addCase(verifyResetCode.fulfilled, (state, action) => {
        console.log(action.payload.res.success);
        state.isVerifyLoading = false;
        state.isVerifyError = false;
        state.isCodeVerified = action.payload.res.success;
        state.isForgotModalOpen = false;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.isVerifyLoading = false;
        state.isVerifyError = true;
      });
    // forgot password
    builder
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoadingReset = true;
        state.isResetError = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoadingReset = false;
        state.isSuccessResetSent = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoadingReset = false;
        state.resetErrorMessage = action.payload.msg;
        state.isResetError = true;
      });
    // signup
    builder
      .addCase(handleSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        const {res} = action.payload;
        console.log(res);
        state.isLoading = false;
        state.isError = false;
        state.isVerifyModalOpen = true;
        state.visitorEmail = res.user.email;
        // state.user = res.user;
        // localStorage.setItem("token", res.token);
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });
    // verify code
    builder
      .addCase(verifyCode.pending, (state, action) => {
        state.isVerifyLoading = true;
        state.isVerifyError = false;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        const {res} = action.payload;

        state.isVerifyLoading = false;
        state.isVerifyError = false;
        state.isVerifyModalOpen = false;
        console.log(res);
        state.user = res.user;
        localStorage.setItem("token", res.token);
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isVerifyLoading = false;
        state.isVerifyError = true;
      });

    //create user
    builder
      .addCase(handleCreateUser.pending, (state, action) => {
        state.isLoading = true;
        state.createdSuccessful = false;
      })
      .addCase(handleCreateUser.fulfilled, (state, action) => {
        console.log(action.payload.user);
        state.isLoading = false;
        state.createdSuccessful = true;
        // state.createdUser
      })
      .addCase(handleCreateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });

    // enroll
    builder
      .addCase(enrollInternship.pending, (state, action) => {})
      .addCase(enrollInternship.fulfilled, (state, {payload: {res}}) => {
        const {enrolledIntern} = res.data;
        console.log(enrolledIntern);
        state.user = enrolledIntern;
      })
      .addCase(enrollInternship.rejected, (state, action) => {});
    // unenroll
    builder
      .addCase(unEnrollInternship.pending, (state, action) => {})
      .addCase(unEnrollInternship.fulfilled, (state, {payload: {res}}) => {
        const {enrolledIntern} = res.data;
        console.log(enrolledIntern);
        state.user = enrolledIntern;
      })
      .addCase(unEnrollInternship.rejected, (state, action) => {});
    // login
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        const {res} = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.user = res.user;
        console.log(res.user);
        localStorage.setItem("token", res.token);
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });

    // get user onload
    builder
      .addCase(getUserOnLoad.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserOnLoad.fulfilled, (state, action) => {
        const {res} = action.payload;

        console.log(res);
        state.isLoading = false;
        state.user = res;
      })
      .addCase(getUserOnLoad.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });
    // verification
    builder
      .addCase(requestVerification.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestVerification.fulfilled, (state, action) => {
        const {res} = action.payload;
        state.isLoading = false;
        state.user = res;
      })
      .addCase(requestVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.msg;
      });
    // update total hours
    builder
      .addCase(timeOutAttendance.pending, (state, action) => {})
      .addCase(timeOutAttendance.fulfilled, (state, {payload}) => {
        // console.log(payload.res.updatedIntern);
        state.user = payload.res.updatedIntern;
      })
      .addCase(timeOutAttendance.rejected, (state, action) => {});
    // update user for starting date
    builder
      .addCase(checkStartingDate.pending, (state, action) => {})
      .addCase(checkStartingDate.fulfilled, (state, {payload}) => {
        console.log(payload.res);

        if (!payload.res) {
          state.user = payload.res.data;
        }
      })
      .addCase(checkStartingDate.rejected, (state, action) => {});

    // update user documents
    builder
      .addCase(sendDocument.pending, (state, action) => {})
      .addCase(sendDocument.fulfilled, (state, {payload}) => {
        state.user = payload.intern;
      })
      .addCase(sendDocument.rejected, (state, action) => {});
    builder
      .addCase(removeDocument.pending, (state, action) => {})
      .addCase(removeDocument.fulfilled, (state, {payload}) => {
        state.user = payload.intern;
      })
      .addCase(removeDocument.rejected, (state, action) => {});
  },
});

export const {
  setUser,
  handleLogout,
  handleCloseSuccess,
  handleCloseError,
  handleForgetModal,
  handleClosePasswordChanged,
  handlePendingUser,
} = userReducer.actions;

export default userReducer.reducer;

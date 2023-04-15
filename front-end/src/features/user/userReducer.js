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
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
  createdSuccessful: false,
  createdUser: null,
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
      const url = "https://sims-twqb.onrender.com/auth/signup";
      // const url = "http://localhost:5000/auth/signup";
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
      // const url = "https://sims-twqb.onrender.com/auth/login";
      const url = "http://localhost:5000/auth/login";
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
      console.log(res);
      return {res: res.user};
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
    // signup
    builder
      .addCase(handleSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        const {res} = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.user = res.user;
        localStorage.setItem("token", res.token);
      })
      .addCase(handleSignup.rejected, (state, action) => {
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

export const {setUser, handleLogout, handleCloseSuccess, handleCloseError} =
  userReducer.actions;

export default userReducer.reducer;

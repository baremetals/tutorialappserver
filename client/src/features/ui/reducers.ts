import { createSlice, PayloadAction } from "@reduxjs/toolkit";


 type uiState = {
     loading: boolean;
     error: string;
     success: string;

 }
const initialState: uiState = {
  loading: false,
  error: "",
  success: "",
};

const uiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setError: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        success: action.payload,
      };
    },
  },
});

export const { setLoading, setError, setSuccess } =
  uiSlice.actions;

export default uiSlice.reducer;

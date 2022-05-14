import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiPost,
  apiGetAuthenticated,
  apiPostAuthenticated,
  apiPutAuthenticated,
  apiPostAuthenticatedNote,
} from "../apiService";

export const signInUser = createAsyncThunk(
  "app/userSignin",
  async (payload, { rejectWithValue }) => {
    const response = await apiPost("/auth/login/", payload);

    if (response.status === 200 || 201) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const getNewToken = createAsyncThunk(
  "app/userNewToken",
  async (payload, { rejectWithValue }) => {
    const response = await apiPostAuthenticated("/auth/refresh-token", payload);

    if (response.status === 200 || 201) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const getCalls = createAsyncThunk(
  "app/userGetCalls",
  async (payload, { rejectWithValue }) => {
    const response = await apiGetAuthenticated(
      `/calls?offset=${payload.offset}&limit=${payload.limit}`,
      payload
    );

    if (response.status === 200 || 201) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const getMe = createAsyncThunk(
  "app/userGetMe",
  async (payload, { rejectWithValue }) => {
    const response = await apiGetAuthenticated("/me", payload);

    if (response.status === 200 || 201) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const archiveCall = createAsyncThunk(
  "app/userArchiveCall",
  async (payload, { rejectWithValue }) => {
    const response = await apiPutAuthenticated(
      `/calls/${payload.id}/archive`,
      payload
    );

    if (response.status === 200 || 201) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const getCallById = createAsyncThunk(
  "app/userGetCallById",
  async (payload, { rejectWithValue }) => {
    const response = await apiGetAuthenticated(`/calls/${payload.id}`, payload);

    if (response.status === 200 || 201) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

export const addNote = createAsyncThunk(
  "app/useraddNote",
  async (payload, { rejectWithValue }) => {
    const response = await apiPostAuthenticatedNote(
      `/calls/${payload.id}/note`,
      payload.content
    );

    if (response.status === 200 || 201) return await response.json();
    else return rejectWithValue(await response.json());
  }
);

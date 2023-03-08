import { ResponseError } from './../../model/ResponseError';
import { RootState } from './../../app/store';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { IpTracker } from '../../model/ip-tracker';
import { LoadingState } from '../../model/LoadingState';

const axiosInstance = axios.create({
  baseURL: 'https://geo.ipify.org/api/v2',
  params: {
    apiKey: process.env.REACT_APP_API_KEY,
  },
});

export const ipTrackerAdapter = createEntityAdapter<IpTracker>({
  selectId: (tracker) => tracker.ip,
});

const initialState = ipTrackerAdapter.getInitialState({
  status: LoadingState.IDLE,
});

export const fetchIPDetail = createAsyncThunk<
  IpTracker | null,
  string | undefined,
  {
    rejectValue: ResponseError;
  }
>('ipTracker', async (ipParam, thunkApi) => {
  if (!ipParam)
    return thunkApi.rejectWithValue({
      code: 501,
      messages: 'IP Address or Domain not found!',
    });

  let params = {};
  // regex to match IP
  if (
    ipParam.match(/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/g)
  ) {
    params = { ipAddress: ipParam };
  } else {
    params = { domain: ipParam };
  }

  const response = await axiosInstance
    .get<IpTracker | ResponseError>('/country,city', {
      params,
    })
    .catch((error) => {
      return error.response;
    });
  if (
    (response.data as ResponseError).code === 422 ||
    (response.data as ResponseError).code === 400 ||
    (response.data as ResponseError).code === 403 ||
    (response.data as ResponseError).code === 500
  ) {
    return thunkApi.rejectWithValue(response.data as ResponseError);
  }
  return response.data as IpTracker;
});

const ipTrackerSlice = createSlice({
  name: 'iptrackers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIPDetail.pending, (state) => {
        state.status = LoadingState.LOADING;
      })
      .addCase(fetchIPDetail.fulfilled, (state, action) => {
        state.status = LoadingState.SUCCESS;
        if (action.payload)
          return ipTrackerAdapter.upsertOne(state, action.payload);
      });
  },
});

const getIpTracker = (state: RootState) => state.ipTrackers;

const getStatus = (state: RootState) => state.ipTrackers.status;

export const {
  selectAll: selectAllIpTracker,
  selectById: selectIpTrackerById,
} = ipTrackerAdapter.getSelectors(getIpTracker);

export default ipTrackerSlice.reducer;

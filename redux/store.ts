import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabaseClient } from '../config/supabase';

export interface UserState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchLatestUser = createAsyncThunk(
    'user/fetchLatestUser',
    async () => {
        const { data, error } = await supabaseClient.auth.getUser();
        if (error) {
            throw new Error('Failed to fetch user data');
        }
        if (data?.user?.id) {
            return data?.user?.user_metadata;
        }
        return null;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        clearUser(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLatestUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchLatestUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        });
        builder.addCase(fetchLatestUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch user data';
        });
    },
});

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export default store;
export const { setUser, setLoading, setError, clearUser } = userSlice.actions;
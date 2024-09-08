import { createSlice } from '@reduxjs/toolkit';

const confirmSlice = createSlice({
  name: 'confirm',
  initialState: { show: false, text: "", func: null},
  reducers: {
    cancelAction: state => {
        state.show = false;
        state.text = '';
        state.func = null
    },
    openModal: (state, action) => {
        state.show = true;
        state.text = action.payload?.text;
        state.func = action.payload?.func
    },
    confirmAction: (state) => {
        if (typeof state?.func === "function")
            state.func();
        
        confirmSlice.caseReducers.cancelAction(state);
    },
  },
});

export const { cancelAction, openModal, confirmAction } = confirmSlice.actions;
export default confirmSlice.reducer;
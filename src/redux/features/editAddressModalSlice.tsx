import { createSlice } from "@reduxjs/toolkit";

// interface EditAddressModalState {
//   isModalOpen: boolean;
// }

// const initialState: EditAddressModalState = {
//   isModalOpen: false,
// };
const editAddressModalSlice = createSlice({
  name: "editAddressModal",
  initialState: {
    isModalOpen: false,
    type: null, // Store modal type
  },
  reducers: {
    toggleEditAddressModalOpen: (state, action) => {
      state.isModalOpen = true;
      state.type = action.payload; // Store the passed type (e.g., "sender")
    },
    toggleEditAddressModalClose: (state) => {
      state.isModalOpen = false;
      state.type = null; // Reset type when closing
    },
  },
});

export const { toggleEditAddressModalOpen, toggleEditAddressModalClose } =
  editAddressModalSlice.actions;
export default editAddressModalSlice.reducer;

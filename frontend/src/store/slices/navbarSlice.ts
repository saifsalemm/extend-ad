import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
  showNavMenu: boolean;
}

const initialState: NavbarState = {
  showNavMenu: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setShowNav: (state) => {
      state.showNavMenu = !state.showNavMenu;
    },
  },
});

export const { setShowNav } = navbarSlice.actions;
export default navbarSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sortByKey } from "utils/sort";

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async (thunkAPI) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASEURL}/task_templates`
    );

    return response.data;
  }
);

const templatesSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    filteredTemplates: [],
    loading: false,
    error: false,
  },
  reducers: {
    filterTemplatesByCategory: (state, { payload }) => {
      if (payload === "All") {
        return {
          ...state,
          filteredTemplates: state.templates,
        };
      } else {
        let filtered = state.templates.filter((item) =>
          item.category.includes(payload)
        );
        return {
          ...state,
          filteredTemplates: filtered,
        };
      }
    },
    findTemplateByName: (state, { payload }) => {
      let template = state.templates.filter((item) => item.name == payload);
      return {
        ...state,
        filteredTemplates: template,
      };
    },
    filterTemplatesByOrder: (state, { payload }) => {
      if (payload === "Default") {
        return {
          ...state,
          filteredTemplates: state.templates,
        };
      } else if (payload === "Ascending") {
        let filtered = sortByKey(state.filteredTemplates, "name", "Ascending");
        return {
          ...state,
          filteredTemplates: filtered,
        };
      } else {
        let filtered = sortByKey(state.filteredTemplates, "name", "Descending");
        return {
          ...state,
          filteredTemplates: filtered,
        };
      }
    },
    filterTemplatesByDate: (state, { payload }) => {
      if (payload === "Default") {
        return {
          ...state,
          filteredTemplates: state.templates,
        };
      } else if (payload === "Ascending") {
        let filtered = sortByKey(
          state.filteredTemplates,
          "created",
          "Ascending"
        );
        return {
          ...state,
          filteredTemplates: filtered,
        };
      } else {
        let filtered = sortByKey(
          state.filteredTemplates,
          "created",
          "Descending"
        );
        return {
          ...state,
          filteredTemplates: filtered,
        };
      }
    },
  },
  extraReducers: {
    [fetchTemplates.pending]: (state, { payload }) => {
      return {
        ...state,
        loading: true,
        error: false,
      };
    },
    [fetchTemplates.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        templates: payload,
        filteredTemplates: payload,
        error: false,
      };
    },
    [fetchTemplates.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
});

export const {
  filterTemplatesByCategory,
  findTemplateByName,
  filterTemplatesByOrder,
  filterTemplatesByDate,
} = templatesSlice.actions;

export default templatesSlice.reducer;

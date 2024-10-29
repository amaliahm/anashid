const initialState = {
    tables: {
      gender: {
        data: [], loading: false, error: false, success: false
      },
      theme: {
        data: [], loading: false, error: false, success: false
      },
      language: {
        data: [], loading: false, error: false, success: false
      },
      result: {
        data: [], loading: false, error: false, success: false
      },
    }
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TABLE_DATA_REQUEST':
        return {
          ...state,
          tables: {
            ...state.tables,
            [action.payload.table]: {
              ...state.tables[action.payload.table],
              loading: true,
              error: false,
              success: false,
            },
          },
        };
      case 'FETCH_TABLE_DATA_SUCCESS':
        return {
          ...state,
          tables: {
            ...state.tables,
            [action.payload.table]: {
              ...state.tables[action.payload.table],
              data: action.payload.data,
              loading: false,
              error: false,
              success: true,
            },
          },
        };
      case 'FETCH_TABLE_DATA_FAILURE':
        return {
          ...state,
          tables: {
            ...state.tables,
            [action.payload.table]: {
              ...state.tables[action.payload.table],
              loading: false,
              success: false,
              error: true,
            },
          },
        };
        case 'FETCH_SEARCH_DATA_REQUEST':
        return {
          ...state,
          tables: {
            ...state.tables,
            result: {
              ...state.tables.result,
              loading: true,
              error: false,
              success: false,
            },
          },
        };
      case 'FETCH_SEARCH_DATA_SUCCESS':
        return {
          ...state,
          tables: {
            ...state.tables,
            result: {
              ...state.tables.result,
              data: action.payload.data,
              loading: false,
              error: false,
              success: true,
            },
          },
        };
      case 'FETCH_SEARCH_DATA_FAILURE':
        return {
          ...state,
          tables: {
            ...state.tables,
            result: {
              ...state.tables.result,
              loading: false,
              success: false,
              error: true,
            },
          },
        };
      default:
        return state;
    }
}
  
export default searchReducer;  
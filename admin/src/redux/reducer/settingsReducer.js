const initialState = {
    tables: {
      publicity: {
        data: [], loading: false, error: false, success: false
      },
      gender: {
        data: [], loading: false, error: false, success: false
      },
      theme: {
        data: [], loading: false, error: false, success: false
      },
      language: {
        data: [], loading: false, error: false, success: false
      },
    }
};

const settingsReducer = (state = initialState, action) => {
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
      case 'ADD_ITEM_TO_TABLE_REQUEST':
      case 'DELETE_ITEM_FROM_TABLE_REQUEST':
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
      case 'ADD_ITEM_TO_TABLE_SUCCESS':
        return {
          ...state,
          tables: {
            ...state.tables,
            [action.payload.table]: {
              ...state.tables[action.payload.table],
              data: [...state.tables[action.payload.table].data, action.payload.item],
              loading: false,
              error: false,
              success: true,
            },
          },
        };
      case 'ADD_ITEM_TO_TABLE_FAILURE':
      case 'DELETE_ITEM_FROM_TABLE_FAILURE':
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
      case 'DELETE_ITEM_FROM_TABLE_SUCCESS':
        return {
          ...state,
          tables: {
            ...state.tables,
            [action.payload.table]: {
              ...state.tables[action.payload.table],
              data: state.tables[action.payload.table].data.filter(
                (item) => item.id !== action.payload.itemId
              ),
              loading: false,
              success: true,
              error: false,
            },
          },
        };
      default:
        return state;
    }
  }
  
  export default settingsReducer;
  
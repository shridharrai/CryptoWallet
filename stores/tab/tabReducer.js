import tabActionTypes from "./tabActionTypes";

const initialState = {
  isTradeModalVisible: false,
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case tabActionTypes.SET_TRADE_VISIBILITY: {
      return {
        ...state,
        isTradeModalVisible: action.payload.isVisible,
      };
    }
    default:
      return state;
  }
};

export default tabReducer;

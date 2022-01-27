import marketActionTypes from "./marketActionTypes";

const initialState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case marketActionTypes.GET_HOLDINGS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActionTypes.GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload.myHoldings,
      };
    case marketActionTypes.GET_HOLDINGS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case marketActionTypes.GET_COIN_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActionTypes.GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins: action.payload.coins,
      };
    case marketActionTypes.GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default marketReducer;

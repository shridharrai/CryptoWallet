import tabActionTypes from "./tabActionTypes";

export const setTradeModalVisibilitySuccess = (isVisible) => ({
  type: tabActionTypes.SET_TRADE_VISIBILITY,
  payload: { isVisible },
});

export const setTradeModalVisibility = (isVisible) => (dispatch) =>
  dispatch(setTradeModalVisibilitySuccess(isVisible));

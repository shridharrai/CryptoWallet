import axios from "axios";
import marketActionTypes from "./marketActionTypes";

//Holding / My Holdings
export const getHoldingsBegin = () => ({
  type: marketActionTypes.GET_HOLDINGS_BEGIN,
});

export const getHoldingsSuccess = (myHoldings) => ({
  type: marketActionTypes.GET_HOLDINGS_SUCCESS,
  payload: { myHoldings },
});

export const getHoldingsFailure = (error) => ({
  type: marketActionTypes.GET_HOLDINGS_FAILURE,
  payload: { error },
});

export const getHoldings = (
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1
) => {
  return (dispatch) => {
    dispatch(getHoldingsBegin());

    let ids = holdings.map((item) => item.id).join(",");
    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

    return axios({
      url: apiUrl,
      method: "GET",
      header: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("Get Holdings");
        console.log(response);
        if (response.status == 200) {
          //Massage data
          let myHoldings = response.data.map((item) => {
            //Retrieve our current holdings -> current quantity
            let coin = holdings.find((a) => a.id === item.id);

            //Price from 7 days ago
            let price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);

            return {
              id: item.id,
              symbol: item.symbol,
              name: item.name,
              image: item.image,
              current_price: item.current_price,
              qty: coin.qty,
              total: coin.qty * item.current_price,
              price_change_percentage_7d_in_currency:
                item.price_change_percentage_7d_in_currency,
              holding_value_change_7d:
                (item.current_price - price7d) * coin.qty,
              sparkline_in_7d: {
                value: item.sparkline_in_7d.price.map((price) => {
                  return price * coin.qty;
                }),
              },
            };
          });

          dispatch(getHoldingsSuccess(myHoldings));
        } else {
          console.log("Failure ", response.data);
          dispatch(getHoldingsFailure(response.data));
        }
      })
      .catch((error) => {
        console.error("Error is ", error);
        dispatch(getHoldingsFailure(error));
      });
  };
};

//Coin Market
export const getCoinMarketBegin = () => ({
  type: marketActionTypes.GET_COIN_MARKET_BEGIN,
});

export const getCoinMarketSuccess = (coins) => ({
  type: marketActionTypes.GET_COIN_MARKET_SUCCESS,
  payload: { coins },
});

export const getCoinMarketFailure = (error) => ({
  type: marketActionTypes.GET_COIN_MARKET_FAILURE,
  payload: { error },
});

export const getCoinMarket = (
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1
) => {
  return (dispatch) => {
    dispatch(getCoinMarketBegin());

    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    return axios({
      url: apiUrl,
      method: "GET",
      header: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("Get CoinMarket");
        // console.log(response);
        if (response.status == 200) {
          dispatch(getCoinMarketSuccess(response.data));
        } else {
          dispatch(getCoinMarketFailure(response.data));
        }
      })
      .catch((error) => dispatch(getCoinMarketFailure(error)));
  };
};

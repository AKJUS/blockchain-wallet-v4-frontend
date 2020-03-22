import { CoinType, CurrenciesType } from '../../../types'
import {
  FiatEligibleType,
  SBAccountType,
  SBBalancesType,
  SBMoneyType,
  SBOrderType,
  SBPairsType,
  SBPairType
} from './types'

export default ({
  nabuUrl,
  get,
  authorizedGet,
  authorizedPost,
  authorizedPut
}) => {
  const createSBOrder = (
    pair: SBPairsType,
    action: 'BUY' | 'SELL',
    input: SBMoneyType,
    output: {
      symbol: CoinType
    }
  ): SBOrderType =>
    authorizedPost({
      url: nabuUrl,
      endPoint: '/simple-buy/trades',
      contentType: 'application/json',
      data: {
        pair,
        action,
        input,
        output
      }
    })

  const getSBBalances = (currency?: CoinType): SBBalancesType =>
    authorizedGet({
      url: nabuUrl,
      endPoint: '/accounts/simplebuy',
      data: {
        ccy: currency
      }
    })

  const getSBFiatEligible = (
    currency: keyof CurrenciesType
  ): FiatEligibleType =>
    authorizedGet({
      url: nabuUrl,
      endPoint: '/simple-buy/eligible',
      data: {
        fiatCurrency: currency
      }
    })

  const getSBOrders = ({
    pendingOnly
  }: {
    pendingOnly?: boolean
  }): { orders: Array<SBOrderType> } =>
    authorizedGet({
      url: nabuUrl,
      endPoint: '/simple-buy/trades',
      data: {
        pendingOnly
      }
    })

  const getSBPairs = (
    currency: keyof CurrenciesType
  ): { pairs: Array<SBPairType> } =>
    get({
      url: nabuUrl,
      endPoint: '/simple-buy/pairs',
      data: {
        fiatCurrency: currency
      }
    })

  const getSBPaymentAccount = (currency: keyof CurrenciesType): SBAccountType =>
    authorizedPut({
      url: nabuUrl,
      endPoint: '/payments/accounts/simplebuy',
      contentType: 'application/json',
      data: {
        currency
      }
    })

  const getSBSuggestedAmounts = (currency: keyof CurrenciesType) =>
    get({
      url: nabuUrl,
      endPoint: '/simple-buy/amounts',
      data: {
        currency
      }
    })

  return {
    createSBOrder,
    getSBBalances,
    getSBOrders,
    getSBPairs,
    getSBPaymentAccount,
    getSBFiatEligible,
    getSBSuggestedAmounts
  }
}

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { useCoinStore } from './CoinStore';
import { Coin } from '../components/types';
import { getCoins } from '../services/get-coins';

vi.mock('../services/get-coins', () => ({
   getCoins: vi.fn(),
}));


const coin = {
   id: 'bitcoin',
   name: 'Bitcoin',
} as Coin

const ethereum = {
   id: 'ethereum',
   name: 'Ethereum',
} as Coin;

describe('CoinStore', () => {

   beforeEach(() => {
      localStorage.clear();

      useCoinStore.setState({
         topCoins: [],
         userCoins: [],
         selectCoinId: null,
         selectCoin: null,    
      });
   });


   test('addToUserCoins', () => {
      useCoinStore.getState().addToUserCoins(coin);
      useCoinStore.getState().addToUserCoins(coin);
      expect( useCoinStore.getState().userCoins).toHaveLength(1);
   });

   test('removeUserCoin', () => {
      useCoinStore.getState().addToUserCoins(coin);
      useCoinStore.getState().addToUserCoins(coin);
      expect( useCoinStore.getState().userCoins).toHaveLength(0);
   });

   test('getCoinById', () => {
      useCoinStore.setState({ topCoins: [coin] })
      const result = useCoinStore.getState().getCoinById('bitcoin');
      expect(result).toEqual(coin);
   });
   
   test('setSelectedCoin', () => {
      useCoinStore.setState({ topCoins: [coin], userCoins: []})
      useCoinStore.getState().setSelectedCoin('bitcoin');
      expect( useCoinStore.getState().selectCoin ).toEqual(coin);
      expect( useCoinStore.getState().selectCoinId ).toBe('bitcoin');
   });

   test('syncCoins api', async () => {

      const topCoinsMock = [coin];

      const userCoinsMock = [ethereum];

      useCoinStore.setState({
         userCoins: [ethereum],
      });

      vi.mocked(getCoins)
         .mockResolvedValueOnce(topCoinsMock)
         .mockResolvedValueOnce(userCoinsMock);

      await useCoinStore.getState().syncCoins();

      expect(
         useCoinStore.getState().topCoins
      ).toEqual(topCoinsMock);

      expect(
         useCoinStore.getState().userCoins
      ).toEqual(userCoinsMock);
   });
});
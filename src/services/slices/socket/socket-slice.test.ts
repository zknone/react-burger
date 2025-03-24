import { expect } from '@jest/globals';
import { SocketResponse } from '../../../types/types';
import {
  socketSlice,
  initialState,
  wsConnectionError,
  wsGetAllOrders,
  wsGetAllPrivateOrders,
} from './reducers';

describe('socket slice store and actions', () => {
  it('should return initial state', () => {
    expect(socketSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('should handle error', () => {
    const error = 'error';
    expect(socketSlice.reducer(initialState, wsConnectionError(error))).toEqual(
      { ...initialState, error, isLoading: false }
    );
  });

  it('should get all the data', () => {
    const firstMockSocketResponse: SocketResponse = {
      orders: [
        {
          ingredients: ['ingredient_1', 'ingredient_2'],
          _id: 'order_1',
          status: 'pending',
          number: 1001,
          createdAt: '2024-03-15T10:00:00Z',
          updatedAt: '2024-03-15T10:05:00Z',
          name: 'Burger Classic',
        },
        {
          ingredients: ['ingredient_3', 'ingredient_4'],
          _id: 'order_2',
          status: 'done',
          number: 1002,
          createdAt: '2024-03-15T11:00:00Z',
          updatedAt: '2024-03-15T11:10:00Z',
          name: 'Veggie Delight',
        },
      ],
      success: true,
      total: 150,
      totalToday: 20,
    };

    const secondMockSocketResponse: SocketResponse = {
      orders: [
        {
          ingredients: ['ingredient_5', 'ingredient_6'],
          _id: 'order_3',
          status: 'canceled',
          number: 1003,
          createdAt: '2024-03-15T12:00:00Z',
          updatedAt: '2024-03-15T12:15:00Z',
          name: 'Spicy Chicken',
        },
        {
          ingredients: ['ingredient_7', 'ingredient_8'],
          _id: 'order_4',
          status: 'pending',
          number: 1004,
          createdAt: '2024-03-15T13:00:00Z',
          updatedAt: '2024-03-15T13:20:00Z',
          name: 'BBQ Beef',
        },
      ],
      success: true,
      total: 155,
      totalToday: 25,
    };

    const firstExpectedState = {
      ...initialState,
      data: firstMockSocketResponse,
    };

    const secondExpectedState = {
      ...initialState,
      data: secondMockSocketResponse,
    };

    const firstExpectedPrivateState = {
      ...initialState,
      privateData: firstMockSocketResponse,
    };

    const secondExpectedPrivateState = {
      ...initialState,
      privateData: secondMockSocketResponse,
    };

    expect(
      socketSlice.reducer(initialState, wsGetAllOrders(firstMockSocketResponse))
    ).toEqual(firstExpectedState);

    expect(
      socketSlice.reducer(
        initialState,
        wsGetAllOrders(secondMockSocketResponse)
      )
    ).toEqual(secondExpectedState);

    expect(
      socketSlice.reducer(
        initialState,
        wsGetAllPrivateOrders(firstMockSocketResponse)
      )
    ).toEqual(firstExpectedPrivateState);

    expect(
      socketSlice.reducer(
        initialState,
        wsGetAllPrivateOrders(secondMockSocketResponse)
      )
    ).toEqual(secondExpectedPrivateState);
  });
});

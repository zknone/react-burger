import { Order } from '../types/types';

type OrdersListener = (orders: Order[]) => void;

const initialMockOrders: Order[] = [];

let mockOrdersState: Order[] = [...initialMockOrders];
const listeners = new Set<OrdersListener>();

const notify = () => {
  listeners.forEach((listener) => listener(mockOrdersState));
};

const generateOrderNumber = () =>
  mockOrdersState.reduce((max, order) => Math.max(max, order.number), 0) + 1;

const generateId = () => crypto.randomUUID?.() ?? `${Date.now()}`;

export const resetMockOrders = () => {
  mockOrdersState = [...initialMockOrders];
  notify();
};

export const getMockOrders = () => mockOrdersState;

export const subscribeMockOrders = (listener: OrdersListener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

type AddMockOrderOptions = {
  name?: string;
  status?: Order['status'];
  autoCompleteDelayMs?: number | null;
};

export const addMockOrder = (
  ingredients: string[],
  options: AddMockOrderOptions = {}
): Order => {
  const now = new Date().toISOString();
  const number = generateOrderNumber();
  const { name, status = 'pending', autoCompleteDelayMs = 3000 } = options;

  const order: Order = {
    _id: generateId(),
    ingredients,
    status,
    name: name ?? `Mock order #${number}`,
    createdAt: now,
    updatedAt: now,
    number,
  };

  mockOrdersState = [order, ...mockOrdersState];
  notify();

  if (autoCompleteDelayMs !== null) {
    setTimeout(() => {
      mockOrdersState = mockOrdersState.map((item) =>
        item.number === number ? { ...item, status: 'done' } : item
      );
      notify();
    }, autoCompleteDelayMs);
  }

  return order;
};

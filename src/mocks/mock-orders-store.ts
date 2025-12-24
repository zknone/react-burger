import { Order } from '../types/types';
import { mockMinuteInMs } from '../utils/order-time';

type OrdersListener = (orders: Order[]) => void;

const initialMockOrders: Order[] = [];

let mockOrdersState: Order[] = [...initialMockOrders];
const emitter = new EventTarget();

const notify = () => {
  emitter.dispatchEvent(new CustomEvent('orders:update', { detail: mockOrdersState }));
};

const generateOrderNumber = () =>
  mockOrdersState.reduce((max, order) => Math.max(max, order.number), 0) + 1;

const generateId = () => crypto.randomUUID?.() ?? `${Date.now()}`;

const DEFAULT_ESTIMATED_MINUTES = 6;

export const resetMockOrders = () => {
  mockOrdersState = [...initialMockOrders];
  notify();
};

export const getMockOrders = () => mockOrdersState;

export const subscribeMockOrders = (listener: OrdersListener) => {
  const handler = ((event: Event) => {
    const { detail } = event as CustomEvent<Order[]>;
    listener(detail);
  }) as EventListener;
  emitter.addEventListener('orders:update', handler);
  return () => emitter.removeEventListener('orders:update', handler);
};

type AddMockOrderOptions = {
  name?: string;
  status?: Order['status'];
  autoCompleteDelayMs?: number | null;
  estimatedCookingTimeMinutes?: number;
  estimatedReadyAt?: string;
};

export const addMockOrder = (
  ingredients: string[],
  options: AddMockOrderOptions = {}
): Order => {
  const now = new Date().toISOString();
  const number = generateOrderNumber();
  const {
    name,
    status = 'pending',
    autoCompleteDelayMs,
    estimatedCookingTimeMinutes,
    estimatedReadyAt,
  } = options;

  const cookingTimeMinutes = estimatedCookingTimeMinutes ?? DEFAULT_ESTIMATED_MINUTES;
  const completionDelay =
    autoCompleteDelayMs === undefined
      ? cookingTimeMinutes * mockMinuteInMs
      : autoCompleteDelayMs;

  const readyAt =
    estimatedReadyAt ??
    (completionDelay !== null
      ? new Date(Date.now() + completionDelay).toISOString()
      : undefined);

  const order: Order = {
    _id: generateId(),
    ingredients,
    status,
    name: name ?? `Mock order #${number}`,
    createdAt: now,
    updatedAt: now,
    number,
    estimatedCookingTimeMinutes: cookingTimeMinutes,
    estimatedReadyAt: readyAt,
  };

  mockOrdersState = [order, ...mockOrdersState];
  notify();

  if (completionDelay !== null) {
    setTimeout(() => {
      mockOrdersState = mockOrdersState.map((item) =>
        item.number === number
          ? { ...item, status: 'done', updatedAt: new Date().toISOString() }
          : item
      );
      notify();
    }, completionDelay);
  }

  return order;
};

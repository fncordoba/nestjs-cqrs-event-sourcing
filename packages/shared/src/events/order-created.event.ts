import { IEvent } from '@nestjs/cqrs';

export class OrderCreatedEvent implements IEvent {
  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly total: number,
    public readonly createdAt: Date
  ) {}
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
} 
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderCreatedEvent, OrderStatus } from '@nestjs-cqrs-event-sourcing/shared';
import { Order } from '../infrastructure/order.entity';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async handle(event: OrderCreatedEvent) {
    const order = new Order();
    order.id = event.orderId;
    order.customerId = event.customerId;
    order.items = event.items;
    order.total = event.total;
    order.status = OrderStatus.CREATED;
    order.createdAt = event.createdAt;
    order.updatedAt = event.createdAt;

    await this.orderRepository.save(order);
  }
} 
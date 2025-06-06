import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { OrderAggregate } from '../aggregates/order.aggregate';
import { OrderCreatedEvent } from '@nestjs-cqrs-event-sourcing/shared';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderAggregate: OrderAggregate,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateOrderCommand) {
    const orderId = uuidv4();
    const total = command.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const event = new OrderCreatedEvent(
      orderId,
      command.customerId,
      command.items,
      total,
      new Date()
    );

    await this.orderAggregate.createOrder(event);
    this.eventBus.publish(event);

    return { orderId, total };
  }
} 
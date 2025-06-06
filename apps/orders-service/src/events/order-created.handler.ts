import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '@nestjs-cqrs-event-sourcing/shared';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  async handle(event: OrderCreatedEvent) {
    await this.natsClient.emit('OrderCreatedEvent', event).toPromise();
  }
} 
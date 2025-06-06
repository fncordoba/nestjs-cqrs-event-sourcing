import { Injectable, Inject } from '@nestjs/common';
import { OrderCreatedEvent } from '@nestjs-cqrs-event-sourcing/shared';

@Injectable()
export class OrderAggregate {
  constructor(
    @Inject('EVENT_STORE')
    private readonly eventStore: {
      save: (event: any) => Promise<void>;
    }
  ) {}

  async createOrder(event: OrderCreatedEvent): Promise<void> {
    await this.eventStore.save(event);
  }
} 
import { ICommand } from '@nestjs/cqrs';
import { CreateOrderItemDto } from '@nestjs-cqrs-event-sourcing/shared';

export class CreateOrderCommand implements ICommand {
  constructor(
    public readonly customerId: string,
    public readonly items: CreateOrderItemDto[]
  ) {}
} 
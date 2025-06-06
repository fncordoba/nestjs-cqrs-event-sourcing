import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderDto } from '@nestjs-cqrs-event-sourcing/shared';
import { CreateOrderCommand } from './commands/create-order.command';

@Controller('orders')
export class OrdersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const command = new CreateOrderCommand(
      createOrderDto.customerId,
      createOrderDto.items
    );
    return this.commandBus.execute(command);
  }
} 
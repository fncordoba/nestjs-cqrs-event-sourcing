import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetOrderQuery } from './queries/get-order.query';

@Controller('orders')
export class OrdersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrderQuery(id));
  }
} 
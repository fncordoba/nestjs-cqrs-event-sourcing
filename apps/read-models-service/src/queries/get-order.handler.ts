import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOrderQuery } from './get-order.query';
import { Order } from '../infrastructure/order.entity';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async execute(query: GetOrderQuery): Promise<Order> {
    return this.orderRepository.findOneByOrFail({ id: query.orderId });
  }
} 
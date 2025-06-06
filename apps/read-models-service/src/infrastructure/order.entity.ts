import { Entity, Column, PrimaryColumn } from 'typeorm';
import { OrderStatus } from '@nestjs-cqrs-event-sourcing/shared';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  customerId: string;

  @Column('jsonb')
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;

  @Column('decimal')
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
} 
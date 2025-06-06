import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { CreateOrderHandler } from './commands/create-order.handler';
import { OrderCreatedHandler } from './events/order-created.handler';
import { OrderAggregate } from './aggregates/order.aggregate';
import { MongoEventStore } from './infrastructure/mongo-event-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL || 'nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    CreateOrderHandler,
    OrderCreatedHandler,
    OrderAggregate,
    {
      provide: 'EVENT_STORE',
      useClass: MongoEventStore,
    },
  ],
})
export class AppModule {} 
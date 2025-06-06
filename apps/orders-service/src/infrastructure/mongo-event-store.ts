import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { OrderCreatedEvent } from '@nestjs-cqrs-event-sourcing/shared';

@Injectable()
export class MongoEventStore implements OnModuleInit {
  private client: MongoClient;
  private collection: any;

  async onModuleInit() {
    this.client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/orders');
    await this.client.connect();
    this.collection = this.client.db().collection('events');
  }

  async save(event: OrderCreatedEvent): Promise<void> {
    await this.collection.insertOne({
      type: event.constructor.name,
      data: event,
      timestamp: new Date(),
    });
  }
} 
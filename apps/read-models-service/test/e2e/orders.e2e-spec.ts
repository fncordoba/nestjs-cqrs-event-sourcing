import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/orders/:id (GET)', async () => {
    // Primero creamos una orden en el servicio de órdenes
    const createResponse = await request('http://localhost:3000')
      .post('/orders')
      .send({
        customerId: 'test-customer',
        items: [
          {
            productId: 'test-product',
            quantity: 2,
            price: 10,
          },
        ],
      });

    const orderId = createResponse.body.orderId;

    // Esperamos un momento para que el evento se procese
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verificamos que podemos obtener la orden desde el servicio de modelos de lectura
    return request(app.getHttpServer())
      .get(`/orders/${orderId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', orderId);
        expect(res.body).toHaveProperty('customerId', 'test-customer');
        expect(res.body).toHaveProperty('total', 20);
        expect(res.body.items).toHaveLength(1);
        expect(res.body.items[0]).toHaveProperty('productId', 'test-product');
        expect(res.body.items[0]).toHaveProperty('quantity', 2);
        expect(res.body.items[0]).toHaveProperty('price', 10);
      });
  });
}); 
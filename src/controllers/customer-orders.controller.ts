import {repository} from '@loopback/repository';
import {param, post, requestBody} from '@loopback/rest';
import {Customer, Order} from '../models/';
import {CustomerRepository} from '../repositories/';

export class CustomerOrdersController {
  constructor(
    @repository(CustomerRepository)
    protected customerRepository: CustomerRepository,
  ) { }

  @post('/customers/{id}/order')
  async createOrder(
    @param.path.number('id') customerId: typeof Customer.prototype.id,
    @requestBody() orderData: Order,
  ): Promise<Order> {
    return this.customerRepository.orders(customerId).create(orderData);
  }
}

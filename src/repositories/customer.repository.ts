import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository, HasManyRepositoryFactory,
  repository
} from '@loopback/repository';
import {ShopDataSource} from '../datasources';
import {Customer, CustomerRelations, Order} from '../models';
import {OrderRepository} from './order.repository';



export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {
  public readonly orders: HasManyRepositoryFactory<
    Order,
    typeof Customer.prototype.id
  >;
  constructor(
    @inject('datasources.Shop') dataSource: ShopDataSource,
    @repository.getter('OrderRepository')
    orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Customer, dataSource);

    // we already have this line to create a HasManyRepository factory
    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      orderRepositoryGetter,
    );

    // add this line to register inclusion resolver
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);

  }
}

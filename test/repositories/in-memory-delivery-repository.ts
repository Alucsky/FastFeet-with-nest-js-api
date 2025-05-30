import {
  DeliveryRepository,
  findRecentDeliveriesByDeliverymanProps,
} from "@/domain/deliveries/application/repositories/delivery-repository";
import { AddressDelivery } from "@/domain/deliveries/enterprise/entities/addressDelivery";
import { Delivery } from "@/domain/deliveries/enterprise/entities/delivery";

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = [];
  public deliveryAddres: AddressDelivery[] = [];

  async findRecentDeliveriesByDeliveryman({
    deliverymanId,
    address,
    status,
  }: findRecentDeliveriesByDeliverymanProps) {
    let deliveries = this.items.filter(
      (item) =>
        item.status === status &&
        item.deliverymanId?.toString() === deliverymanId.toString()
    );

    if (address) {
      const addresFilter: string[] = [];

      this.deliveryAddres.forEach((addressFor) => {
        if (address.neighborhood) {
          if (
            addressFor.city === address.city &&
            addressFor.neighborhood === address.neighborhood
          ) {
            addresFilter.push(addressFor.id.toString());
          }
        } else if (addressFor.city === address.city) {
          addresFilter.push(addressFor.id.toString());
        }
      });
      deliveries = deliveries.filter((delivery) =>
        addresFilter.includes(delivery.addressId.toString())
      );
    }

    return deliveries;
  }

  async findById(deliveryId: string) {
    const delivery = this.items.find(
      (item) => item.id.toString() === deliveryId
    );

    if (!delivery) {
      return null;
    }

    return delivery;
  }
  async create(delivery: Delivery) {
    this.items.push(delivery);

    return delivery;
  }
  async delete(deliveryId: string) {
    const deliveryIndex = this.items.findIndex(
      (item) => item.id.toString() === deliveryId
    );
    if (deliveryIndex !== -1) {
      this.items.splice(deliveryIndex, 1);
    }
  }
  async update(delivery: Delivery) {
    const deliveryIndex = this.items.findIndex(
      (item) => item.id.toString() === delivery.id.toString()
    );

    if (deliveryIndex !== -1) {
      this.items[deliveryIndex] = delivery;
    }

    return delivery;
  }
}

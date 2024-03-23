export class VehicleReceipt {
  constructor(
    vehicleId,
    dateCreated,
    amount,
    description,
    vehiclePayments,

  ) {
    this.vehicleId = vehicleId;
    this.description = description;
    this.dateCreated = dateCreated;
    this.amount = amount;
    this.vehiclePayments = vehiclePayments;

  }
}
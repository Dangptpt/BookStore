export class VehicleReceiptPut {
    constructor(
      vehicleId,
      dateCreated,
      amount,
      description,
      vehiclePayments,
      vehicleReceiptId
    ) {
      this.vehicleId = vehicleId;
      this.description = description;
      this.dateCreated = dateCreated;
      this.amount = amount;
      this.vehiclePayments = vehiclePayments;
      this.vehicleReceiptId = vehicleReceiptId;
    }
  }
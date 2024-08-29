export class CreateOrderDto {


    serviceId: number | undefined;
    title: string | undefined;
    note?: string | undefined;
    cardNumber: string | undefined;
    code: string | undefined;
    cardHolder          :string|undefined;
    quantity         :number|undefined;
    dateOrder: Date | undefined;
    usersId  :number|undefined;
    address1 :string | undefined;
    address2? :string | undefined;
    city:string | undefined;
}
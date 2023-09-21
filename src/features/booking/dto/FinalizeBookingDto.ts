import { IsNotEmpty, IsUUID } from 'class-validator';

export class FinalizeBookingDto {
  @IsNotEmpty()
  @IsUUID()
  paymentId: string;
}

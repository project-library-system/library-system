import { IsString, IsUUID, IsEnum } from "class-validator";
import { ExemplaryStatus } from "src/enum/ExemplaryStatus";

export class CreateExemplaryDto {
    @IsUUID()
    book_id!: string;

    @IsString()
    code!: string;

    @IsEnum(ExemplaryStatus)
    status!: ExemplaryStatus;
}

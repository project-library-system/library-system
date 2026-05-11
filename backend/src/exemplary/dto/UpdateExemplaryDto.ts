import { IsString, IsUUID, IsOptional, IsEnum } from "class-validator";
import { ExemplaryStatus } from "src/enum/ExemplaryStatus";

export class UpdateExemplaryDto {
    @IsUUID()
    @IsOptional()
    book_id?: string;

    @IsString()
    @IsOptional()
    code?: string;

    @IsEnum(ExemplaryStatus)
    @IsOptional()
    status?: ExemplaryStatus;
}

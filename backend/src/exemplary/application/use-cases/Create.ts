import { CreateExemplaryProps } from "src/exemplary/domain/entities/Exemplary";
import { ExemplaryRepository } from "../../domain/repositories/ExemplaryRepository";

export class CreateExemplaryUseCase {
    constructor(
        private readonly repository: ExemplaryRepository
    ) { }

    async execute(data: CreateExemplaryProps) {
        return this.repository.create(data);
    }
}
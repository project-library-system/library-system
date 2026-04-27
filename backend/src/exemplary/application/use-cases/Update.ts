import { NotFoundException } from "@nestjs/common";
import { UpdateExemplaryProps } from "src/exemplary/domain/entities/Exemplary";
import { ExemplaryRepository } from "../../domain/repositories/ExemplaryRepository";

export class UpdateExemplaryUseCase {
    constructor(
        private readonly repository: ExemplaryRepository
    ) { }

    async execute(id: string, data: UpdateExemplaryProps) {
        const exemplary = await this.repository.findById(id);

        if (!exemplary) {
            throw new NotFoundException(`Exemplary with ID ${id} not found`);
        }

        return this.repository.update(id, data);
    }
}
import { NotFoundException } from "@nestjs/common";
import { ExemplaryRepository } from "src/exemplary/domain/repositories/ExemplaryRepository";

export class DeleteExemplaryUseCase {
    constructor(
        private readonly repository: ExemplaryRepository
    ) { }

    async execute(id: string) {
        const exemplary = await this.repository.findById(id);

        if (!exemplary) {
            throw new NotFoundException(`Exemplary with ID ${id} not found`);
        }

        return this.repository.delete(id);
    }
}
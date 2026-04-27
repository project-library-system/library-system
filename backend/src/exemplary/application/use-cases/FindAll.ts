import { ExemplaryRepository } from "../../domain/repositories/ExemplaryRepository";

export class FindAllExemplaryUseCase {
    constructor(
        private readonly repository: ExemplaryRepository
    ) { }

    async execute() {
        return this.repository.findAll();
    }
}
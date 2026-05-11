import { Injectable } from "@nestjs/common";
import { ExemplaryRepository } from "src/exemplary/domain/repositories/ExemplaryRepository";
import { Exemplary, CreateExemplaryProps, UpdateExemplaryProps } from "src/exemplary/domain/entities/Exemplary";
import { PrismaService } from "src/prisma/prisma.service";
import { ExemplaryStatus } from "src/enum/ExemplaryStatus";

@Injectable()
export class ExemplaryPrismaRepository implements ExemplaryRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(data: CreateExemplaryProps): Promise<Exemplary> {
        const exemplaryEntity = Exemplary.create(data);

        const created = await this.prisma.exemplar.create({
            data: {
                id: exemplaryEntity.id,
                book_id: exemplaryEntity.book_id,
                code: exemplaryEntity.code,
                status: exemplaryEntity.status,
                created_at: exemplaryEntity.created_at,
            },
        });

        return new Exemplary(
            created.id,
            created.book_id,
            created.code,
            ExemplaryStatus[created.status as keyof typeof ExemplaryStatus],
            created.created_at
        );
    }

    async update(id: string, data: UpdateExemplaryProps): Promise<Exemplary> {
        const updated = await this.prisma.exemplar.update({
            where: { id },
            data,
        });

        return new Exemplary(
            updated.id,
            updated.book_id,
            updated.code,
            ExemplaryStatus[updated.status as keyof typeof ExemplaryStatus],
            updated.created_at
        );
    }

    async delete(id: string): Promise<void> {
        await this.prisma.exemplar.delete({ where: { id } });
    }

    async findById(id: string): Promise<Exemplary | null> {
        const exemplary = await this.prisma.exemplar.findUnique({ where: { id } });

        if (!exemplary) return null;

        return new Exemplary(
            exemplary.id,
            exemplary.book_id,
            exemplary.code,
            ExemplaryStatus[exemplary.status as keyof typeof ExemplaryStatus],
            exemplary.created_at
        );
    }

    async findAll(): Promise<Exemplary[]> {
        const exemplaries = await this.prisma.exemplar.findMany();

        return exemplaries.map(
            (e) => new Exemplary(e.id, e.book_id, e.code, ExemplaryStatus[e.status as keyof typeof ExemplaryStatus], e.created_at)
        );
    }
}
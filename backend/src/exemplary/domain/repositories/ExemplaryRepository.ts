import { Exemplary, CreateExemplaryProps, UpdateExemplaryProps } from "../entities/Exemplary";

export interface ExemplaryRepository {
  create(data: CreateExemplaryProps): Promise<Exemplary>;
  update(id: string, data: UpdateExemplaryProps): Promise<Exemplary>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Exemplary | null>;
  findAll(): Promise<Exemplary[]>;
}

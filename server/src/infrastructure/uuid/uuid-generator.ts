import { randomUUID } from "crypto";
import { IdGenerator } from "../../domain/id-generator/id.types";

export class UuidGenerator implements IdGenerator {
    generate(): string {
        return randomUUID();
    }
}
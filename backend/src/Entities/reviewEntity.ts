import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reviews extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  uid: number;

  @Column()
  review: 1 | 2 | 3 | 4 | 5;
}

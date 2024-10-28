import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: new Date() })
  creation_date: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  image: string;
}

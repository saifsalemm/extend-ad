import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";
  
  @Entity()
  export class Comments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    product_id: number;

    @Column({ unique: true })
    email: string;
  
    @Column({ length: 50 })
    name: string;
  
    @Column()
    text: string;
  }
  
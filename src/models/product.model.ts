import { Category } from './category.model';
import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";

@Entity()
@Unique(["productId"])
export class Product {
    @PrimaryGeneratedColumn()
    public readonly productId!: number;

    @Column({type: 'varchar'})
    public productName!: string;
    
    @CreateDateColumn()
    public createAt!: Date;
    
    @UpdateDateColumn()
    public updateAt!: Date;

    @ManyToOne((_type) => Category, (category: Category) => category.categoryId)
    @JoinColumn({ name: 'categoryId' })
    public category!: Category;
}
import { Product } from './product.model';
import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

@Entity()
@Unique(["categoryId"])
export class Category {
    @PrimaryGeneratedColumn()
    public readonly categoryId!: number;

    @Column({type: 'varchar'})
    public categoryName!: string;
    
    @CreateDateColumn()
    public createAt!: Date;
    
    @UpdateDateColumn()
    public updateAt!: Date;

    @OneToMany((_type) => Product, (product: Product) => product.productId)
    public products!: Product[];
}
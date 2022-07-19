import { Product } from './product.model';
import { User } from './user.model';
import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["categoryId"])
export class Category {
    @Field((_type) => Number)
    @PrimaryGeneratedColumn()
    public readonly categoryId!: number;

    @Field()
    @Column({type: 'varchar'})
    public categoryName!: string;
    
    @Field()
    @CreateDateColumn()
    public createAt!: Date;
    
    @Field()
    @UpdateDateColumn()
    public updateAt!: Date;

    @Field((_type) => Number)
    @OneToOne((_type) => User, (category: Category) => category.userId)
    @JoinColumn({ name: 'userId' })
    public userId!: number;

    @Field((_type) => [Product])
    @OneToMany((_type) => Product, (product: Product) => product.productId)
    public products!: Product[];
}
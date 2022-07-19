import { Category } from './category.model';
import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
@Unique(["userId"])
export class User {
    @Field((_type) => Number)
    @PrimaryGeneratedColumn()
    public readonly userId!: number;

    @Field()
    @Column({type: 'varchar'})
    public userName!: string;
    
    @Field()
    @Column({type: 'varchar'})
    public password!: string;

    @Field()
    @CreateDateColumn()
    public createAt!: Date;
    
    @Field()
    @UpdateDateColumn()
    public updateAt!: Date;

    @Field((_type) => [Category])
    @OneToMany((_type) => Category, (category: Category) => category.userId)
    public category!: Category[];

    @Field((_type) => [Product])
    @OneToMany((_type) => Product, (product: Product) => product.userId)
    public product!: Product[];
}
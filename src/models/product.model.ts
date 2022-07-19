import { Category } from './category.model';
import { User } from './user.model';
import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["productId"])
export class Product {
    @Field((_type) => Number)
    @PrimaryGeneratedColumn()
    public readonly productId!: number;

    @Field()
    @Column({type: 'varchar'})
    public productName!: string;
    
    @Field()
    @CreateDateColumn()
    public createAt!: Date;
    
    @Field()
    @UpdateDateColumn()
    public updateAt!: Date;

    @Field((_type) => Number)
    @OneToOne((_type) => User, (product: Product) => product.userId)
    @JoinColumn({ name: 'userId' })
    public userId!: number;

    @Field((_type) => Category)
    @ManyToOne((_type) => Category, (category: Category) => category.categoryId)
    @JoinColumn({ name: 'categoryId' })
    public category!: Category;
}
import { Category } from './category.entity';
import { User } from './user.entity';
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
    @OneToOne((_type) => User, (product: Product) => product.createdBy)
    @JoinColumn({ name: 'createdBy' })
    public createdBy!: number;

    @Field((_type) => Category)
    @ManyToOne((_type) => Category, (category: Category) => category.categoryId)
    @JoinColumn({ name: 'categoryId' })
    public category!: Category;
}
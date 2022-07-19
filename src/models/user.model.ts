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
    OneToMany,
    Index
} from "typeorm";

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@ObjectType()
@Entity('users')
@Unique(["userId"])
export class User {
    @Field((_type) => Number)
    @PrimaryGeneratedColumn()
    public readonly userId!: number;

    @Field()
    @Column({type: 'varchar'})
    public userName!: string;
    
    @Field()
    @Index('email_index')
    @Column({ unique: true })
    public email!: string;

    @Field()
    @Column({type: 'varchar'})
    public password!: string;

    @Field()
    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER,
    })
    public role!: RoleEnumType.USER;

    @Field()
    @CreateDateColumn()
    public createAt!: Date;
    
    @Field()
    @UpdateDateColumn()
    public updateAt!: Date;

    @Column({ default: null })
    public photo!: string;

    @Column({ default: false })
    public verified!: boolean;

    @Field((_type) => [Category])
    @OneToMany((_type) => Category, (category: Category) => category.userId)
    public category!: Category[];

    @Field((_type) => [Product])
    @OneToMany((_type) => Product, (product: Product) => product.userId)
    public product!: Product[];

    toJSON() {
        return { ...this, password: undefined, verified: undefined };
    }
}
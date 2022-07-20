import { Product } from './product.entity';
import { Category } from './category.entity';
import { Field, ObjectType } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { Length, IsNotEmpty } from "class-validator";
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
@Unique(["email"])
export class User {
    @Field((_type) => Number)
    @PrimaryGeneratedColumn()
    public readonly userId!: number;

    @Field()
    @Length(4, 20)
    @Column({type: 'varchar'})
    public userName!: string;
    
    @Field()
    @Index('email_index')
    @Column({ unique: true })
    public email!: string;

    @Field()
    @Length(8, 100)
    @Column({type: 'varchar'})
    public password!: string;

    @Field()
    @IsNotEmpty()
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
    @OneToMany((_type) => Category, (category: Category) => category.createdBy)
    public category!: Category[];

    @Field((_type) => [Product])
    @OneToMany((_type) => Product, (product: Product) => product.createdBy)
    public product!: Product[];

    toJSON() {
        return { ...this, password: undefined, verified: undefined };
    }

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
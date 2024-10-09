import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class Product extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare availability: boolean
}

export default Product
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "src/schemas/Product.schema";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
    controllers: [ProductController],
    imports: [MongooseModule.forFeature([{ name: 'Product', collection: 'products', schema: ProductSchema }])],
    providers: [ProductService]
})

export class ProductModule { }
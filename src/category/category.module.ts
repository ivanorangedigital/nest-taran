import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/schemas/category.schema";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";

@Module({
    controllers: [CategoryController],
    imports: [MongooseModule.forFeature([{ name: 'Category', collection: 'categories', schema: CategorySchema }])],
    providers: [CategoryService]
})

export class CategoryModule { }
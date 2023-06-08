import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "src/schemas/Product.schema";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts(@Query() query: { category: string }): Promise<Product[]> {
        return this.productService.getProducts(query.category);
    }

    @Get('id')
    async getProductById(@Param('id') id: string): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Post('create')
    async createProduct(@Body() data: Product): Promise<Product> {
        return this.productService.createProduct(data);   
    }

    @Delete('delete/:id')
    async deleteProductById(@Param('id') id: string): Promise<Product> {
        return this.productService.deleteProductById(id);
    }
}
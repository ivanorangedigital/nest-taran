import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "src/schemas/category.schema";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async getCategories(@Query() query: { parent: string | undefined }): Promise<Category[]> {
        return this.categoryService.getCategories(query.parent);
    }

    @Get('id')
    async getCategoryById(@Param('id') id: string): Promise<Category> {
        return this.categoryService.getCategoryById(id);
    }

    @Post('create')
    async createCategory(@Body() data: Category): Promise<Category> {
        return this.categoryService.createCategory(data);   
    }

    @Delete('delete/:id')
    async deleteCategoryById(@Param('id') id: string): Promise<Category> {
        return this.categoryService.deleteCategoryById(id);
    }

    @Put('update/:id')
    async updateCategoryById(@Param('id') id: string, @Body() data: Category): Promise<Category> {
        return this.categoryService.updateCategoryById(id, data);
    }
}
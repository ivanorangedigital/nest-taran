import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { CookieGuard } from "src/guards/cookie.guard";
import { Image } from "src/schemas/image.schema";
import { ImageService } from "./image.service";
import { Response } from 'express';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Post('create')
    async createImage(@Body() image: Image): Promise<Image> {        
        return this.imageService.createImage(image);
    }

    @Delete('delete/:id')
    async deleteImage(@Param('id') id: string): Promise<Image> {
        return this.imageService.deleteImageById(id);
    }

    @UseGuards(CookieGuard)
    @Get()
    async getImages(@Query() query: { page?: number | string, per_page?: number | string }, @Res() res: Response): Promise<Response<Image[]>> {        
        if (query.page) query.page = Number(query.page);
        if (query.per_page) query.per_page = Number(query.per_page)

        return this.imageService.getImages(query.per_page as number | undefined, query.page as number | undefined, res);
    }
}
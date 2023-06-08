import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageSchema } from "src/schemas/image.schema";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
    controllers: [ImageController],
    imports: [MongooseModule.forFeature([{ name: 'Image', collection: 'images', schema: ImageSchema }])],
    providers: [ImageService]
})

export class ImageModule { }
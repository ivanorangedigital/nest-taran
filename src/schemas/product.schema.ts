import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Image } from "./image.schema";
import { Category } from "./category.schema";

@Schema({
    timestamps: true
})
export class Product extends Document {
    // gestito automaticamente da mongoose
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', default: null })
    image: Image;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true })
    category: Category;

    @Prop({ default: null })
    price: number;

    @Prop({ default: '' })
    description: '';
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
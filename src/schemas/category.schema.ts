import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Image } from "./image.schema";

@Schema({
    timestamps: true
})
export class Category extends Document {
    // gestito automaticamente da mongoose
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null })
    parent: Category;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', default: null })
    image: Image;

    @Prop({ required: true, default: null })
    position: number;

    // in caso di true la categoria potrà visualizzare prodotti anche senza sottocategorie
    @Prop({ default: false })
    hybrid: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.set('toJSON', {
    virtuals: true,
    versionKey: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
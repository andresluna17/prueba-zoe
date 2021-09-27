import { Schema, Document, model } from "mongoose";

export interface FileMetadataDocument extends Document {
  ip: string;
  name: string;
  size: number;
  countGetIp: number;
}

const fileMetadataSchema = new Schema(
  {
    ip: String,
    name: String,
    size: Number,
    countGetIp: { type: Number, default: 0 }
  },
  {
    timestamps: {
      createdAt: "createdAt"
    }
  }
);

export const FileMetadata = model<FileMetadataDocument>(
  "FileMetadata",
  fileMetadataSchema
);

import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { FileMetadata } from "../model/file-metadata";

export const uploadFile = (req: Request, res: Response) => {
  try {
    if (!req.files)
      return res
        .status(400)
        .send({ status: false, message: "No hay archivos para subir" });
    const file = req.files.txt as fileUpload.UploadedFile;
    let ip = file.data.toString();
    console.log(ip);
    let validIp = new RegExp(
      "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
    );

    if (!validIp.test(ip))
      return res
        .status(500)
        .send({ status: false, message: "La ip enviada en el archivo no es valida" });
    let metadata = new FileMetadata();
    metadata.ip = ip;
    metadata.name = file.name;
    metadata.size = file.size;
    metadata.save();
    return res.send({ status: true, message: "archivo recibido" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "error al subir el archivo", error });
  }
};

export const getIp = async (req: Request, res: Response) => {
  let random = Math.floor(Math.random() * (await FileMetadata.count().exec()));
  let ip = await FileMetadata.findOne().skip(random).exec();
  ip!.countGetIp = ip!.countGetIp + 1;
  await ip!.save();
  return res
    .status(200)
    .send({ status: true, message: "ip random listada exitosamente", data: ip });
};

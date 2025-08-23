import multer from "multer";
import path from "node:path";
const uploadsPath = path.join(__dirname, "../uploads");

const fileUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
        cb(null, uploadsPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}${ext}`;
            cb(null, fileName);

        }

    }),
    limits: {
        fileSize: 1024 * 1024 * 5
    },

    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(new Error("File type not supported"));

        }

    }   
});

export const uploadSingle = (fieldName: string) => fileUpload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount: number) => fileUpload.array(fieldName, maxCount);

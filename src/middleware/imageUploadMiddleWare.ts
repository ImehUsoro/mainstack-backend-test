const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: (error: Error | null, acceptFile: boolean) => void
// ) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("File type not allowed"), false);
//   }
// };

export const upload = multer({ storage });

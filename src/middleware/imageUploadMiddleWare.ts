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

export const upload = multer({ storage });

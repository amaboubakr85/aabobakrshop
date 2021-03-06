import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //   NULL for NO ERROR
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    //   path.extname(file.orginalname)  will automatically include the .  for example (.jpeg or .jpg or .png)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  if (extname && mimetype) {
    console.log(extname, mimetype)
    return cb(null, true)
  } else {
    cb('Images Only')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router

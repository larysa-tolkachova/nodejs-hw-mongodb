import multer from 'multer';

import path from 'node:path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src', 'tmp')); //в якій папці зберігаємо
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + ' - ' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '-' + file.originalname); // унікальне ім я
  },
});

export const upload = multer({ storage });

// console.log(file);
// {
// fieldname:	'avatar',
// originalname: 'TrevorPhilip.png',
// encoding: '7bit',
// mimetype: 'imag/png'
// size: 755896,
// destination:	'User/.../Projects/.../src/tmp'    //шлях до папки
// filename: 1778970-8766967-TrevorPhilip.png,       //унікальне ім'я
// path: '.../src/tmp/1778970-8766967-TrevorPhilip.png',
// }

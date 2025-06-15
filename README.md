# nodejs-hw-mongodb

.messages({ 'string.email': '"Email" must be a valid email address' })

const createContactsController = async (req, res) => {
//перемикач
let avatar = null;

if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
const result = await uploadToCloudinary(req.file.path); //завантаження foto на Cloudinar
await fs.unlink(req.file.path); //видаляємо картинку

    avatar = result.secure_url;

} else {
await fs.rename(
req.file.path,
path.resolve('src', 'uploads', 'photos', req.file.filename),
); //перемістили file на постійне збереження

    avatar = `http://localhost:3000/photos/${req.file.filename}`;

} //

const data = await creatContacts({
...req.body,
userId: req.user.id, //user до якого належить конкретний contact
avatar,
});
//req.body - отримуємо, userId: req.user.id - самі визначаємо

res.status(201).json({
status: 201,
message: 'Successfully created a contact!',
data,
});
};

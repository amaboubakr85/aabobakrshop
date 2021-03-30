import bcryptjs from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcryptjs.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ahmed Aboubakr',
    email: 'a.m.aboubakr85@gmail.com',
    password: bcryptjs.hashSync('123456', 10),
  },
  {
    name: 'Ahmed Hotmail',
    email: 'a.m.aboubakr85@hotmail.com',
    password: bcryptjs.hashSync('123456', 10),
  },
]

export default users

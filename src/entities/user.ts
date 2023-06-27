import { DanceCourse } from './danceCourse.js'
import { Image } from '../types/image.js'

export type User = {
  id: string,
  role: 'user' | 'admin',
  userName: string,
  email: string,
  password: string,
  avatar: Image,
  danceCourses: DanceCourse[]  
}

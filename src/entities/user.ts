import { DanceCourse } from './danceCourse.js'

export type User = {
  id: string,
  role: 'user' | 'admin',
  userName: string,
  email: string,
  password: string,
  danceCourses: DanceCourse[]
}

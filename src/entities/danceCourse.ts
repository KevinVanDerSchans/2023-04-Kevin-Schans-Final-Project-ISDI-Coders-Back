import { Image } from "../types/image"

export type DanceCourse = {
  id: string,
  courseName: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  priceCourse: string,
  totalClasses: number,
  initialDescription: string,
  largeDescription: string,
  image: Image,
}

import { Image } from "../types/image"
import { Video } from "../types/video"

export type DanceCourse = {
  id: string,
  courseName: string,
  level: 'Beginner' | 'Intermediate' | 'Advanced',
  priceCourse: string,
  totalClasses: string,
  initialDescription: string,
  largeDescription: string,
  image: Image,
  video: Video,
}

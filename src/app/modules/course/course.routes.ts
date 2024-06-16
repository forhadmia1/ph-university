import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(courseValidation.createCourseSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteCourse);

router.patch(
  '/:id',
  validateRequest(courseValidation.updateCourseSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidation.assignCourseFacultiesValidation),
  CourseControllers.assignCourseFaculties,
);

router.put(
  '/:courseId/remove-faculties',
  validateRequest(courseValidation.assignCourseFacultiesValidation),
  CourseControllers.removeCourseFaculties,
);

export const CourseRouters = router;

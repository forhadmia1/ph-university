import { Router } from 'express';
import { academicFacultyControllers } from './academicFaculty.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyValidation),
  academicFacultyControllers.createAcademicFaculty,
);

router.get('/', academicFacultyControllers.getAllAcademicFaculty);
router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/update/:id',
  validateRequest(academicFacultyValidation.updateAcademicFacultyValidation),
  academicFacultyControllers.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;

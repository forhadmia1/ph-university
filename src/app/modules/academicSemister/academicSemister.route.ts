import { Router } from 'express';
import { academicSemisterControllers } from './academicSemister.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemisterValidtion } from './academicSemister.validation';
const router = Router();

router.post(
  '/create-academic-semister',
  validateRequest(
    academicSemisterValidtion.createAcademicSemisterValidationSchema,
  ),
  academicSemisterControllers.createAcademicSemister,
);

router.get('/', academicSemisterControllers.getAllAcademicSemister);

router.get('/:id', academicSemisterControllers.getSingleAcademicSemister);

router.patch(
  '/:id',
  validateRequest(
    academicSemisterValidtion.updateAcademicSemisterValidationSchema,
  ),
  academicSemisterControllers.updateAcademicSemister,
);

export const AcademicSemisterRoutes = router;

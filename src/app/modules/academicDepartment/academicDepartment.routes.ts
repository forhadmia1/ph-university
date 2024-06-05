import { Router } from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const router = Router();

router.post(
  '/create',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.patch(
  '/update/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment);

export const AcademicDepartmentRoutes = router;

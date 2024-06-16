import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semisterRegistrationValidation } from './semisterRegistration.validation';
import { semisterRegistrationControllers } from './semisterRegistration.controller';
const router = express.Router();

router.post(
  '/create',
  validateRequest(
    semisterRegistrationValidation.createSemisterRegistrationValidation,
  ),
  semisterRegistrationControllers.createSemisterRegistration,
);

router.get('/', semisterRegistrationControllers.getAllSemisterRegistration);

router.get(
  '/:id',
  semisterRegistrationControllers.getSingleSemisterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    semisterRegistrationValidation.updateSemisterRegistrationValidation,
  ),
  semisterRegistrationControllers.updateSemisterRegistration,
);

export const semisterRegistrationRoutes = router;

import { z } from 'zod';

const createAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be a string',
      required_error: 'Academic faculty is required',
    }),
  }),
});

const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic faculty must be a string',
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
};

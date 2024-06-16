import { z } from 'zod';

const preRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourse: z.array(preRequisiteCourseSchema).optional(),
  }),
});

const updatePreRequisiteCourseSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourse: z.array(updatePreRequisiteCourseSchema).optional(),
  }),
});

const assignCourseFacultiesValidation = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidation = {
  createCourseSchema,
  updateCourseSchema,
  assignCourseFacultiesValidation,
};

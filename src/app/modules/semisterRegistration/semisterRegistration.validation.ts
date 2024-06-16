import { z } from 'zod';

const createSemisterRegistrationValidation = z.object({
  body: z.object({
    academicSemister: z.string(),
    status: z.enum(['Upcomming', 'Ongoing', 'Ended']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemisterRegistrationValidation = z.object({
  body: z.object({
    academicSemister: z.string().optional(),
    status: z.enum(['Upcomming', 'Ongoing', 'Ended']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semisterRegistrationValidation = {
  createSemisterRegistrationValidation,
  updateSemisterRegistrationValidation,
};

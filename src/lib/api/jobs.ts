import { z } from 'zod';

// Helper function to generate UUID using Web Crypto API
async function generateUUID() {
  return await crypto.randomUUID();
}

// Validation schema for job listings
export const jobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  location: z.string().min(1, 'Location is required'),
  department: z.string().min(1, 'Department is required'),
  description: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  postedAt: z.date().optional(),
});

export type Job = z.infer<typeof jobSchema>;

// In-memory storage for jobs (replace with database in production)
let jobs: Job[] = [];

export async function createJob(data: Job) {
  try {
    // Generate a unique ID
    const id = await generateUUID();
    
    // Validate the input data
    const validatedData = jobSchema.parse({
      ...data,
      id,
      postedAt: data.postedAt || new Date(),
    });

    // In a real application, you would save this to a database
    jobs.push(validatedData);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create job listing',
    };
  }
}

export async function getJobs() {
  // Sort jobs by postedAt in descending order (newest first)
  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = a.postedAt || new Date(0);
    const dateB = b.postedAt || new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return {
    success: true,
    data: sortedJobs,
  };
}

export async function getJob(id: string) {
  const job = jobs.find(j => j.id === id);
  
  if (!job) {
    return {
      success: false,
      error: 'Job not found',
    };
  }

  return {
    success: true,
    data: job,
  };
}

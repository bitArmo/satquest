"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const projectSchema = z.object({
  name: z.string().min(3, { message: 'Project name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  repository_url: z.string().url({ message: 'Please enter a valid GitHub repository URL' }),
  languages: z.string().min(1, { message: 'Please enter at least one language' })
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function NewProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      repository_url: '',
      languages: ''
    }
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Transform languages string to array
      const formattedData = {
        ...data,
        languages: data.languages.split(',').map(lang => lang.trim())
      };
      
      // Call API to create project
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create project');
      }
      
      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Add New Project</h2>
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Project created successfully!
        </div>
      )}
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Project Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your project"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="repository_url" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Repository URL
          </label>
          <input
            id="repository_url"
            type="url"
            {...register('repository_url')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/username/repository"
          />
          {errors.repository_url && (
            <p className="mt-1 text-sm text-red-600">{errors.repository_url.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
            Languages (comma separated)
          </label>
          <input
            id="languages"
            type="text"
            {...register('languages')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="JavaScript, TypeScript, Python"
          />
          {errors.languages && (
            <p className="mt-1 text-sm text-red-600">{errors.languages.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 size={20} className="animate-spin mr-2" />
              Creating Project...
            </span>
          ) : (
            'Create Project'
          )}
        </button>
      </form>
    </div>
  );
}

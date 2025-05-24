"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Issue } from '@/types';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

const issueSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  github_issue_id: z.coerce.number().int().positive({ message: 'Please enter a valid GitHub issue ID' }),
  reward_amount: z.coerce.number().int().positive({ message: 'Reward must be a positive number' })
});

type IssueFormValues = z.infer<typeof issueSchema>;

interface ManageProjectIssuesProps {
  projectId: string;
  issues: Issue[];
}

export default function ManageProjectIssues({ projectId, issues }: ManageProjectIssuesProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingIssueId, setEditingIssueId] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IssueFormValues>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: '',
      description: '',
      github_issue_id: undefined,
      reward_amount: undefined
    }
  });

  const onSubmit = async (data: IssueFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const url = editingIssueId 
        ? `/api/projects/${projectId}/issues/${editingIssueId}` 
        : `/api/projects/${projectId}/issues`;
      
      const method = editingIssueId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save issue');
      }
      
      setSubmitSuccess(true);
      reset();
      setShowForm(false);
      setEditingIssueId(null);
      
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

  const handleEdit = (issue: Issue) => {
    setValue('title', issue.title);
    setValue('description', issue.description);
    setValue('github_issue_id', issue.github_issue_id);
    setValue('reward_amount', issue.reward_amount);
    setEditingIssueId(issue.id);
    setShowForm(true);
  };

  const handleDelete = async (issueId: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/projects/${projectId}/issues/${issueId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete issue');
      }
      
      // Refresh the page to show updated issues list
      window.location.reload();
      
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-900">Project Issues</h2>
        <button
          onClick={() => {
            reset();
            setEditingIssueId(null);
            setShowForm(!showForm);
          }}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
        >
          {showForm ? 'Cancel' : (
            <>
              <Plus size={16} className="mr-1" />
              Add Issue
            </>
          )}
        </button>
      </div>
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Issue {editingIssueId ? 'updated' : 'created'} successfully!
        </div>
      )}
      
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            {editingIssueId ? 'Edit Issue' : 'Add New Issue'}
          </h3>
          
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Title
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Issue title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
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
                placeholder="Describe the issue"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="github_issue_id" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Issue ID
                </label>
                <input
                  id="github_issue_id"
                  type="number"
                  {...register('github_issue_id')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
                {errors.github_issue_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.github_issue_id.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="reward_amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Reward Amount (sats)
                </label>
                <input
                  id="reward_amount"
                  type="number"
                  {...register('reward_amount')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10000"
                />
                {errors.reward_amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.reward_amount.message}</p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 size={20} className="animate-spin mr-2" />
                  {editingIssueId ? 'Updating Issue...' : 'Creating Issue...'}
                </span>
              ) : (
                editingIssueId ? 'Update Issue' : 'Create Issue'
              )}
            </button>
          </form>
        </div>
      )}
      
      {issues.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No issues added yet. Add your first issue to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {issue.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(issue)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {issue.description}
                </p>
                
                <div className="flex flex-wrap items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <span>GitHub Issue: #{issue.github_issue_id}</span>
                    <span>Status: {issue.status}</span>
                  </div>
                  
                  <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    <span>{issue.reward_amount.toLocaleString()} sats</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

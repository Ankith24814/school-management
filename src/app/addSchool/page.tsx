'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  contact: z.string().min(10, 'Contact number must be at least 10 digits'),
  email_id: z.string().email('Invalid email format'),
  image: z.any().refine((files) => files && files.length > 0, 'Image is required'),
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
  });

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      formData.append('image', data.image[0]);

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'School added successfully!' });
        reset();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to add school' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred while adding the school' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl">
            <span className="text-3xl">🏫</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Add New School
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a comprehensive profile for your school with detailed information and beautiful imagery
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white/20">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">School Information</h2>
                <p className="text-blue-100">Fill in the details below to register your school</p>
              </div>
            </div>
          </div>
          
          <div className="px-8 py-10">
            {message && (
              <div
                className={`mb-8 p-6 rounded-2xl border-2 animate-slide-in-right ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{message.type === 'success' ? '✅' : '⚠️'}</span>
                  <span className="font-semibold">{message.text}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* School Name and Email */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-blue-500">🏫</span>
                    <span>School Name *</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={`form-input w-full px-4 py-4 rounded-xl shadow-sm focus:outline-none ${
                      errors.name ? 'error' : ''
                    }`}
                    placeholder="Enter school name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.name.message?.toString()}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email_id" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-blue-500">📧</span>
                    <span>Email Address *</span>
                  </label>
                  <input
                    {...register('email_id')}
                    type="email"
                    id="email_id"
                    className={`form-input w-full px-4 py-4 rounded-xl shadow-sm focus:outline-none ${
                      errors.email_id ? 'error' : ''
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email_id && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.email_id.message?.toString()}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label htmlFor="address" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-blue-500">📍</span>
                  <span>Complete Address *</span>
                </label>
                <textarea
                  {...register('address')}
                  id="address"
                  rows={4}
                  className={`form-input w-full px-4 py-4 rounded-xl shadow-sm focus:outline-none resize-none ${
                    errors.address ? 'error' : ''
                  }`}
                  placeholder="Enter complete address with street, area, and landmarks"
                />
                {errors.address && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.address.message?.toString()}</span>
                  </p>
                )}
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="city" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-blue-500">🏙️</span>
                    <span>City *</span>
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    id="city"
                    className={`form-input w-full px-4 py-4 rounded-xl shadow-sm focus:outline-none ${
                      errors.city ? 'error' : ''
                    }`}
                    placeholder="Enter city name"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.city.message?.toString()}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="state" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-blue-500">🗺️</span>
                    <span>State *</span>
                  </label>
                  <input
                    {...register('state')}
                    type="text"
                    id="state"
                    className={`form-input w-full px-4 py-4 rounded-xl shadow-sm focus:outline-none ${
                      errors.state ? 'error' : ''
                    }`}
                    placeholder="Enter state name"
                  />
                  {errors.state && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.state.message?.toString()}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label htmlFor="contact" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-blue-500">📞</span>
                  <span>Contact Number *</span>
                </label>
                <input
                  {...register('contact')}
                  type="tel"
                  id="contact"
                  className={`form-input w-full px-4 py-4 rounded-xl shadow-sm focus:outline-none ${
                    errors.contact ? 'error' : ''
                  }`}
                  placeholder="Enter contact number (10+ digits)"
                />
                {errors.contact && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.contact.message?.toString()}</span>
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label htmlFor="image" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-blue-500">🖼️</span>
                  <span>School Image *</span>
                </label>
                <div className="relative">
                  <input
                    {...register('image')}
                    type="file"
                    id="image"
                    accept="image/*"
                    className={`form-input w-full px-4 py-4 rounded-xl shadow-sm focus:outline-none ${
                      errors.image ? 'error' : ''
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-gray-400 text-2xl">📁</span>
                  </div>
                </div>
                {errors.image && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>{errors.image.message?.toString()}</span>
                  </p>
                )}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800 flex items-center space-x-2">
                    <span>💡</span>
                    <span><strong>Accepted formats:</strong> JPG, PNG, GIF • <strong>Max size:</strong> 5MB • <strong>Recommended:</strong> High-quality school building or campus photo</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Adding School...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Add School</span>
                      <span>✨</span>
                    </div>
                  )}
                </button>
                
                <Link
                  href="/showSchools"
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>View Schools</span>
                    <span>🔍</span>
                  </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

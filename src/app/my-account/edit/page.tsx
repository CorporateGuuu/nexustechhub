'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { toast } from 'react-hot-toast';
import { Loader2, Upload, Save, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '../../../lib/auth';
import { supabase } from '../../../lib/supabase';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[\+]?[0-9\s\-\(\)]{10,20}$/, 'Invalid phone number').optional().or(z.literal('')),
  company: z.string().optional(),
  current_password: z.string().optional(),
  new_password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain a number')
    .optional()
    .or(z.literal('')),
  confirm_password: z.string().optional(),
}).refine((data) => {
  if (data.new_password && data.new_password !== data.confirm_password) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirm_password"],
}).refine((data) => {
  if (data.new_password && !data.current_password) {
    return false;
  }
  return true;
}, {
  message: "Current password required to set new one",
  path: ["current_password"],
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please log in to edit your profile');
      router.push('/login');
      return;
    }
  }, [user, authLoading, router]);

  // Fetch current profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, company, avatar_url')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        toast.error('Failed to load profile');
        console.error(error);
      }

      if (data) {
        reset({
          full_name: data.full_name || '',
          phone: data.phone || '',
          company: data.company || '',
        });
        setAvatarUrl(data.avatar_url);
      }
      setLoading(false);
    };

    if (user) {
      fetchProfile();
    }
  }, [user, supabase, reset]);

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Failed to upload avatar');
      console.error(uploadError);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    if (updateError) {
      toast.error('Failed to save avatar');
    } else {
      setAvatarUrl(publicUrl);
      toast.success('Avatar updated!');
    }
    setUploading(false);
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    // Update profile
    const updates: any = {
      id: user.id,
      full_name: data.full_name,
      phone: data.phone,
      company: data.company,
      updated_at: new Date().toISOString(),
    };

    if (avatarUrl) updates.avatar_url = avatarUrl;

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(updates);

    if (profileError) {
      toast.error('Failed to update profile');
      return;
    }

    // Change password if requested
    if (data.new_password) {
      const { error: pwdError } = await supabase.auth.updateUser({
        password: data.new_password,
      });

      if (pwdError) {
        toast.error(pwdError.message);
        return;
      }
      toast.success('Password changed successfully');
    }

    toast.success('Profile updated successfully!');
    router.push('/my-account');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Account
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Manage your account information and security</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Avatar"
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32" />
                  )}
                </div>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Button variant="outline" disabled={uploading}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Change Avatar
                      </>
                    )}
                  </Button>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    className="hidden"
                    disabled={uploading}
                    title="Choose avatar image"
                  />
                </Label>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input {...register('full_name')} placeholder="John Doe" />
                  {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input {...register('phone')} placeholder="+971 50 123 4567" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <Label>Company</Label>
                  <Input {...register('company')} placeholder="Nexus Tech Hub LLC" />
                </div>
              </div>

              <div className="border-t pt-8 space-y-4">
                <h3 className="text-lg font-medium">Change Password (optional)</h3>
                <div>
                  <Label>Current Password</Label>
                  <Input type="password" {...register('current_password')} />
                  {errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password.message}</p>}
                </div>

                <div>
                  <Label>New Password</Label>
                  <Input type="password" {...register('new_password')} />
                  {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password.message}</p>}
                </div>

                <div>
                  <Label>Confirm New Password</Label>
                  <Input type="password" {...register('confirm_password')} />
                  {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isSubmitting || uploading}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

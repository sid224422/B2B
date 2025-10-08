import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-client'

// POST /api/upload - Upload file to Supabase Storage
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'company_logo', 'company_media', 'review_media'
    const companyId = formData.get('companyId') as string
    const reviewId = formData.get('reviewId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    // Determine storage path based on type
    let storagePath = ''
    switch (type) {
      case 'company_logo':
        storagePath = `company-logos/${companyId}/${fileName}`
        break
      case 'company_media':
        storagePath = `company-media/${companyId}/${fileName}`
        break
      case 'review_media':
        storagePath = `review-media/${reviewId}/${fileName}`
        break
      default:
        storagePath = `uploads/${fileName}`
    }

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('b2b-reviews-media')
      .upload(storagePath, file)

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('b2b-reviews-media')
      .getPublicUrl(storagePath)

    // Save file metadata to database
    const { data: mediaRecord, error: dbError } = await supabase
      .from('company_media')
      .insert({
        company_id: companyId || null,
        review_id: reviewId || null,
        media_url: publicUrl,
        media_type: file.type,
        file_size: file.size,
        file_name: file.name,
        storage_path: storagePath,
        uploaded_by: user.id
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error saving file metadata:', dbError)
      // Don't fail the request if metadata save fails
    }

    return NextResponse.json({
      url: publicUrl,
      path: storagePath,
      metadata: mediaRecord
    })
  } catch (error) {
    console.error('Error in upload API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/upload - Delete file from Supabase Storage
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const mediaId = searchParams.get('mediaId')

    if (!path) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 })
    }

    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has permission to delete this file
    if (mediaId) {
      const { data: mediaRecord } = await supabase
        .from('company_media')
        .select('uploaded_by, company_id')
        .eq('id', mediaId)
        .single()

      if (mediaRecord) {
        const isOwner = mediaRecord.uploaded_by === user.id
        const isAdmin = user.user_metadata?.role === 'admin'

        if (!isOwner && !isAdmin) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
      }
    }

    // Delete file from storage
    const { error: storageError } = await supabase.storage
      .from('b2b-reviews-media')
      .remove([path])

    if (storageError) {
      console.error('Error deleting file from storage:', storageError)
      return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
    }

    // Delete metadata from database
    if (mediaId) {
      await supabase
        .from('company_media')
        .delete()
        .eq('id', mediaId)
    }

    return NextResponse.json({ message: 'File deleted successfully' })
  } catch (error) {
    console.error('Error in delete file API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

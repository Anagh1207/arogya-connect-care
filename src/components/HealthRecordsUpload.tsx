
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, X, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface HealthRecord {
  id: string;
  title: string;
  description?: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  uploaded_at: string;
}

interface HealthRecordsUploadProps {
  records: HealthRecord[];
  onRecordsUpdate: () => void;
}

const HealthRecordsUpload = ({ records, onRecordsUpdate }: HealthRecordsUploadProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the record",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('health-records')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('health-records')
        .getPublicUrl(fileName);

      // Save record to database
      const { error: dbError } = await supabase
        .from('health_records')
        .insert({
          patient_id: user.id,
          title: title.trim(),
          description: description.trim() || null,
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Health record uploaded successfully!",
      });

      // Reset form
      setTitle('');
      setDescription('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onRecordsUpdate();
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload health record",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteRecord = async (recordId: string, fileName: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('health-records')
        .remove([fileName]);

      if (storageError) console.error('Storage deletion error:', storageError);

      // Delete from database
      const { error: dbError } = await supabase
        .from('health_records')
        .delete()
        .eq('id', recordId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Health record deleted successfully!",
      });

      onRecordsUpdate();
    } catch (error: any) {
      console.error('Error deleting record:', error);
      toast({
        title: "Error",
        description: "Failed to delete health record",
        variant: "destructive",
      });
    }
  };

  const downloadFile = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-arogya-dark-teal">Upload Health Record</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Blood Test Report, X-Ray, Prescription"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any additional notes about this record"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              disabled={uploading}
            />
            <p className="text-sm text-gray-500">
              Supported formats: PDF, Images (JPG, PNG), Word documents
            </p>
          </div>

          {uploading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-arogya-dark-green"></div>
              <span className="ml-2">Uploading...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Records List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-arogya-dark-teal">Your Health Records</CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-600">Upload your first health record to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8 text-arogya-dark-green" />
                    <div>
                      <h4 className="font-medium text-gray-900">{record.title}</h4>
                      {record.description && (
                        <p className="text-sm text-gray-600">{record.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>{record.file_name}</span>
                        <span>{formatFileSize(record.file_size)}</span>
                        <span>{new Date(record.uploaded_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadFile(record.file_url, record.file_name)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteRecord(record.id, record.file_url.split('/').pop() || '')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecordsUpload;

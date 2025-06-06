
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface DocumentUpload {
  file: File;
  type: string;
  preview: string;
}

interface DoctorDocumentUploadProps {
  onUploadComplete: () => void;
}

const DoctorDocumentUpload = ({ onUploadComplete }: DoctorDocumentUploadProps) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [uploading, setUploading] = useState(false);

  const documentTypes = [
    { value: 'license', label: 'Medical License' },
    { value: 'id', label: 'Government ID' },
    { value: 'degree', label: 'Medical Degree' },
    { value: 'experience_certificate', label: 'Experience Certificate' },
    { value: 'other', label: 'Other' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Error",
          description: "File size must be less than 10MB",
          variant: "destructive",
        });
        return;
      }

      const newDoc: DocumentUpload = {
        file,
        type: '',
        preview: file.name
      };

      setDocuments(prev => [...prev, newDoc]);
    });
    
    event.target.value = '';
  };

  const updateDocumentType = (index: number, type: string) => {
    setDocuments(prev => prev.map((doc, i) => 
      i === index ? { ...doc, type } : doc
    ));
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const uploadDocuments = async () => {
    if (!user || documents.length === 0) return;

    const incompleteDocuments = documents.filter(doc => !doc.type);
    if (incompleteDocuments.length > 0) {
      toast({
        title: "Error",
        description: "Please select document type for all files",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      for (const doc of documents) {
        const fileExt = doc.file.name.split('.').pop();
        const fileName = `${user.id}/${doc.type}_${Date.now()}.${fileExt}`;

        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from('doctor-documents')
          .upload(fileName, doc.file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('doctor-documents')
          .getPublicUrl(fileName);

        // Save document record
        const { error: dbError } = await supabase
          .from('doctor_documents')
          .insert({
            doctor_id: user.id,
            document_type: doc.type,
            document_name: doc.file.name,
            document_url: publicUrl,
            file_size: doc.file.size
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Success",
        description: "Documents uploaded successfully! Your account is now pending verification.",
      });

      setDocuments([]);
      onUploadComplete();

    } catch (error: any) {
      console.error('Error uploading documents:', error);
      toast({
        title: "Error",
        description: "Failed to upload documents",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-arogya-dark-teal">Upload Verification Documents</CardTitle>
        <p className="text-sm text-gray-600">
          Please upload your medical license, ID, and other verification documents.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="file-upload" className="text-sm font-medium text-gray-700">
            Select Documents
          </Label>
          <div className="mt-1">
            <Input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: PDF, JPG, PNG, DOC, DOCX. Max size: 10MB per file.
          </p>
        </div>

        {documents.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Selected Documents</h4>
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                <FileText className="w-8 h-8 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{doc.preview}</p>
                  <p className="text-xs text-gray-500">
                    {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex-1">
                  <Select value={doc.type} onValueChange={(value) => updateDocumentType(index, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeDocument(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {documents.length > 0 && (
          <Button
            onClick={uploadDocuments}
            disabled={uploading}
            className="w-full bg-arogya-dark-green hover:bg-arogya-light-green text-white"
          >
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorDocumentUpload;

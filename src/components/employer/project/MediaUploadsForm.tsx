
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/types/project";
import { useState } from "react";
import UploadField from "./media-uploads/UploadField";
import { uploadFile } from "./media-uploads/uploadUtils";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  images: z.array(z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .webp formats are supported.")),
  documents: z.array(z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_DOCUMENT_TYPES.includes(file.type), "Only .pdf and .doc formats are supported.")),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const MediaUploadsForm = ({ initialData, onSubmit }: Props) => {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
      documents: [],
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const projectId = initialData.id;
    if (!projectId) {
      toast({
        title: "Error",
        description: "Project ID is required for file uploads",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload images
      for (let i = 0; i < data.images.length; i++) {
        const file = data.images[i];
        setUploadProgress(prev => ({ ...prev, [`image-${i}`]: 0 }));
        
        try {
          await uploadFile(file, 'image', projectId);
          setUploadProgress(prev => ({ ...prev, [`image-${i}`]: 100 }));
        } catch (error) {
          toast({
            title: "Upload Error",
            description: `Failed to upload image ${file.name}`,
            variant: "destructive",
          });
        }
      }

      // Upload documents
      for (let i = 0; i < data.documents.length; i++) {
        const file = data.documents[i];
        setUploadProgress(prev => ({ ...prev, [`document-${i}`]: 0 }));
        
        try {
          await uploadFile(file, 'document', projectId);
          setUploadProgress(prev => ({ ...prev, [`document-${i}`]: 100 }));
        } catch (error) {
          toast({
            title: "Upload Error",
            description: `Failed to upload document ${file.name}`,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Success",
        description: "All files uploaded successfully",
      });

      onSubmit(data);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight" id="upload-section-title">
          Media Uploads
        </h2>
        <p className="text-muted-foreground">
          Add photos and documents to help learners understand your project better.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Images should be clear and well-lit. Documents should be in PDF or DOC format.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form
          id="step-5-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
          aria-labelledby="upload-section-title"
        >
          <UploadField
            field={form.getValues("images")}
            uploadProgress={uploadProgress}
            type="image"
          />
          <UploadField
            field={form.getValues("documents")}
            uploadProgress={uploadProgress}
            type="document"
          />

          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MediaUploadsForm;

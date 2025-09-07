
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, BarChart3, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File uploaded",
        description: `${selectedFile.name} is ready for analysis`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !question.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a file and enter your question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Analysis complete",
        description: "Your data has been analyzed successfully",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="section-title text-foreground mb-4">
            Your AI Data Analyst
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload your data and ask any question. Get instant insights powered by AI.
          </p>
        </div>

        {/* Main Form */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Upload your data file
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.xlsx,.json,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    {file ? file.name : "Drop your file here or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports CSV, Excel, JSON, and text files
                  </p>
                </div>
              </div>
            </div>

            {/* Question Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                What would you like to know about your data?
              </label>
              <Textarea
                placeholder="E.g., What are the key trends in my sales data? Which factors correlate with customer satisfaction?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!file || !question.trim() || isLoading}
              className="w-full button-primary h-12 text-base"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analyze Data
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Upload className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Easy Upload</h3>
            <p className="text-sm text-muted-foreground">
              Support for multiple file formats
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Advanced analytics and insights
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Instant Results</h3>
            <p className="text-sm text-muted-foreground">
              Get answers in seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

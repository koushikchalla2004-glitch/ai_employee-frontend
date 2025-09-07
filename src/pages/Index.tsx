
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, BarChart3, Brain, Sparkles, Database, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();
  const WEBHOOK_URL = "https://koushikchall.app.n8n.cloud/webhook-test/57101393-db62-4300-8725-2ddf9a0d8b1b";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File uploaded successfully",
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
    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("file", file);
      formData.append("filename", file.name);
      formData.append("mimetype", file.type || "application/octet-stream");
      formData.append("size", String(file.size));

      console.log("Sending to n8n webhook:", WEBHOOK_URL, {
        question,
        filename: file.name,
        size: file.size,
        mimetype: file.type,
      });

      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      toast({
        title: "Request sent",
        description: "Your data was sent to n8n. Check Executions to view it.",
      });
    } catch (error) {
      console.error("Error sending to n8n:", error);
      toast({
        title: "Error",
        description: "Failed to send to n8n webhook. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className="h-screen overflow-hidden relative bg-cover flex items-center justify-center" 
      style={{
        backgroundImage: 'url("/Header-background.webp")',
        backgroundPosition: 'center 30%', 
        padding: isMobile ? '20px 12px' : '40px 20px'
      }}
    >
      {/* Background gradient overlays */}
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animation */}
        <div className="text-center mb-8">
          <div 
            className="pulse-chip mb-4 opacity-0 animate-fade-in inline-flex items-center"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
              <Brain className="w-3 h-3" />
            </span>
            <span>AI-Powered Analytics</span>
          </div>
          
          <h1 
            className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in mb-4" 
            style={{ animationDelay: "0.3s" }}
          >
            Your AI Data<br className="hidden sm:inline" />Analyst
          </h1>
          
          <p 
            style={{ animationDelay: "0.5s" }} 
            className="section-subtitle opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Transform your data into actionable insights. Upload any dataset and ask questions in natural language.
          </p>
        </div>

        {/* Main Interface */}
        <div 
          className="glass-card p-6 sm:p-8 max-w-2xl mx-auto opacity-0 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced File Upload */}
            <div className="space-y-3">
              <label className="text-base font-semibold text-gray-900 block">
                Upload your dataset
              </label>
              <div className="relative group">
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.xlsx,.xls,.json,.txt,.tsv"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 ${
                  file 
                    ? 'border-pulse-500 bg-pulse-50/50' 
                    : 'border-gray-300 group-hover:border-pulse-400 group-hover:bg-pulse-50/30'
                }`}>
                  <div className="flex flex-col items-center">
                    {file ? (
                      <>
                        <FileText className="h-10 w-10 text-pulse-500 mb-3" />
                        <p className="text-base font-medium text-gray-900 mb-1">{file.name}</p>
                        <p className="text-sm text-gray-600">File uploaded successfully</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 group-hover:text-pulse-500 mb-3 transition-colors" />
                        <p className="text-base font-medium text-gray-900 mb-1">
                          Drop your data file here or click to browse
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          Supports CSV, Excel, JSON, TSV, and text files up to 10MB
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded">.csv</span>
                          <span className="px-2 py-1 bg-gray-100 rounded">.xlsx</span>
                          <span className="px-2 py-1 bg-gray-100 rounded">.json</span>
                          <span className="px-2 py-1 bg-gray-100 rounded">.txt</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Question Input */}
            <div className="space-y-3">
              <label className="text-base font-semibold text-gray-900 block">
                What insights are you looking for?
              </label>
              <Textarea
                placeholder="Ask me anything about your data... 

Examples:
• What are the main trends and patterns?
• Which factors drive the highest performance?
• Can you identify any outliers or anomalies?
• What correlations exist between different variables?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="resize-none text-sm leading-relaxed"
              />
            </div>

            {/* Enhanced Submit Button */}
            <Button
              type="submit"
              disabled={!file || !question.trim() || isLoading}
              className="w-full h-12 text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: '#FE5C02',
                borderRadius: '1440px',
                color: '#FFFFFF',
                border: 'none',
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing your data...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Insights</span>
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Enhanced Features Grid */}
        <div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="text-center group">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <Database className="h-6 w-6 text-pulse-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Data Processing</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Automatically understands your data structure and prepares it for analysis
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <Brain className="h-6 w-6 text-pulse-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced AI Analytics</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Powered by cutting-edge AI to uncover deep insights and patterns
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <BarChart3 className="h-6 w-6 text-pulse-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Visualizations</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Get beautiful charts and graphs along with detailed explanations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, BarChart3, Brain, Sparkles, Database, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();
  const WEBHOOK_URL = "https://koushikchall.app.n8n.cloud/webhook-test/submit";

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
    if (!file || !question.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a file, enter your email, and enter your question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("email", email);
      formData.append("file", file);
      formData.append("filename", file.name);
      formData.append("mimetype", file.type || "application/octet-stream");
      formData.append("size", String(file.size));

      console.log("Sending to n8n webhook:", WEBHOOK_URL, {
        question,
        email,
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
      
      <div className="w-full max-w-3xl mx-auto px-4 relative z-10">
        {/* Header with animation */}
        <div className="text-center mb-6">
          <div 
            className="pulse-chip mb-3 opacity-0 animate-fade-in inline-flex items-center text-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-pulse-500 text-white mr-2">
              <Brain className="w-2.5 h-2.5" />
            </span>
            <span>AI-Powered Analytics</span>
          </div>
          
          <h1 
            className="section-title text-2xl sm:text-3xl lg:text-4xl leading-tight opacity-0 animate-fade-in mb-3" 
            style={{ animationDelay: "0.3s" }}
          >
            Your AI Data Analyst
          </h1>
          
          <p 
            style={{ animationDelay: "0.5s" }} 
            className="section-subtitle opacity-0 animate-fade-in text-gray-950 font-normal text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Transform your data into actionable insights. Upload any dataset and ask questions.
          </p>
        </div>

        {/* Main Interface */}
        <div 
          className="glass-card p-4 sm:p-6 max-w-xl mx-auto opacity-0 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Enhanced File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 block">
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
                <div className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all duration-300 ${
                  file 
                    ? 'border-pulse-500 bg-pulse-50/50' 
                    : 'border-gray-300 group-hover:border-pulse-400 group-hover:bg-pulse-50/30'
                }`}>
                  <div className="flex flex-col items-center">
                    {file ? (
                      <>
                        <FileText className="h-8 w-8 text-pulse-500 mb-2" />
                        <p className="text-sm font-medium text-gray-900 mb-1">{file.name}</p>
                        <p className="text-xs text-gray-600">File uploaded successfully</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 group-hover:text-pulse-500 mb-2 transition-colors" />
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Drop your data file here or click to browse
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          Supports CSV, Excel, JSON, TSV, and text files up to 10MB
                        </p>
                        <div className="flex flex-wrap justify-center gap-1 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">.csv</span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">.xlsx</span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">.json</span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">.txt</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-900 block">
                Email address
              </label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs h-8"
                required
              />
            </div>

            {/* Enhanced Question Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 block">
                What insights are you looking for?
              </label>
              <Textarea
                placeholder="Ask me anything about your data... 

Examples:
• What are the main trends and patterns?
• Which factors drive the highest performance?
• Can you identify any outliers or anomalies?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                className="resize-none text-xs leading-relaxed"
              />
            </div>

            {/* Enhanced Submit Button */}
            <Button
              type="submit"
              disabled={!file || !question.trim() || !email.trim() || isLoading}
              className="w-full h-10 text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: '#FE5C02',
                borderRadius: '1440px',
                color: '#FFFFFF',
                border: 'none',
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing your data...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Insights</span>
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Enhanced Features Grid */}
        <div 
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="text-center group">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <Database className="h-5 w-5 text-pulse-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Smart Data Processing</h3>
            <p className="text-gray-700 leading-relaxed text-xs">
              Automatically understands your data structure and prepares it for analysis
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <Brain className="h-5 w-5 text-pulse-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Advanced AI Analytics</h3>
            <p className="text-gray-700 leading-relaxed text-xs">
              Powered by cutting-edge AI to uncover deep insights and patterns
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <BarChart3 className="h-5 w-5 text-pulse-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Instant Visualizations</h3>
            <p className="text-gray-700 leading-relaxed text-xs">
              Get beautiful charts and graphs along with detailed explanations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;

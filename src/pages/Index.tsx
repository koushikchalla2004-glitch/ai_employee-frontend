
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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Analysis complete",
        description: "Your data insights are ready to explore",
      });
    }, 2000);
  };

  return (
    <section 
      className="min-h-screen overflow-hidden relative bg-cover flex items-center justify-center" 
      style={{
        backgroundImage: 'url("/Header-background.webp")',
        backgroundPosition: 'center 30%', 
        padding: isMobile ? '60px 12px' : '80px 20px'
      }}
    >
      {/* Background gradient overlays */}
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animation */}
        <div className="text-center mb-12">
          <div 
            className="pulse-chip mb-6 opacity-0 animate-fade-in inline-flex items-center" 
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">
              <Brain className="w-3 h-3" />
            </span>
            <span>AI-Powered Analytics</span>
          </div>
          
          <h1 
            className="section-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight opacity-0 animate-fade-in mb-6" 
            style={{ animationDelay: "0.3s" }}
          >
            Your AI Data<br className="hidden sm:inline" />Analyst
          </h1>
          
          <p 
            style={{ animationDelay: "0.5s" }} 
            className="section-subtitle opacity-0 animate-fade-in text-gray-950 font-normal text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Transform your data into actionable insights. Upload any dataset and ask questions in natural language.
          </p>
        </div>

        {/* Main Interface */}
        <div 
          className="glass-card p-8 sm:p-10 max-w-3xl mx-auto opacity-0 animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Enhanced File Upload */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
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
                <div className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                  file 
                    ? 'border-pulse-500 bg-pulse-50/50' 
                    : 'border-gray-300 group-hover:border-pulse-400 group-hover:bg-pulse-50/30'
                }`}>
                  <div className="flex flex-col items-center">
                    {file ? (
                      <>
                        <FileText className="h-12 w-12 text-pulse-500 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">{file.name}</p>
                        <p className="text-sm text-gray-600">File uploaded successfully</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 group-hover:text-pulse-500 mb-4 transition-colors" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Drop your data file here or click to browse
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
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
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-900 block">
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
                rows={6}
                className="resize-none text-base leading-relaxed"
              />
            </div>

            {/* Enhanced Submit Button */}
            <Button
              type="submit"
              disabled={!file || !question.trim() || isLoading}
              className="w-full h-14 text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
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
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="text-center group">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <Database className="h-8 w-8 text-pulse-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Data Processing</h3>
            <p className="text-gray-700 leading-relaxed">
              Automatically understands your data structure and prepares it for analysis
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <Brain className="h-8 w-8 text-pulse-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced AI Analytics</h3>
            <p className="text-gray-700 leading-relaxed">
              Powered by cutting-edge AI to uncover deep insights and patterns
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant group-hover:shadow-elegant-hover transition-all duration-300 group-hover:scale-110">
              <BarChart3 className="h-8 w-8 text-pulse-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Visualizations</h3>
            <p className="text-gray-700 leading-relaxed">
              Get beautiful charts and graphs along with detailed explanations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;

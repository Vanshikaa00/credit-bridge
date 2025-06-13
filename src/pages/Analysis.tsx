import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  FileText,
  Shield,
  TrendingUp,
  CheckCircle,
  Clock,
  BarChart3,
  Search,
  Calculator,
  Eye,
} from "lucide-react";

interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "processing" | "completed";
  duration: number;
}

const Analysis = () => {
  document.documentElement.style.backgroundColor = '#f8fbff';
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const files = location.state?.files || [];
  const totalFiles = location.state?.totalFiles || 0;
 

  const analysisSteps: AnalysisStep[] = [
    {
      id: "document-processing",
      title: "Document Processing",
      description: "Extracting and validating data from uploaded documents",
      icon: <FileText className="h-5 w-5" />,
      status: "pending",
      duration: 8,
    },
    {
      id: "fraud-detection",
      title: "Fraud Detection",
      description: "Scanning for synthetic identity patterns and anomalies",
      icon: <Shield className="h-5 w-5" />,
      status: "pending",
      duration: 12,
    },
    {
      id: "pattern-analysis",
      title: "Pattern Analysis",
      description: "Analyzing payment patterns and financial behavior",
      icon: <Search className="h-5 w-5" />,
      status: "pending",
      duration: 15,
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment",
      description: "Evaluating creditworthiness using AI algorithms",
      icon: <BarChart3 className="h-5 w-5" />,
      status: "pending",
      duration: 10,
    },
    {
      id: "score-calculation",
      title: "Score Calculation",
      description: "Generating final credit score and recommendations",
      icon: <Calculator className="h-5 w-5" />,
      status: "pending",
      duration: 8,
    },
    {
      id: "explainability",
      title: "Explainability Report",
      description: "Creating transparent explanation of decision factors",
      icon: <Eye className="h-5 w-5" />,
      status: "pending",
      duration: 7,
    },
  ];

  const [steps, setSteps] = useState(analysisSteps);

  useEffect(() => {
    if (!files || files.length === 0) {
      navigate("/upload");
      return;
    }

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [files, navigate]);

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsedTime = 0;

    const stepTimers = steps.map((step, index) => {
      return setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) =>
            i === index ? { ...s, status: "processing" } : s,
          ),
        );

        setTimeout(() => {
          setSteps((prev) =>
            prev.map((s, i) =>
              i === index ? { ...s, status: "completed" } : s,
            ),
          );
          setCurrentStep(index + 1);
        }, step.duration * 100);
      }, elapsedTime * 100);
    });

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 100 / totalDuration, 100);
        if (newProgress >= 100) {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/results", {
              state: {
                files,
                analysisComplete: true,
                processingTime: timeElapsed,
              },
            });
          }, 1000);
        }
        return newProgress;
      });
    }, 100);

    return () => {
      stepTimers.forEach((timer) => clearTimeout(timer));
      clearInterval(progressTimer);
    };
  }, [files, navigate, timeElapsed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success-600 bg-success-100 border-success-200";
      case "processing":
        return "text-brand-600 bg-brand-100 border-brand-200";
      default:
        return "text-slate-600 bg-slate-100 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                CreditBridge
              </span>
            </div>
            <Badge className="bg-brand-100 text-brand-700 border-brand-200">
              Step 2 of 3
            </Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="h-10 w-10 text-white animate-pulse-scale" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Analyzing Your Documents
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our AI is processing your financial documents to generate your
              credit score and loan recommendations.
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    Analysis Progress
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Processing {totalFiles} documents • Time elapsed:{" "}
                    {formatTime(timeElapsed)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Complete
                  </div>
                </div>
              </div>
              <Progress value={progress} className="h-3 mb-4" />
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>
                  Step {currentStep} of {steps.length}
                </span>
                <span>Est. {Math.max(0, 60 - timeElapsed)}s remaining</span>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`transition-all duration-500 ${
                    step.status === "processing"
                      ? "ring-2 ring-brand-200 dark:ring-brand-800"
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          step.status === "completed"
                            ? "bg-success-100 dark:bg-success-900/50 text-success-600 dark:text-success-400"
                            : step.status === "processing"
                              ? "bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : step.status === "processing" ? (
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          step.icon
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {step.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStepStatusColor(step.status)}`}
                          >
                            {step.status === "completed"
                              ? "Completed"
                              : step.status === "processing"
                                ? "Processing..."
                                : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {step.description}
                        </p>
                        {step.status === "processing" && (
                          <div className="mt-3">
                            <Progress value={75} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Security Notice */}
          <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Secure Processing
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Your documents are being processed in a secure, encrypted
                    environment. All analysis happens in real-time and your data
                    is automatically deleted after score generation to ensure
                    maximum privacy protection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features During Analysis */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Pattern Recognition
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Identifying financial patterns across all your documents
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Real-time Analysis
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Processing happens instantly with no delays or queues
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Eye className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Transparent Results
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Complete explanation of how your score was calculated
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analysis;

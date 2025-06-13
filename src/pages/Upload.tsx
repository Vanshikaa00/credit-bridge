import { useState, useRef, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useUpload } from '../context/UploadContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload as UploadIcon,
  FileText,
  CreditCard,
  Receipt,
  TrendingUp,
  X,
  CheckCircle,
  AlertCircle,
  Brain,
  ArrowLeft,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: "uploading" | "success" | "error";
  category: string;
}

const Upload = () => {
  document.documentElement.style.backgroundColor = "#f8fbff";
  const navigate = useNavigate();
  const [isAnalysisDisabled, setIsAnalysisDisabled] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loanAmount, setLoanAmount] = useState(null);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [creditHistory, setCreditHistory] = useState<
    "has-credit" | "no-credit"
  >("no-credit");
  const formRef = useRef();
  const docRef = useRef();
  const [creditHistoryStatus, setCreditHistoryStatus] = useState(false);
  const [showDocumentTiles, setShowDocumentTiles] = useState(false);
  const [showDropFiles, setShowDropFiles] = useState(false);
  const [showSecurityNotice, setShowSecurityNotice] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [showHaveCreditHistory, setShowHaveCreditHistory] = useState(false);
  const [showDoNotHaveCreditHistory, setShowDoNotHaveCreditHistory] =
    useState(false);
  const [showProceedFurther, setShowProceedFurther] = useState(false);
  const { setData } = useUpload();
  const handleProceedFurther = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setShowDocumentTiles(true);
      setShowDropFiles(true);
      setShowSecurityNotice(true);
      setShowActionButtons(true);
    } else {
      setShowDocumentTiles(false);
      setShowDropFiles(false);
      setShowSecurityNotice(false);
      setShowActionButtons(false);
    }
  };

  const documentTypes = [
    {
      category: "Bank Statements",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Recent bank statements showing transaction history",
      examples: [
        "Checking account statements",
        "Savings account statements",
        "Payment history",
      ],
      required: true,
    },
    {
      category: "Utility Bills",
      icon: <Receipt className="h-5 w-5" />,
      description: "Monthly utility and service payment records",
      examples: [
        "Electricity bills",
        "Water bills",
        "Internet/Phone bills",
        "Gas bills",
      ],
      required: false,
    },
    {
      category: "Investment Records",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Investment account statements and records",
      examples: [
        "Brokerage statements",
        "401k statements",
        "Investment portfolios",
      ],
      required: false,
    },
    {
      category: "Insurance Payments",
      icon: <FileText className="h-5 w-5" />,
      description: "Insurance payment history and statements",
      examples: [
        "Auto insurance",
        "Health insurance",
        "Renters/Home insurance",
      ],
      required: false,
    },
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        status: "uploading",
        category: getCategoryFromFileName(file.name),
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      // Simulate fast upload process
      setTimeout(
        () => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === newFile.id
                ? { ...f, status: Math.random() > 0.05 ? "success" : "error" }
                : f,
            ),
          );
        },
        200 + Math.random() * 300,
      );
    });
  };

  const getCategoryFromFileName = (fileName: string): string => {
    const name = fileName.toLowerCase();
    if (
      name.includes("bank") ||
      name.includes("statement") ||
      name.includes("checking") ||
      name.includes("savings")
    ) {
      return "Bank Statements";
    }
    if (
      name.includes("utility") ||
      name.includes("electric") ||
      name.includes("water") ||
      name.includes("gas")
    ) {
      return "Utility Bills";
    }
    if (
      name.includes("investment") ||
      name.includes("brokerage") ||
      name.includes("401k")
    ) {
      return "Investment Records";
    }
    if (name.includes("insurance")) {
      return "Insurance Payments";
    }
    return "Other";
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getUploadProgress = () => {
    const totalFiles = uploadedFiles.length;
    const completedFiles = uploadedFiles.filter(
      (f) => f.status === "success",
    ).length;
    return totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0;
  };

  // const canProceed = () => {
  //   const hasRequiredDocs = uploadedFiles.some(
  //     (f) => f.category === "Bank Statements" && f.status === "success",
  //   );

  //   if (creditHistory === "has-credit") {
  //     // For users with credit history, only bank statements are required
  //     return hasRequiredDocs && agreedToTerms && agreedToPrivacy;
  //   } else {
  //     // For users without credit history, need bank statements + other documents
  //     const hasOtherDocs = uploadedFiles.some(
  //       (f) => f.category !== "Bank Statements" && f.status === "success",
  //     );
  //     return (
  //       hasRequiredDocs && hasOtherDocs && agreedToTerms && agreedToPrivacy
  //     );
  //   }
  // };

  const handleAnalyze = () => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    // navigate("/analysis", {
    //   state: {
    //     files: uploadedFiles.filter((f) => f.status === "success"),
    //     totalFiles: uploadedFiles.filter((f) => f.status === "success").length,
    //   },
    // });
    // navigate("/analysis");
    const form = docRef.current;
    const formData = new FormData(form);
    let bankStatement = formData.get("bankStatement");

    if (bankStatement && bankStatement instanceof File) {
      console.log("Filename:", bankStatement.name);
      console.log("Type:", bankStatement.type);
      console.log("Size:", bankStatement.size);

      // Optional: convert to Blob explicitly
      const blob = new Blob([bankStatement], { type: bankStatement.type });
      // const uploadForm = new FormData();

      // uploadForm.append("loan_amount ", loanAmount);
      // uploadForm.append("bank_statements", blob, bankStatement.name);

      const uploadForm = {
        loan_amount: loanAmount,
        bank_statements: bankStatement,
      };

      evaluateApplication(uploadForm, bankStatement);
    }
  };

  async function evaluateApplication(data: any, uploadedFiles) {
    try {
      let results
      let url = "/api/evaluate-loan" + `?loan_amount=${data.loan_amount}`;
      await fetch(url, {
        method: "POST",
        body: data,
      }).then((res)=>{
        return res.json
      }).then(resp=>results=resp);
      debugger;
      if (results) {
        
        window.scrollTo({ top: 0, behavior: "smooth" });
        debugger;
        navigate("/analysis", {
          state: {
            files: uploadedFiles.name,
            totalFiles: 1,
          },
        });

setData(results)


      }
    } catch (error) {
      console.error("🚨 Evaluate Application error:", error);
    }
  }

  async function fetchFormData(formData) {
    try {
      let generateUrl = "/api/get-credit-score?";
      for (const [key, value] of Object.entries(formData)) {
        generateUrl += `${key}=${value}&`;
      }

      const response = await fetch(generateUrl);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);

      if (data.creditHistoryStatus === 0) {
        setCreditHistoryStatus(true);
        setShowHaveCreditHistory(false);
        setShowDoNotHaveCreditHistory(true);
        setShowProceedFurther(true);
      } else if (data.creditHistoryStatus === 1) {
        setCreditHistoryStatus(true);
        setShowHaveCreditHistory(true);
        setShowDoNotHaveCreditHistory(false);
        setShowProceedFurther(false);
        setShowActionButtons(true);
        setIsAnalysisDisabled(false);
      }

      // console.log("✅ Response:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("🚨 fetchFormData error:", error);
    }
  }

  const handleAgreeTerms = (
    event: ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (type === "terms") {
      setAgreedToTerms(event.target.checked);
      if (event.target.checked && agreedToPrivacy) {
        setIsAnalysisDisabled(false);
      } else {
        setIsAnalysisDisabled(true);
      }
    } else if (type === "privacy") {
      setAgreedToPrivacy(event.target.checked);
      if (event.target.checked && agreedToTerms) {
        setIsAnalysisDisabled(false);
      } else {
        setIsAnalysisDisabled(true);
      }
    }
  };

  const handleSubmitDetails = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    let obj = {
      name: formData.get("name"),
      ssn: formData.get("ssn"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
    };

    setLoanAmount(formData.get("loanAmount"));
    fetchFormData(obj);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/");
                }}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  CreditBridge
                </span>
              </button>
            </div>
            <div className="flex  items-center space-x-2">
              {/* <span className="text-sm text-slate-600 dark:text-slate-400">
                Smart Data
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  onChange={($event) => handleSmartDataToggle($event)}
                  checked={isSmartDataEnabled}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-600"></div>
              </label> */}
              <Badge className="bg-brand-100 text-brand-700 border-brand-200">
                Step 1 of 3
              </Badge>
            </div>
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
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Add Your Details
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Provide your financial details/documents for AI analysis. We'll
              use this information to generate your credit score and loan
              recommendations.
            </p>
          </div>

          {/* Progress */}
          {uploadedFiles.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Upload Progress</CardTitle>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {uploadedFiles.filter((f) => f.status === "success").length}{" "}
                    of {uploadedFiles.length} files completed
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={getUploadProgress()} className="h-2" />
              </CardContent>
            </Card>
          )}

          {/* User Input Form */}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Enter User Details
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Fill in the information below to process your application.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form ref={formRef} className="space-y-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    name="name"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    type="text"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    SSN
                  </label>
                  <input
                    name="ssn"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    type="text"
                    placeholder="XXX-XX-XXXX"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    type="number"
                    placeholder="e.g. 7658901234"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    name="email"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Loan Amount(in $)
                  </label>
                  <input
                    name="loanAmount"
                    className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    type="number"
                    placeholder="Enter loan amount"
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-medium"
                  onClick={($event) => handleSubmitDetails($event)}
                >
                  Submit Details
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Credit History Selection */}

          {creditHistoryStatus && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Credit History Status</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Your current credit history is:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {showHaveCreditHistory && (
                    <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Have credit history
                        </div>

                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          I have existing credit cards, loans, or credit reports
                        </div>
                      </div>
                    </label>
                  )}
                  {showDoNotHaveCreditHistory && (
                    <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          Do not have credit history
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          I'm new to credit or have limited credit history
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Show Documents */}
          {showProceedFurther && (
            <Card className="mb-8">
              <CardContent className="flex items-center mt-3">
                <div className="flex ">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Want to proceed further?
                  </span>
                  <label className="relative ms-2 inline-flex items-center cursor-pointer">
                    <input
                      onChange={($event) => handleProceedFurther($event)}
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-600"></div>
                  </label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Credit History Selection */}
          {/* <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Credit History Status</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Select your current credit history status to see relevant
                document requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <input
                    type="radio"
                    name="creditHistory"
                    value="has-credit"
                    checked={creditHistory === "has-credit"}
                    onChange={(e) =>
                      setCreditHistory(
                        e.target.value as "has-credit" | "no-credit",
                      )
                    }
                    className="w-4 h-4 text-brand-600 bg-slate-100 border-slate-300 focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      I have credit history
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      I have existing credit cards, loans, or credit reports
                    </div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <input
                    type="radio"
                    name="creditHistory"
                    value="no-credit"
                    checked={creditHistory === "no-credit"}
                    onChange={(e) =>
                      setCreditHistory(
                        e.target.value as "has-credit" | "no-credit",
                      )
                    }
                    className="w-4 h-4 text-brand-600 bg-slate-100 border-slate-300 focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      I do not have credit history
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      I'm new to credit or have limited credit history
                    </div>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card> */}

          {/* Document Types Tiles */}

          {showDocumentTiles && (
            <div
              className={`gap-6 mb-8 ${
                creditHistory === "has-credit"
                  ? "flex justify-center"
                  : "grid md:grid-cols-2"
              }`}
            >
              {documentTypes
                .filter((type) =>
                  creditHistory === "has-credit"
                    ? type.category === "Bank Statements"
                    : true,
                )
                .map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      className={`h-full ${type.required ? "ring-2 ring-brand-200 dark:ring-brand-800" : ""} ${
                        creditHistory === "has-credit" ? "w-96" : ""
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/50 rounded-lg flex items-center justify-center">
                              <div className="text-brand-600 dark:text-brand-400">
                                {type.icon}
                              </div>
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {type.category}
                              </CardTitle>
                              {type.required && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs mt-1 bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-medium"
                                >
                                  Required
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {type.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                            Examples:
                          </p>
                          {type.examples.map((example, i) => (
                            <p
                              key={i}
                              className="text-xs text-slate-500 dark:text-slate-500"
                            >
                              • {example}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          )}

          {/* Upload Area */}
          {/* <Card className="mb-8">
            <CardContent className="p-0">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  isDragOver
                    ? "border-brand-400 bg-brand-50/50 dark:bg-brand-900/20"
                    : "border-slate-300 dark:border-slate-600 hover:border-brand-300 dark:hover:border-brand-700"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-2xl flex items-center justify-center">
                    <UploadIcon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Drop files here or click to upload
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Support for PDF, PNG, JPG files up to 10MB each
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="relative"
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
                  >
                    Choose Files
                    <input
                      id="file-input"
                      type="file"
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/*Upload bank statements and utility bills area */}

          {showDropFiles && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Drop files here or click to upload
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Support for PDF, PNG, JPG files up to 10MB each
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  ref={docRef}
                  className="space-y-6"
                  encType="multipart/form-data"
                >
                  {/* File Upload for Bank Statement */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="bankStatement"
                      className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Upload Bank Statement
                    </label>
                    <input
                      id="bankStatement"
                      name="bankStatement"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-sky-100 file:text-sky-700
                     hover:file:bg-sky-200
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>

                  {/* File Upload for Utility Bill */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="utilityBill"
                      className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Upload Utility Bill
                    </label>
                    <input
                      id="utilityBill"
                      name="utilityBill"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-sky-100 file:text-sky-700
                     hover:file:bg-sky-200
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Uploaded Files */}
          {/* {uploadedFiles.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
                <CardDescription>
                  Review your uploaded documents before proceeding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">
                            {file.name}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                            <span>{file.category}</span>
                            <span>•</span>
                            <span>{formatFileSize(file.size)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.status === "uploading" && (
                          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        {file.status === "success" && (
                          <CheckCircle className="w-5 h-5 text-success-500" />
                        )}
                        {file.status === "error" && (
                          <AlertCircle className="w-5 h-5 text-error-500" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-8 w-8 p-0 hover:bg-error-100 dark:hover:bg-error-900/50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )} */}

          {/* Security Notice */}

          {showSecurityNotice && (
            <>
              <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg p-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-brand-900 dark:text-brand-100 mb-1">
                      Your Data is Secure
                    </h4>
                    <p className="text-sm text-brand-700 dark:text-brand-300">
                      All documents are encrypted during upload and processing.
                      We use bank-grade security and never store your documents
                      longer than necessary for analysis.
                    </p>
                  </div>
                </div>
              </div>
              {/* Terms and Conditions */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Privacy & Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => handleAgreeTerms(e, "terms")}
                        className="w-4 h-4 text-brand-600 bg-slate-100 border-slate-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <label
                      htmlFor="terms"
                      className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-brand-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and understand that my documents will be analyzed using AI
                      technology to generate credit assessments.
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        type="checkbox"
                        checked={agreedToPrivacy}
                        onChange={(e) => handleAgreeTerms(e, "privacy")}
                        className="w-4 h-4 text-brand-600 bg-slate-100 border-slate-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <label
                      htmlFor="privacy"
                      className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed cursor-pointer"
                    >
                      I acknowledge the{" "}
                      <a href="#" className="text-brand-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and consent to the secure processing of my financial data
                      for credit assessment purposes.
                    </label>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Action Buttons */}

          {showActionButtons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/");
                }}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>

              <Button
                disabled={isAnalysisDisabled}
                onClick={handleAnalyze}
                className="bg-brand-600 hover:bg-brand-700 text-white flex items-center space-x-2"
              >
                <span>Start Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              {/* <Button
              onClick={handleAnalyze}
              disabled={!canProceed()}
              className="bg-brand-600 hover:bg-brand-700 text-white flex items-center space-x-2"
            >
              <span>Start Analysis</span>
              <ArrowRight className="h-4 w-4" />
            </Button> */}
            </div>
          )}
          {/* {!canProceed() && uploadedFiles.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {!uploadedFiles.some(
                  (f) =>
                    f.category === "Bank Statements" && f.status === "success",
                ) && "Please upload at least one bank statement. "}
                {creditHistory === "no-credit" &&
                  !uploadedFiles.some(
                    (f) =>
                      f.category !== "Bank Statements" &&
                      f.status === "success",
                  ) &&
                  "Please upload at least one additional document type. "}
                {(!agreedToTerms || !agreedToPrivacy) &&
                  "Please agree to the terms and privacy policy."}
              </p>
            </div>
          )} */}
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;

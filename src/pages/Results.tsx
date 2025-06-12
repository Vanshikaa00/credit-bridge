import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Share2,
  RefreshCw,
  ArrowRight,
  BarChart3,
  PieChart,
  Info,
} from "lucide-react";

interface LoanOption {
  id: string;
  amount: number;
  apr: number;
  term: number;
  monthlyPayment: number;
  type: string;
  recommended: boolean;
}

interface ScoreFactors {
  category: string;
  impact: "positive" | "negative" | "neutral";
  score: number;
  description: string;
  weight: number;
}
var actualData: {
  loanOptions: LoanOption[];
  scoreFactors: ScoreFactors[];
  assessmentSummary: {
    fraudScore: {
      value: number;
      label: string;
    };
  };
  creditScore: { score: number };
};
let response = await fetch(
  "https://run.mocky.io/v3/fdbdee4f-1368-4147-8072-be51bac0b369",
);
if (response.ok) {
  let json = await response.json();
  actualData = json;

  console.log("🚀 ~ actualData:", actualData);
}
const Results = () => {
    document.documentElement.style.backgroundColor = '#f8fbff';
  const navigate = useNavigate();
  const location = useLocation();
  const [currentScore, setCurrentScore] = useState(0);
  const [animateScore, setAnimateScore] = useState(false);

  const files = location.state?.files || [];
  const analysisComplete = location.state?.analysisComplete || false;
  const processingTime = location.state?.processingTime || 45;

  // Simulated credit score (in real app, this would come from the AI analysis)
  const finalScore = 82;
  const creditGrade = getCreditGrade(finalScore);

  // const loanOptions: LoanOption[] = [
  //   {
  //     id: "personal-recommended",
  //     amount: 25000,
  //     apr: 8.5,
  //     term: 36,
  //     monthlyPayment: 789,
  //     type: "Personal Loan",
  //     recommended: true,
  //   },
  //   {
  //     id: "personal-standard",
  //     amount: 20000,
  //     apr: 9.2,
  //     term: 24,
  //     monthlyPayment: 918,
  //     type: "Personal Loan",
  //     recommended: false,
  //   },
  //   {
  //     id: "secured",
  //     amount: 35000,
  //     apr: 6.8,
  //     term: 48,
  //     monthlyPayment: 827,
  //     type: "Secured Loan",
  //     recommended: false,
  //   },
  // ];

  // const scoreFactors: ScoreFactors[] = [
  //   {
  //     category: "Payment History",
  //     impact: "positive",
  //     score: 92,
  //     description: "Consistent on-time payments across all accounts",
  //     weight: 35,
  //   },
  //   {
  //     category: "Account Diversity",
  //     impact: "positive",
  //     score: 85,
  //     description: "Good mix of account types (checking, savings, investments)",
  //     weight: 25,
  //   },
  //   {
  //     category: "Income Stability",
  //     impact: "positive",
  //     score: 88,
  //     description: "Stable income pattern observed over 12+ months",
  //     weight: 20,
  //   },
  //   {
  //     category: "Spending Patterns",
  //     impact: "neutral",
  //     score: 75,
  //     description: "Moderate spending with occasional large purchases",
  //     weight: 15,
  //   },
  //   {
  //     category: "Account Age",
  //     impact: "negative",
  //     score: 65,
  //     description: "Limited account history compared to ideal length",
  //     weight: 5,
  //   },
  // ];

  var loanOptions: LoanOption[] = actualData.loanOptions;
  var scoreFactors: ScoreFactors[] = actualData.scoreFactors;

  useEffect(() => {
    if (!analysisComplete) {
      navigate("/upload");
      return;
    }

    // async function getData() {
    //   try {
    //     let response = await fetch(
    //       "https://run.mocky.io/v3/da98212c-095d-4253-a302-7cedce023775",
    //     );
    //     if (response.ok) {
    //       let json = await response.json();
    //       actualData = json;
    //     }
    //   } catch (error) {
    //     console.error("Network error:", error);
    //   }
    // }

    // getData();

    // Animate score counting up
    const timer = setTimeout(() => {
      setAnimateScore(true);
      const interval = setInterval(() => {
        setCurrentScore((prev) => {
          if (prev >= actualData.creditScore.score) {
            clearInterval(interval);
            let val = actualData.creditScore.score;
            console.log(
              "🚀 ~ setCurrentScore ~ actualData.creditScore.score:",
              actualData.creditScore.score,
            );
            console.log("🚀 ~ setCurrentScore ~ val:", val);
            return val;
          }
          return prev + 1;
        });
      }, 30);
    }, 500);

    return () => clearTimeout(timer);
  }, [analysisComplete, actualData.creditScore.score, navigate]);

  function getCreditGrade(score: number) {
    if (score >= 90)
      return {
        grade: "Excellent",
        color: "success",
        description: "Outstanding credit profile",
      };
    if (score >= 80)
      return {
        grade: "Very Good",
        color: "brand",
        description: "Strong credit profile",
      };
    if (score >= 70)
      return {
        grade: "Good",
        color: "warning",
        description: "Above average credit profile",
      };
    if (score >= 60)
      return {
        grade: "Fair",
        color: "warning",
        description: "Below average credit profile",
      };
    return { grade: "Poor", color: "error", description: "Needs improvement" };
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-success-600" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-error-600" />;
      default:
        return <Info className="h-4 w-4 text-slate-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-success-600 bg-success-50 border-success-200";
      case "negative":
        return "text-error-600 bg-error-50 border-error-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleNewAssessment = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/upload");
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
            <div className="flex items-center space-x-4">
              <Badge className="bg-success-100 text-success-700 border-success-200">
                Assessment Complete
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CheckCircle className="h-8 w-8 text-success-500" />
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Credit Assessment report is ready
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Analysis completed in {processingTime} seconds. Here's your
              comprehensive credit profile and loan recommendations based on
              your alternative data.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Credit Score Card */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-brand-lg">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">Your Credit Score</CardTitle>
                  <CardDescription>
                    Based on alternative data analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg
                      className="w-48 h-48 transform -rotate-90"
                      viewBox="0 0 160 160"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-200 dark:text-slate-700"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray="439.82"
                        strokeDashoffset={
                          439.82 - (439.82 * currentScore) / 100
                        }
                        className={`transition-all duration-1000 ease-out ${
                          getCreditGrade(actualData.creditScore.score).color ===
                          "success"
                            ? "text-success-500"
                            : getCreditGrade(actualData.creditScore.score)
                                  .color === "brand"
                              ? "text-brand-500"
                              : getCreditGrade(actualData.creditScore.score)
                                    .color === "warning"
                                ? "text-warning-500"
                                : "text-error-500"
                        }`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className={`text-5xl font-bold transition-all duration-500 ${
                            animateScore ? "scale-100" : "scale-75"
                          } ${
                            getCreditGrade(actualData.creditScore.score)
                              .color === "success"
                              ? "text-success-600"
                              : getCreditGrade(actualData.creditScore.score)
                                    .color === "brand"
                                ? "text-brand-600"
                                : getCreditGrade(actualData.creditScore.score)
                                      .color === "warning"
                                  ? "text-warning-600"
                                  : "text-error-600"
                          }`}
                        >
                          {currentScore}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          out of 100
                        </div>
                      </div>
                    </div>
                  </div>

                  <Badge
                    className={`text-base px-4 py-2 mb-4 ${
                      getCreditGrade(actualData.creditScore.score).color ===
                      "success"
                        ? "bg-success-100 text-success-700 border-success-200"
                        : getCreditGrade(actualData.creditScore.score).color ===
                            "brand"
                          ? "bg-brand-100 text-brand-700 border-brand-200"
                          : getCreditGrade(actualData.creditScore.score)
                                .color === "warning"
                            ? "bg-warning-100 text-warning-700 border-warning-200"
                            : "bg-error-100 text-error-700 border-error-200"
                    }`}
                  >
                    {getCreditGrade(actualData.creditScore.score).grade}
                  </Badge>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {getCreditGrade(actualData.creditScore.score).description}
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Summary </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
               Name
                    </span>
                    <span className="font-semibold">{actualData.userDetails.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                    Identification Number
                    </span>
                    <span className="font-semibold">{actualData.userDetails.identifier}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Documents Analyzed
                    </span>
                    <span className="font-semibold">{files.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Processing Time
                    </span>
                    <span className="font-semibold">{processingTime}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Risk Level
                    </span>
                    <Badge
                      variant="outline"
                      className="text-dark-600 border-slate-600"
                    >
                      Low Risk
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Fraud Score
                    </span>
                    <span className="font-semibold text-dark-600">
                      {actualData?.assessmentSummary.fraudScore.value +
                        "%  (" +
                        actualData?.assessmentSummary.fraudScore.label +
                        ")"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="loans" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="loans"
                    className="flex items-center space-x-2"
                  >
                    <DollarSign className="h-4 w-4 text-zinc-800" />
                    <span className="text-zinc-800">Loan Options</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="factors"
                    className="flex items-center space-x-2"
                  >
                    <BarChart3 className="h-4 w-4 text-zinc-800" />
                    <span className="text-zinc-800">Score Factors</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="insights"
                    className="flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4 text-zinc-800" />
                    <span className="text-zinc-800">Insights</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="loans" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Available Loan Options
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Based on your credit score of{" "}
                      {actualData.creditScore.score}, here are the loan options
                      available to you:
                    </p>

                    <div className="space-y-4">
                      {loanOptions.map((loan) => (
                        <Card
                          key={loan.id}
                          className={`transition-all duration-300 hover:shadow-lg ${
                            loan.recommended
                              ? "ring-2 ring-brand-200 dark:ring-brand-800 bg-brand-50/50 dark:bg-brand-900/10"
                              : ""
                          }`}
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                  <span>{loan.type}</span>
                                  {loan.recommended && (
                                    <Badge className="bg-brand-100 text-brand-700 border-brand-200">
                                      Recommended
                                    </Badge>
                                  )}
                                </CardTitle>
                                <CardDescription className="text-sky-900">
                                  {loan.term} months •{" "}
                                  {formatCurrency(loan.monthlyPayment)}/month
                                </CardDescription>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                  {formatCurrency(loan.amount)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                  {loan.apr}% APR
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                                  {formatCurrency(loan.amount)}
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                  Loan Amount
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                                  {loan.apr}%
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                  Interest Rate
                                </div>
                              </div>
                              <div>
                                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                                  {loan.term}mo
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                  Term Length
                                </div>
                              </div>
                            </div>
                            <Button className="w-full mt-4" variant={"outline"}>
                              Apply Now
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="factors" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Score Breakdown
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Understanding how your credit score was calculated:
                    </p>

                    <div className="space-y-4">
                      {scoreFactors.map((factor, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                {getImpactIcon(factor.impact)}
                                <div>
                                  <h4 className="font-semibold text-slate-900 dark:text-white">
                                    {factor.category}
                                  </h4>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {factor.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                  {factor.score}
                                </div>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getImpactColor(factor.impact)}`}
                                >
                                  {factor.weight}% weight
                                </Badge>
                              </div>
                            </div>
                            <Progress value={factor.score} className="h-2" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-6 text-dark">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Credit Insights & Recommendations
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Personalized insights to help improve your credit profile:
                    </p>

                    <div className="space-y-6">
                      <Card className="bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-success-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-success-900 dark:text-success-100 mb-2">
                                Strong Payment History
                              </h4>
                              <p className="text-sm text-success-700 dark:text-success-300">
                                Your consistent payment patterns across
                                utilities and other bills demonstrate excellent
                                financial responsibility. This is your strongest
                                factor.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-warning-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-warning-900 dark:text-warning-100 mb-2">
                                Room for Improvement
                              </h4>
                              <p className="text-sm text-warning-700 dark:text-warning-300">
                                Building a longer account history and
                                diversifying your financial products could help
                                improve your score over time.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                                  1
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  Continue monitoring your account
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Regular assessments help track your progress
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                                  2
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  Consider a secured credit card
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Build traditional credit history alongside
                                  alternative data
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                                  3
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  Maintain consistent payment patterns
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Your payment history is your strongest asset
                                </p>
                              </div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              onClick={handleNewAssessment}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>New Assessment</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share Results</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Brain,
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Percent,
//   Calendar,
//   FileText,
//   CheckCircle,
//   AlertCircle,
//   Eye,
//   Download,
//   Share2,
//   RefreshCw,
//   ArrowRight,
//   BarChart3,
//   PieChart,
//   Info,
// } from "lucide-react";

// interface LoanOption {
//   id: string;
//   amount: number;
//   apr: number;
//   term: number;
//   monthlyPayment: number;
//   type: string;
//   recommended: boolean;
// }

// interface ScoreFactors {
//   category: string;
//   impact: "positive" | "negative" | "neutral";
//   score: number;
//   description: string;
//   weight: number;
// }

// const Results = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [currentScore, setCurrentScore] = useState(0);
//   const [animateScore, setAnimateScore] = useState(false);

//   const files = location.state?.files || [];
//   const analysisComplete = location.state?.analysisComplete || false;
//   const processingTime = location.state?.processingTime || 45;

//   // Simulated credit score (in real app, this would come from the AI analysis)
//   const finalScore = 82;
//   const creditGrade = getCreditGrade(finalScore);

//   const loanOptions: LoanOption[] = [
//     {
//       id: "personal-recommended",
//       amount: 25000,
//       apr: 8.5,
//       term: 36,
//       monthlyPayment: 789,
//       type: "Personal Loan",
//       recommended: true,
//     },
//     {
//       id: "personal-standard",
//       amount: 20000,
//       apr: 9.2,
//       term: 24,
//       monthlyPayment: 918,
//       type: "Personal Loan",
//       recommended: false,
//     },
//     {
//       id: "secured",
//       amount: 35000,
//       apr: 6.8,
//       term: 48,
//       monthlyPayment: 827,
//       type: "Secured Loan",
//       recommended: false,
//     },
//   ];

//   const scoreFactors: ScoreFactors[] = [
//     {
//       category: "Payment History",
//       impact: "positive",
//       score: 92,
//       description: "Consistent on-time payments across all accounts",
//       weight: 35,
//     },
//     {
//       category: "Account Diversity",
//       impact: "positive",
//       score: 85,
//       description: "Good mix of account types (checking, savings, investments)",
//       weight: 25,
//     },
//     {
//       category: "Income Stability",
//       impact: "positive",
//       score: 88,
//       description: "Stable income pattern observed over 12+ months",
//       weight: 20,
//     },
//     {
//       category: "Spending Patterns",
//       impact: "neutral",
//       score: 75,
//       description: "Moderate spending with occasional large purchases",
//       weight: 15,
//     },
//     {
//       category: "Account Age",
//       impact: "negative",
//       score: 65,
//       description: "Limited account history compared to ideal length",
//       weight: 5,
//     },
//   ];

//   useEffect(() => {
//     if (!analysisComplete) {
//       navigate("/upload");
//       return;
//     }

//     // Animate score counting up
//     const timer = setTimeout(() => {
//       setAnimateScore(true);
//       const interval = setInterval(() => {
//         setCurrentScore((prev) => {
//           if (prev >= finalScore) {
//             clearInterval(interval);
//             return finalScore;
//           }
//           return prev + 1;
//         });
//       }, 30);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [analysisComplete, finalScore, navigate]);

//   function getCreditGrade(score: number) {
//     if (score >= 90)
//       return {
//         grade: "Excellent",
//         color: "success",
//         description: "Outstanding credit profile",
//       };
//     if (score >= 80)
//       return {
//         grade: "Very Good",
//         color: "brand",
//         description: "Strong credit profile",
//       };
//     if (score >= 70)
//       return {
//         grade: "Good",
//         color: "warning",
//         description: "Above average credit profile",
//       };
//     if (score >= 60)
//       return {
//         grade: "Fair",
//         color: "warning",
//         description: "Below average credit profile",
//       };
//     return { grade: "Poor", color: "error", description: "Needs improvement" };
//   }

//   const getImpactIcon = (impact: string) => {
//     switch (impact) {
//       case "positive":
//         return <TrendingUp className="h-4 w-4 text-success-600" />;
//       case "negative":
//         return <TrendingDown className="h-4 w-4 text-error-600" />;
//       default:
//         return <Info className="h-4 w-4 text-slate-600" />;
//     }
//   };

//   const getImpactColor = (impact: string) => {
//     switch (impact) {
//       case "positive":
//         return "text-success-600 bg-success-50 border-success-200";
//       case "negative":
//         return "text-error-600 bg-error-50 border-error-200";
//       default:
//         return "text-slate-600 bg-slate-50 border-slate-200";
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const handleNewAssessment = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     navigate("/upload");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
//       {/* Navigation */}
//       <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
//                 <Brain className="h-5 w-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-slate-900 dark:text-white">
//                 CreditBridge
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Badge className="bg-success-100 text-success-700 border-success-200">
//                 Assessment Complete
//               </Badge>
//               <Button variant="outline" size="sm">
//                 <Download className="h-4 w-4 mr-2" />
//                 Download Report
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               <CheckCircle className="h-8 w-8 text-success-500" />
//               <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
//                 Your Credit Assessment
//               </h1>
//             </div>
//             <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
//               Analysis completed in {processingTime} seconds. Here's your
//               comprehensive credit profile and loan recommendations based on
//               your alternative data.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Credit Score Card */}
//             <div className="lg:col-span-1">
//               <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-brand-lg">
//                 <CardHeader className="text-center pb-2">
//                   <CardTitle className="text-xl">Your Credit Score</CardTitle>
//                   <CardDescription>
//                     Based on alternative data analysis
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="text-center">
//                   <div className="relative w-48 h-48 mx-auto mb-6">
//                     <svg
//                       className="w-48 h-48 transform -rotate-90"
//                       viewBox="0 0 160 160"
//                     >
//                       <circle
//                         cx="80"
//                         cy="80"
//                         r="70"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="8"
//                         className="text-slate-200 dark:text-slate-700"
//                       />
//                       <circle
//                         cx="80"
//                         cy="80"
//                         r="70"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="8"
//                         strokeDasharray="439.82"
//                         strokeDashoffset={
//                           439.82 - (439.82 * currentScore) / 100
//                         }
//                         className={`transition-all duration-1000 ease-out ${
//                           creditGrade.color === "success"
//                             ? "text-success-500"
//                             : creditGrade.color === "brand"
//                               ? "text-brand-500"
//                               : creditGrade.color === "warning"
//                                 ? "text-warning-500"
//                                 : "text-error-500"
//                         }`}
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         <div
//                           className={`text-5xl font-bold transition-all duration-500 ${
//                             animateScore ? "scale-100" : "scale-75"
//                           } ${
//                             creditGrade.color === "success"
//                               ? "text-success-600"
//                               : creditGrade.color === "brand"
//                                 ? "text-brand-600"
//                                 : creditGrade.color === "warning"
//                                   ? "text-warning-600"
//                                   : "text-error-600"
//                           }`}
//                         >
//                           {currentScore}
//                         </div>
//                         <div className="text-sm text-slate-600 dark:text-slate-400">
//                           out of 100
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <Badge
//                     className={`text-base px-4 py-2 mb-4 ${
//                       creditGrade.color === "success"
//                         ? "bg-success-100 text-success-700 border-success-200"
//                         : creditGrade.color === "brand"
//                           ? "bg-brand-100 text-brand-700 border-brand-200"
//                           : creditGrade.color === "warning"
//                             ? "bg-warning-100 text-warning-700 border-warning-200"
//                             : "bg-error-100 text-error-700 border-error-200"
//                     }`}
//                   >
//                     {creditGrade.grade}
//                   </Badge>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">
//                     {creditGrade.description}
//                   </p>
//                 </CardContent>
//               </Card>

//               {/* Quick Stats */}
//               <Card className="mt-6">
//                 <CardHeader>
//                   <CardTitle className="text-lg">Assessment Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-slate-600 dark:text-slate-400">
//                       Documents Analyzed
//                     </span>
//                     <span className="font-semibold">{files.length}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-slate-600 dark:text-slate-400">
//                       Processing Time
//                     </span>
//                     <span className="font-semibold">{processingTime}s</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-slate-600 dark:text-slate-400">
//                       Risk Level
//                     </span>
//                     <Badge
//                       variant="outline"
//                       className="text-success-600 border-success-200"
//                     >
//                       Low Risk
//                     </Badge>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-slate-600 dark:text-slate-400">
//                       Fraud Score
//                     </span>
//                     <span className="font-semibold text-success-600">
//                       0.2% (Very Low)
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-2">
//               <Tabs defaultValue="loans" className="space-y-6">
//                 <TabsList className="grid w-full grid-cols-3">
//                   <TabsTrigger
//                     value="loans"
//                     className="flex items-center space-x-2"
//                   >
//                     <DollarSign className="h-4 w-4 text-zinc-800" />
//                     <span className="text-zinc-800">Loan Options</span>
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="factors"
//                     className="flex items-center space-x-2"
//                   >
//                     <BarChart3 className="h-4 w-4 text-zinc-800" />
//                     <span className="text-zinc-800">Score Factors</span>
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="insights"
//                     className="flex items-center space-x-2"
//                   >
//                     <Eye className="h-4 w-4 text-zinc-800" />
//                     <span  className="text-zinc-800">Insights</span>
//                   </TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="loans" className="space-y-6">
//                   <div>
//                     <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
//                       Available Loan Options
//                     </h3>
//                     <p className="text-slate-600 dark:text-slate-400 mb-6">
//                       Based on your credit score of {finalScore}, here are the
//                       loan options available to you:
//                     </p>

//                     <div className="space-y-4">
//                       {loanOptions.map((loan) => (
//                         <Card
//                           key={loan.id}
//                           className={`transition-all duration-300 hover:shadow-lg ${
//                             loan.recommended
//                               ? "ring-2 ring-brand-200 dark:ring-brand-800 bg-brand-50/50 dark:bg-brand-900/10"
//                               : ""
//                           }`}
//                         >
//                           <CardHeader>
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <CardTitle className="text-lg flex items-center space-x-2">
//                                   <span>{loan.type}</span>
//                                   {loan.recommended && (
//                                     <Badge className="bg-brand-100 text-brand-700 border-brand-200">
//                                       Recommended
//                                     </Badge>
//                                   )}
//                                 </CardTitle>
//                                 <CardDescription className="text-sky-900">
//                                   {loan.term} months •{" "}
//                                   {formatCurrency(loan.monthlyPayment)}/month
//                                 </CardDescription>
//                               </div>
//                               <div className="text-right">
//                                 <div className="text-2xl font-bold text-slate-900 dark:text-white">
//                                   {formatCurrency(loan.amount)}
//                                 </div>
//                                 <div className="text-sm text-slate-600 dark:text-slate-400">
//                                   {loan.apr}% APR
//                                 </div>
//                               </div>
//                             </div>
//                           </CardHeader>
//                           <CardContent>
//                             <div className="grid grid-cols-3 gap-4 text-center">
//                               <div>
//                                 <div className="text-lg font-semibold text-slate-900 dark:text-white">
//                                   {formatCurrency(loan.amount)}
//                                 </div>
//                                 <div className="text-xs text-slate-600 dark:text-slate-400">
//                                   Loan Amount
//                                 </div>
//                               </div>
//                               <div>
//                                 <div className="text-lg font-semibold text-slate-900 dark:text-white">
//                                   {loan.apr}%
//                                 </div>
//                                 <div className="text-xs text-slate-600 dark:text-slate-400">
//                                   Interest Rate
//                                 </div>
//                               </div>
//                               <div>
//                                 <div className="text-lg font-semibold text-slate-900 dark:text-white">
//                                   {loan.term}mo
//                                 </div>
//                                 <div className="text-xs text-slate-600 dark:text-slate-400">
//                                   Term Length
//                                 </div>
//                               </div>
//                             </div>
//                             <Button
//                               className="w-full mt-4"
//                             variant={ "outline"}
//                             >
//                               Apply Now
//                               <ArrowRight className="h-4 w-4 ml-2" />
//                             </Button>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="factors" className="space-y-6">
//                   <div>
//                     <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
//                       Score Breakdown
//                     </h3>
//                     <p className="text-slate-600 dark:text-slate-400 mb-6">
//                       Understanding how your credit score was calculated:
//                     </p>

//                     <div className="space-y-4">
//                       {scoreFactors.map((factor, index) => (
//                         <Card key={index}>
//                           <CardContent className="p-6">
//                             <div className="flex items-start justify-between mb-4">
//                               <div className="flex items-center space-x-3">
//                                 {getImpactIcon(factor.impact)}
//                                 <div>
//                                   <h4 className="font-semibold text-slate-900 dark:text-white">
//                                     {factor.category}
//                                   </h4>
//                                   <p className="text-sm text-slate-600 dark:text-slate-400">
//                                     {factor.description}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="text-right">
//                                 <div className="text-lg font-bold text-slate-900 dark:text-white">
//                                   {factor.score}
//                                 </div>
//                                 <Badge
//                                   variant="outline"
//                                   className={`text-xs ${getImpactColor(factor.impact)}`}
//                                 >
//                                   {factor.weight}% weight
//                                 </Badge>
//                               </div>
//                             </div>
//                             <Progress value={factor.score} className="h-2" />
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="insights" className="space-y-6 text-dark">
//                   <div>
//                     <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
//                       Credit Insights & Recommendations
//                     </h3>
//                     <p className="text-slate-600 dark:text-slate-400 mb-6">
//                       Personalized insights to help improve your credit profile:
//                     </p>

//                     <div className="space-y-6">
//                       <Card className="bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800">
//                         <CardContent className="p-6">
//                           <div className="flex items-start space-x-3">
//                             <CheckCircle className="h-5 w-5 text-success-600 mt-0.5" />
//                             <div>
//                               <h4 className="font-semibold text-success-900 dark:text-success-100 mb-2">
//                                 Strong Payment History
//                               </h4>
//                               <p className="text-sm text-success-700 dark:text-success-300">
//                                 Your consistent payment patterns across
//                                 utilities and other bills demonstrate excellent
//                                 financial responsibility. This is your strongest
//                                 factor.
//                               </p>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>

//                       <Card className="bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800">
//                         <CardContent className="p-6">
//                           <div className="flex items-start space-x-3">
//                             <AlertCircle className="h-5 w-5 text-warning-600 mt-0.5" />
//                             <div>
//                               <h4 className="font-semibold text-warning-900 dark:text-warning-100 mb-2">
//                                 Room for Improvement
//                               </h4>
//                               <p className="text-sm text-warning-700 dark:text-warning-300">
//                                 Building a longer account history and
//                                 diversifying your financial products could help
//                                 improve your score over time.
//                               </p>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>

//                       <Card>
//                         <CardHeader>
//                           <CardTitle className="text-lg">Next Steps</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <ul className="space-y-3">
//                             <li className="flex items-start space-x-3">
//                               <div className="w-6 h-6 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                                 <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
//                                   1
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-slate-900 dark:text-white">
//                                   Continue monitoring your account
//                                 </p>
//                                 <p className="text-xs text-slate-600 dark:text-slate-400">
//                                   Regular assessments help track your progress
//                                 </p>
//                               </div>
//                             </li>
//                             <li className="flex items-start space-x-3">
//                               <div className="w-6 h-6 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                                 <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
//                                   2
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-slate-900 dark:text-white">
//                                   Consider a secured credit card
//                                 </p>
//                                 <p className="text-xs text-slate-600 dark:text-slate-400">
//                                   Build traditional credit history alongside
//                                   alternative data
//                                 </p>
//                               </div>
//                             </li>
//                             <li className="flex items-start space-x-3">
//                               <div className="w-6 h-6 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                                 <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
//                                   3
//                                 </span>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-slate-900 dark:text-white">
//                                   Maintain consistent payment patterns
//                                 </p>
//                                 <p className="text-xs text-slate-600 dark:text-slate-400">
//                                   Your payment history is your strongest asset
//                                 </p>
//                               </div>
//                             </li>
//                           </ul>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
//             <Button
//               onClick={handleNewAssessment}
//               variant="outline"
//               className="flex items-center space-x-2"
//             >
//               <RefreshCw className="h-4 w-4" />
//               <span>New Assessment</span>
//             </Button>
//             <Button  variant="outline" className="flex items-center space-x-2">
//               <Share2 className="h-4 w-4" />
//               <span>Share Results</span>
//             </Button>
//             <Button variant="outline" className="flex items-center space-x-2">
//               <Download className="h-4 w-4" />
//               <span>Download Report</span>
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Results;

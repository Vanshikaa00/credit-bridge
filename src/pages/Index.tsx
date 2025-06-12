import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Brain,
  Shield,
  Clock,
  FileText,
  CreditCard,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Zap,
  ArrowRight,
  BarChart3,
  Lock,
  Eye,
} from "lucide-react";

const Index = () => {
  document.documentElement.style.backgroundColor = '#f8fbff';
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showAlternativeData, setShowAlternativeData] = useState(false);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze alternative data sources for accurate credit assessment.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fraud Detection",
      description:
        "Built-in synthetic identity fraud detection protects against fake applications.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "60-Second Decisions",
      description:
        "Get real-time credit decisions in under 60 seconds, even without traditional credit history.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Full Transparency",
      description:
        "Complete explainability of credit decisions ensures fairness and regulatory compliance.",
    },
  ];

  const dataTypes = [
    {
      icon: <FileText className="h-5 w-5" />,
      name: "Utility Bills",
      description: "Electricity, water, gas, and internet payment records",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      name: "Bank Statements",
      description: "Transaction history and account activity patterns",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      name: "Investment Records",
      description: "Portfolio statements and investment account history",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      name: "Payment History",
      description: "Insurance, subscription, and recurring payment data",
    },
  ];

  const stats = [
    {
      number: "95%",
      label: "Accuracy Rate",
      icon: <Award className="h-5 w-5" />,
    },
    {
      number: "<60s",
      label: "Decision Time",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      number: "50K+",
      label: "Assessments",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "99.9%",
      label: "Fraud Detection",
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  const handleGetStarted = () => {
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
                <Brain  onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/");
                }} className="h-5 w-5 text-white" />
              </div>
              <span  onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/");
                }} className="text-xl font-bold text-slate-900 dark:text-white">
                CreditBridge
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Smart Data
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAlternativeData}
                    onChange={(e) => setShowAlternativeData(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-600"></div>
                </label>
              </div>
              <Button
                onClick={handleGetStarted}
                className="bg-brand-600 hover:bg-brand-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:pr-8"
            >
              <Badge className="mb-4 bg-brand-100 text-brand-700 border-brand-200">
                AI-Powered Credit Assessment
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                Credit Decisions for{" "}
                <span className="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
                  Everyone
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                CreditBridge uses AI to assess creditworthiness from alternative
                data sources like utility bills, bank statements, and payment
                history. Get fair, transparent credit decisions in under 60
                seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 text-base font-semibold"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Assessment
                  <ArrowRight
                    className={`ml-2 h-5 w-5 transition-transform ${isHovered ? "translate-x-1" : ""}`}
                  />
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2" />
                  No traditional credit required
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-success-500 mr-2" />
                  Bank-grade security
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Card className="glass-card shadow-brand-lg border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        Credit Assessment
                      </CardTitle>
                      <Badge className="bg-success-100 text-success-700 border-success-200">
                        Complete
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-6">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg
                          className="w-32 h-32 transform -rotate-90"
                          viewBox="0 0 120 120"
                        >
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="12"
                            className="text-slate-200 dark:text-slate-700"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="12"
                            strokeDasharray="339.292"
                            strokeDashoffset="67.858"
                            className="text-brand-500"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">
                              82
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              Score
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Based on alternative data analysis
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="text-sm font-medium">Loan Amount</span>
                        <span className="text-lg font-bold text-brand-600">
                          $25,000
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="text-sm font-medium">
                          Interest Rate
                        </span>
                        <span className="text-lg font-bold text-success-600">
                          8.5% APR
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute top-4 left-4 w-72 h-72 bg-gradient-to-r from-brand-400/20 to-brand-600/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/50 rounded-xl flex items-center justify-center">
                    <div className="text-brand-600 dark:text-brand-400">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose CreditBridge?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our AI-powered platform revolutionizes credit assessment by
              analyzing alternative data sources to provide fair, accurate, and
              transparent credit decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-brand-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/50 rounded-xl flex items-center justify-center mb-4">
                      <div className="text-brand-600 dark:text-brand-400">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      {showAlternativeData && (
        <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Alternative Data Sources
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                We analyze various types of financial documents to build a
                comprehensive credit profile
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-brand-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <div className="text-brand-600 dark:text-brand-400">
                      {type.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {type.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {type.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Get Your Credit Score?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Upload your documents and get a comprehensive credit assessment in
              under 60 seconds. No traditional credit history required.
            </p>
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate("/upload");
              }}
              size="lg"
              className="bg-brand-600 hover:bg-brand-700 text-white px-12 py-4 text-lg font-semibold"
            >
              Start Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">CreditBridge</span>
              </div>
              <p className="text-slate-400 max-w-md">
                AI-powered credit assessment platform providing fair and
                transparent credit decisions for everyone, regardless of
                traditional credit history.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Credit Assessment</li>
                <li>Fraud Detection</li>
                <li>API Access</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>About Us</li>
                <li>Security</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 CreditBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

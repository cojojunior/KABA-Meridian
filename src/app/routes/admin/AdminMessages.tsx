import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Phone,
  User,
  Calendar,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  AlertCircle,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Quotation {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  product_interest: string;
  message: string;
  status: "pending" | "reviewed" | "responded" | "closed";
  created_at: string;
}

export default function AdminMessages() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [filteredQuotations, setFilteredQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotations();
  }, []);

  useEffect(() => {
    let filtered = quotations;

    if (statusFilter !== "all") {
      filtered = filtered.filter((q) => q.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (q) =>
          q.name.toLowerCase().includes(term) ||
          q.email.toLowerCase().includes(term) ||
          q.message.toLowerCase().includes(term) ||
          (q.company && q.company.toLowerCase().includes(term)),
      );
    }

    setFilteredQuotations(filtered);
  }, [quotations, searchTerm, statusFilter]);

  const fetchQuotations = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("quotations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotations(data || []);
      setFilteredQuotations(data || []);
    } catch (error: any) {
      console.error("Error fetching quotations:", error);
      setError(error.message || "Failed to load quotations.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("quotations")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setQuotations((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus as any } : q)),
      );

      if (selectedQuotation && selectedQuotation.id === id) {
        setSelectedQuotation((prev) =>
          prev ? { ...prev, status: newStatus as any } : null,
        );
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const deleteQuotation = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quotation request?"))
      return;

    try {
      const { error } = await supabase.from("quotations").delete().eq("id", id);

      if (error) throw error;

      setQuotations((prev) => prev.filter((q) => q.id !== id));
      if (selectedQuotation && selectedQuotation.id === id) {
        setSelectedQuotation(null);
      }
    } catch (error: any) {
      console.error("Error deleting quotation:", error);
      alert("Failed to delete quotation.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "responded":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "reviewed":
        return <CheckCircle className="h-3 w-3" />;
      case "responded":
        return <FileText className="h-3 w-3" />;
      case "closed":
        return <XCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "reviewed":
        return "Reviewed";
      case "responded":
        return "Responded";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#05383f] border-t-transparent mx-auto mb-4"></div>
          <p className="text-secondary-500">Loading quotations...</p>
        </div>
      </div>
    );
  }

  const totalQuotations = quotations.length;
  const pendingCount = quotations.filter((q) => q.status === "pending").length;
  const respondedCount = quotations.filter(
    (q) => q.status === "responded",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-secondary-600" />
              </button>
              <div className="flex items-center gap-3">
                <img src="/KABA.svg" alt="Logo" className="h-10 w-10" />
                <div>
                  <span className="text-xl font-bold text-secondary-900">
                    KABA
                  </span>
                  <span className="text-xl font-corsiva text-[#05383f]">
                    {" "}
                    Meridian
                  </span>
                </div>
                <span className="ml-4 px-3 py-1 bg-[#05383f]/10 text-[#05383f] text-sm rounded-full font-medium">
                  Quotations
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchQuotations}
              className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 text-sm font-medium">
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-secondary-500">Total</p>
            <p className="text-2xl font-bold text-secondary-900">
              {totalQuotations}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
            <p className="text-sm text-yellow-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <p className="text-sm text-green-600">Responded</p>
            <p className="text-2xl font-bold text-green-600">
              {respondedCount}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05383f] focus:border-[#05383f] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05383f] focus:border-[#05383f] transition-colors bg-white">
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="reviewed">Reviewed</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="gap-2">
              <Filter className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary-900">
                Quotation Requests ({filteredQuotations.length})
              </h2>
            </div>

            <div className="space-y-3">
              {filteredQuotations.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-secondary-500">
                      {quotations.length === 0
                        ? "No quotation requests yet."
                        : "No requests match your filters."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredQuotations.map((quotation) => (
                  <motion.div
                    key={quotation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}>
                    <Card
                      variant={
                        selectedQuotation?.id === quotation.id
                          ? "outline"
                          : "shadow"
                      }
                      className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                        selectedQuotation?.id === quotation.id
                          ? "border-[#05383f] border-2"
                          : ""
                      } ${quotation.status === "pending" ? "bg-yellow-50/30" : ""}`}
                      onClick={() => setSelectedQuotation(quotation)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`font-semibold ${quotation.status === "pending" ? "text-secondary-900" : "text-secondary-700"}`}>
                                {quotation.name}
                              </span>
                              <span className="text-sm text-secondary-500">
                                •
                              </span>
                              <span className="text-sm text-secondary-500">
                                {formatDate(quotation.created_at)}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(quotation.status)}`}>
                                {getStatusIcon(quotation.status)}
                                {getStatusLabel(quotation.status)}
                              </span>
                            </div>
                            {quotation.company && (
                              <p className="text-sm text-secondary-600 mt-1">
                                <span className="font-medium">Company:</span>{" "}
                                {quotation.company}
                              </p>
                            )}
                            {quotation.product_interest && (
                              <p className="text-sm text-secondary-600">
                                <span className="font-medium">Product:</span>{" "}
                                {quotation.product_interest}
                              </p>
                            )}
                            <p
                              className={`text-sm mt-1 line-clamp-2 ${
                                quotation.status === "pending"
                                  ? "text-secondary-800 font-medium"
                                  : "text-secondary-600"
                              }`}>
                              {quotation.message}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-secondary-400">
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {quotation.email}
                              </span>
                              {quotation.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {quotation.phone}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteQuotation(quotation.id);
                            }}
                            className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0 ml-4"
                            title="Delete">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Request Details
              </h3>
              {selectedQuotation ? (
                <Card variant="shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          From
                        </label>
                        <p className="font-semibold text-secondary-900 flex items-center gap-2">
                          <User className="h-4 w-4 text-secondary-400" />
                          {selectedQuotation.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Email
                        </label>
                        <a
                          href={`mailto:${selectedQuotation.email}`}
                          className="text-[#05383f] hover:underline block">
                          {selectedQuotation.email}
                        </a>
                      </div>
                      {selectedQuotation.phone && (
                        <div>
                          <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Phone
                          </label>
                          <a
                            href={`tel:${selectedQuotation.phone}`}
                            className="text-[#05383f] hover:underline block">
                            {selectedQuotation.phone}
                          </a>
                        </div>
                      )}
                      {selectedQuotation.company && (
                        <div>
                          <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Company
                          </label>
                          <p className="text-secondary-900">
                            {selectedQuotation.company}
                          </p>
                        </div>
                      )}
                      {selectedQuotation.product_interest && (
                        <div>
                          <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Product Interest
                          </label>
                          <p className="text-secondary-900">
                            {selectedQuotation.product_interest}
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Date
                        </label>
                        <p className="text-secondary-600 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-secondary-400" />
                          {new Date(
                            selectedQuotation.created_at,
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Status
                        </label>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${getStatusColor(selectedQuotation.status)}`}>
                          {getStatusIcon(selectedQuotation.status)}
                          {getStatusLabel(selectedQuotation.status)}
                        </span>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Message
                        </label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                          <p className="text-secondary-700 whitespace-pre-wrap">
                            {selectedQuotation.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                        <a
                          href={`mailto:${selectedQuotation.email}`}
                          className="w-full">
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full gap-2">
                            <FileText className="h-4 w-4" />
                            Send Quote via Email
                          </Button>
                        </a>
                        {selectedQuotation.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              updateStatus(selectedQuotation.id, "reviewed");
                              setSelectedQuotation(null);
                            }}
                            className="w-full gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Mark as Reviewed
                          </Button>
                        )}
                        {selectedQuotation.status === "reviewed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              updateStatus(selectedQuotation.id, "responded");
                              setSelectedQuotation(null);
                            }}
                            className="w-full gap-2">
                            <FileText className="h-4 w-4" />
                            Mark as Responded
                          </Button>
                        )}
                        {selectedQuotation.status === "responded" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              updateStatus(selectedQuotation.id, "closed");
                              setSelectedQuotation(null);
                            }}
                            className="w-full gap-2">
                            <XCircle className="h-4 w-4" />
                            Mark as Closed
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            deleteQuotation(selectedQuotation.id);
                            setSelectedQuotation(null);
                          }}
                          className="w-full gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete Request
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Eye className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-secondary-500">
                      Select a request to view details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

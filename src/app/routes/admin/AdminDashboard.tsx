import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  LogOut,
  RefreshCw,
  AlertCircle,
  User,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Trash2,
} from "lucide-react";
import supabase from "@/lib/supabase";
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

export default function AdminDashboard() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotations();
  }, []);

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

  // DELETE FUNCTION - Fully implemented
  const deleteQuotation = async (id: number) => {
    // Show confirmation dialog
    if (
      !confirm(
        "Are you sure you want to delete this quotation request? This action cannot be undone.",
      )
    ) {
      return;
    }

    setDeletingId(id);
    setError(null);

    try {
      console.log("Deleting quotation with ID:", id);

      const { error } = await supabase.from("quotations").delete().eq("id", id);

      if (error) {
        console.error("Supabase delete error:", error);
        setError(`Failed to delete: ${error.message}`);
        throw error;
      }

      console.log("Quotation deleted successfully from Supabase");

      // Remove from local state
      setQuotations((prev) => prev.filter((q) => q.id !== id));

      // If the deleted item was selected, clear selection
      if (selectedQuotation && selectedQuotation.id === id) {
        setSelectedQuotation(null);
      }

      // Show success message
      alert("Quotation request deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting quotation:", error);
      setError(error.message || "Failed to delete quotation.");
      alert("Failed to delete quotation. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
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
        return <Clock className="h-4 w-4" />;
      case "reviewed":
        return <CheckCircle className="h-4 w-4" />;
      case "responded":
        return <FileText className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
            <div className="flex items-center gap-3">
              <img src="/KABA.svg" alt="Logo" className="h-10 w-10" />
              <div>
                <span className="text-xl font-corsiva text-[#05383f]">
                  Meridian
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchQuotations}
                className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">
            Quotation Requests
          </h1>
          <p className="text-secondary-500">
            Manage and respond to quotation requests
          </p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <Card variant="shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-500">Total Requests</p>
                    <p className="text-3xl font-bold text-secondary-900 mt-1">
                      {totalQuotations}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}>
            <Card variant="shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-500">Pending Review</p>
                    <p className="text-3xl font-bold text-secondary-900 mt-1">
                      {pendingCount}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-100">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}>
            <Card variant="shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-500">Responded</p>
                    <p className="text-3xl font-bold text-secondary-900 mt-1">
                      {respondedCount}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-100">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-secondary-900">
              All Quotation Requests
            </h2>
          </div>

          {quotations.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-secondary-500">
                No quotation requests received yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {quotations.map((quotation, index) => (
                <motion.div
                  key={quotation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                    quotation.status === "pending" ? "bg-yellow-50/30" : ""
                  }`}
                  onClick={() => setSelectedQuotation(quotation)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`font-semibold ${quotation.status === "pending" ? "text-secondary-900" : "text-secondary-700"}`}>
                          {quotation.name}
                        </span>
                        <span className="text-sm text-secondary-500">•</span>
                        <span className="text-sm text-secondary-500">
                          {formatDate(quotation.created_at)}
                        </span>
                        {quotation.company && (
                          <>
                            <span className="text-sm text-secondary-500">
                              •
                            </span>
                            <span className="text-sm text-secondary-600">
                              {quotation.company}
                            </span>
                          </>
                        )}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(quotation.status)}`}>
                          {getStatusIcon(quotation.status)}
                          {getStatusLabel(quotation.status)}
                        </span>
                      </div>
                      {quotation.product_interest && (
                        <p className="text-sm text-secondary-600 mt-1">
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
                    {/* Delete Button on List */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteQuotation(quotation.id);
                      }}
                      disabled={deletingId === quotation.id}
                      className={`p-2 rounded-lg transition-colors ml-4 flex-shrink-0 ${
                        deletingId === quotation.id
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "hover:bg-red-100 text-red-500 hover:text-red-700"
                      }`}
                      title="Delete">
                      {deletingId === quotation.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {selectedQuotation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-secondary-900">
                  Quotation Request Details
                </h3>
                <button
                  onClick={() => setSelectedQuotation(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                      Email
                    </label>
                    <a
                      href={`mailto:${selectedQuotation.email}`}
                      className="text-[#05383f] hover:underline block">
                      {selectedQuotation.email}
                    </a>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Date
                    </label>
                    <p className="text-secondary-600 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-secondary-400" />
                      {new Date(selectedQuotation.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedQuotation.company && (
                    <div>
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Company
                      </label>
                      <p className="text-secondary-900 font-medium">
                        {selectedQuotation.company}
                      </p>
                    </div>
                  )}
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
                  {selectedQuotation.product_interest && (
                    <div className="col-span-2">
                      <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Product Interest
                      </label>
                      <p className="text-secondary-900">
                        {selectedQuotation.product_interest}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Message
                  </label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                    <p className="text-secondary-700 whitespace-pre-wrap">
                      {selectedQuotation.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  <a href={`mailto:${selectedQuotation.email}`}>
                    <Button variant="primary" size="sm" className="gap-2">
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
                      className="gap-2">
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
                      className="gap-2">
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
                      className="gap-2">
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
                    className="gap-2"
                    disabled={deletingId === selectedQuotation.id}>
                    {deletingId === selectedQuotation.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

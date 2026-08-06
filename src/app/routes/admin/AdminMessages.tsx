import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Calendar,
  CheckCircle,
  Eye,
  Reply,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showDetail, setShowDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages when search or filter changes
  useEffect(() => {
    let filtered = messages;

    if (statusFilter !== "all") {
      filtered = filtered.filter((msg) => msg.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(term) ||
          msg.email.toLowerCase().includes(term) ||
          msg.message.toLowerCase().includes(term) ||
          (msg.phone && msg.phone.toLowerCase().includes(term)),
      );
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, statusFilter]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setError(`Failed to fetch messages: ${error.message}`);
        throw error;
      }

      console.log("Fetched messages:", data);
      setMessages(data || []);
      setFilteredMessages(data || []);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      setError(error.message || "Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    setActionLoading(id);
    setError(null);

    try {
      console.log(`Updating message ${id} to status: ${newStatus}`);
      console.log(`Column being updated: status with value: ${newStatus}`);

      const { data, error } = await supabase
        .from("messages")
        .update({ status: newStatus })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Supabase update error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        setError(`Failed to update status: ${error.message}`);
        throw error;
      }

      console.log("Update successful, returned data:", data);

      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, status: newStatus as any } : msg,
        ),
      );

      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage((prev) =>
          prev ? { ...prev, status: newStatus as any } : null,
        );
      }

      setError(null);
    } catch (error: any) {
      console.error("Error updating message:", error);
      // Don't show alert, use the error state instead
    } finally {
      setActionLoading(null);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setActionLoading(id);
    setError(null);

    try {
      console.log(`Deleting message ${id}`);

      const { error } = await supabase.from("messages").delete().eq("id", id);

      if (error) {
        console.error("Supabase delete error:", error);
        setError(`Failed to delete: ${error.message}`);
        throw error;
      }

      console.log(`Message ${id} deleted successfully`);

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
        setShowDetail(false);
      }
      setError(null);
    } catch (error: any) {
      console.error("Error deleting message:", error);
      setError(error.message || "Failed to delete message.");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Mail className="h-3 w-3" />;
      case "read":
        return <Eye className="h-3 w-3" />;
      case "replied":
        return <Reply className="h-3 w-3" />;
      default:
        return <Mail className="h-3 w-3" />;
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
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#05383f] border-t-transparent mx-auto mb-4"></div>
          <p className="text-secondary-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  const totalMessages = messages.length;
  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Dashboard">
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
                  Messages
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchMessages}
              className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        {/* Error Message */}
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

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-secondary-500">Total</p>
            <p className="text-2xl font-bold text-secondary-900">
              {totalMessages}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
            <p className="text-sm text-yellow-600">Unread</p>
            <p className="text-2xl font-bold text-yellow-600">{unreadCount}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <p className="text-sm text-green-600">Replied</p>
            <p className="text-2xl font-bold text-green-600">{repliedCount}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
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
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
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
          {/* Message List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary-900">
                Messages ({filteredMessages.length})
              </h2>
            </div>

            <div className="space-y-3">
              {filteredMessages.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-secondary-500">
                      {messages.length === 0
                        ? "No messages yet."
                        : "No messages match your filters."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}>
                    <Card
                      variant={
                        selectedMessage?.id === message.id
                          ? "outline"
                          : "shadow"
                      }
                      className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                        selectedMessage?.id === message.id
                          ? "border-[#05383f] border-2"
                          : ""
                      } ${
                        message.status === "unread" ? "bg-yellow-50/30" : ""
                      }`}
                      onClick={() => {
                        setSelectedMessage(message);
                        setShowDetail(true);
                        if (message.status === "unread") {
                          updateStatus(message.id, "read");
                        }
                      }}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`font-semibold ${message.status === "unread" ? "text-secondary-900" : "text-secondary-700"}`}>
                                {message.name}
                              </span>
                              <span className="text-sm text-secondary-500">
                                •
                              </span>
                              <span className="text-sm text-secondary-500">
                                {formatDate(message.created_at)}
                              </span>
                              <span
                                className={`ml-2 px-2 py-0.5 text-xs rounded-full inline-flex items-center gap-1 ${getStatusColor(message.status)}`}>
                                {getStatusIcon(message.status)}
                                {message.status}
                              </span>
                            </div>
                            <p
                              className={`text-sm mt-1 line-clamp-2 ${
                                message.status === "unread"
                                  ? "text-secondary-800 font-medium"
                                  : "text-secondary-600"
                              }`}>
                              {message.message}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-secondary-400">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {message.email}
                              </span>
                              {message.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {message.phone}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                            {actionLoading === message.id ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#05383f] border-t-transparent"></div>
                            ) : (
                              <>
                                {message.status === "unread" && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateStatus(message.id, "read");
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    title="Mark as read">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  </button>
                                )}
                                {message.status === "read" && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateStatus(message.id, "replied");
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                    title="Mark as replied">
                                    <Reply className="h-4 w-4 text-blue-600" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteMessage(message.id);
                                  }}
                                  className="p-1 hover:bg-red-100 rounded transition-colors"
                                  title="Delete">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Message Details
              </h3>
              {selectedMessage && showDetail ? (
                <Card variant="shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          From
                        </label>
                        <p className="font-semibold text-secondary-900 flex items-center gap-2">
                          <User className="h-4 w-4 text-secondary-400" />
                          {selectedMessage.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Email
                        </label>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-[#05383f] hover:underline block">
                          {selectedMessage.email}
                        </a>
                      </div>
                      {selectedMessage.phone && (
                        <div>
                          <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                            Phone
                          </label>
                          <a
                            href={`tel:${selectedMessage.phone}`}
                            className="text-[#05383f] hover:underline block">
                            {selectedMessage.phone}
                          </a>
                        </div>
                      )}
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Date
                        </label>
                        <p className="text-secondary-600 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-secondary-400" />
                          {new Date(
                            selectedMessage.created_at,
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Status
                        </label>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${getStatusColor(selectedMessage.status)}`}>
                          {getStatusIcon(selectedMessage.status)}
                          {selectedMessage.status}
                        </span>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-secondary-500 uppercase tracking-wider">
                          Message
                        </label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                          <p className="text-secondary-700 whitespace-pre-wrap">
                            {selectedMessage.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="w-full">
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full gap-2">
                            <Reply className="h-4 w-4" />
                            Reply via Email
                          </Button>
                        </a>
                        {selectedMessage.status === "unread" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateStatus(selectedMessage.id, "read")
                            }
                            className="w-full gap-2"
                            disabled={actionLoading === selectedMessage.id}>
                            {actionLoading === selectedMessage.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#05383f] border-t-transparent"></div>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Mark as Read
                              </>
                            )}
                          </Button>
                        )}
                        {selectedMessage.status === "read" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateStatus(selectedMessage.id, "replied")
                            }
                            className="w-full gap-2"
                            disabled={actionLoading === selectedMessage.id}>
                            {actionLoading === selectedMessage.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#05383f] border-t-transparent"></div>
                            ) : (
                              <>
                                <Reply className="h-4 w-4" />
                                Mark as Replied
                              </>
                            )}
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            deleteMessage(selectedMessage.id);
                            setShowDetail(false);
                            setSelectedMessage(null);
                          }}
                          className="w-full gap-2"
                          disabled={actionLoading === selectedMessage.id}>
                          {actionLoading === selectedMessage.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent"></div>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4" />
                              Delete Message
                            </>
                          )}
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
                      Select a message to view details
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

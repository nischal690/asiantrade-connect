import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  FolderTree, ExternalLink, Clock, Calendar, 
  Search, Filter, Grid2X2, List, Eye, EyeOff,
  ChevronRight, ChevronDown, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";

// Types and interfaces
interface SitemapNode {
  path: string;
  label: string;
  description?: string;
  lastUpdated?: string;
  badge?: "new" | "updated" | "coming-soon";
  isExternal?: boolean;
  category?: string;
  children?: SitemapNode[];
}

interface SitemapNodeProps {
  node: SitemapNode;
  level?: number;
  view: "list" | "grid";
  expanded: boolean;
  onToggle: () => void;
}

// Utility functions
const getBadgeVariant = (badge?: "new" | "updated" | "coming-soon") => {
  switch (badge) {
    case "new":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case "updated":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case "coming-soon":
      return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
    default:
      return "";
  }
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Main: "bg-primary/10 text-primary hover:bg-primary/20",
    Company: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
    Services: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    Content: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    Support: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
    Admin: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    Legal: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
  };
  return colors[category] || "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
};

const getAllPaths = (nodes: SitemapNode[]): string[] => {
  const paths: string[] = [];
  const addPaths = (node: SitemapNode) => {
    paths.push(node.path);
    node.children?.forEach(addPaths);
  };
  nodes.forEach(addPaths);
  return paths;
};

// Site structure data
const siteStructure: SitemapNode[] = [
  {
    path: "/",
    label: "Home",
    description: "Welcome to Asian Trade Connect - Your Gateway to Asian Markets",
    lastUpdated: "2024-01-15",
    category: "Main",
    children: [
      { 
        path: "/about", 
        label: "About Us",
        description: "Learn about our history, mission, and vision",
        lastUpdated: "2024-01-10",
        category: "Company"
      },
      { 
        path: "/services", 
        label: "Our Services",
        description: "Comprehensive solutions for luxury brands in Asia",
        lastUpdated: "2024-01-12",
        badge: "updated",
        category: "Services"
      },
      { 
        path: "/news", 
        label: "News",
        description: "Latest updates and industry insights",
        lastUpdated: "2024-01-15",
        badge: "new",
        category: "Content"
      },
      { 
        path: "/careers", 
        label: "Careers",
        description: "Join our growing team",
        lastUpdated: "2024-01-08",
        category: "Company"
      },
      { 
        path: "/contact", 
        label: "Contact",
        description: "Get in touch with our team",
        lastUpdated: "2024-01-05",
        category: "Support"
      }
    ]
  },
  {
    path: "/admin",
    label: "Admin",
    description: "Administrative dashboard and controls",
    lastUpdated: "2024-01-14",
    category: "Admin",
    children: [
      { 
        path: "/admin/login", 
        label: "Login",
        description: "Secure admin access point",
        lastUpdated: "2024-01-14",
        category: "Admin"
      }
    ]
  },
  {
    path: "/legal",
    label: "Legal",
    description: "Important legal documents and policies",
    lastUpdated: "2024-01-01",
    category: "Legal",
    children: [
      { 
        path: "/privacy-policy", 
        label: "Privacy Policy",
        description: "Our commitment to your privacy",
        lastUpdated: "2024-01-01",
        category: "Legal"
      },
      { 
        path: "/terms", 
        label: "Terms & Conditions",
        description: "Terms of service and usage",
        lastUpdated: "2024-01-01",
        category: "Legal"
      }
    ]
  }
];

// Components
const SitemapNode = ({ node, level = 0, view, expanded, onToggle }: SitemapNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  
  const nodeContent = (
    <div className="flex flex-col w-full">
      <div className="flex items-start gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {hasChildren && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 flex-shrink-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          <span className="font-medium truncate">{node.label}</span>
          {node.isExternal && (
            <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          )}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {node.badge && (
            <Badge variant="outline" className={getBadgeVariant(node.badge)}>
              {node.badge}
            </Badge>
          )}
          {node.category && (
            <Badge variant="outline" className={getCategoryColor(node.category)}>
              {node.category}
            </Badge>
          )}
        </div>
      </div>
      {node.description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {node.description}
        </p>
      )}
      {node.lastUpdated && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <Calendar className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">
            Last updated: {new Date(node.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: level * 0.1 }}
      className={view === "grid" ? "w-full" : ""}
    >
      <div className={view === "list" ? `ml-${level * 4} sm:ml-${level * 6} border-l-2 border-accent/10 pl-2 sm:pl-4 py-2` : ""}>
        <div className="relative group">
          {view === "list" && (
            <div className="absolute -left-[17px] sm:-left-[21px] top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-background border-2 border-accent/20 group-hover:border-accent/50 transition-colors" />
          )}
          
          <Button
            variant="ghost"
            asChild
            className={`w-full justify-start hover:bg-primary/10 hover:text-primary h-auto py-3 sm:py-4 px-3 sm:px-5 ${
              view === "grid" ? "rounded-lg border border-accent/10" : ""
            }`}
          >
            {node.isExternal ? (
              <a href={node.path} target="_blank" rel="noopener noreferrer" className="w-full">
                {nodeContent}
              </a>
            ) : (
              <Link to={node.path} className="w-full">
                {nodeContent}
              </Link>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {hasChildren && expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={view === "grid" ? "grid grid-cols-1 gap-2 sm:gap-4 mt-2 sm:mt-4" : "mt-2"}
            >
              {node.children!.map((child) => (
                <SitemapNode
                  key={child.path}
                  node={child}
                  level={level + 1}
                  view={view}
                  expanded={expanded}
                  onToggle={onToggle}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Sitemap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "grid">("list");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["/"]));

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    const addCategory = (node: SitemapNode) => {
      if (node.category) cats.add(node.category);
      node.children?.forEach(addCategory);
    };
    siteStructure.forEach(addCategory);
    return Array.from(cats).sort();
  }, []);

  const filteredNodes = useMemo(() => {
    const filterNode = (node: SitemapNode): SitemapNode | null => {
      const matchesSearch = !searchQuery || 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || node.category === selectedCategory;

      if (!matchesSearch || !matchesCategory) return null;

      if (node.children) {
        const filteredChildren = node.children
          .map(filterNode)
          .filter((n): n is SitemapNode => n !== null);
        return { ...node, children: filteredChildren };
      }

      return node;
    };

    return siteStructure
      .map(filterNode)
      .filter((n): n is SitemapNode => n !== null);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <FolderTree className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-heading font-semibold">Site Navigation</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => setView(view === "list" ? "grid" : "list")}
          >
            {view === "list" ? (
              <Grid2X2 className="h-4 w-4 mr-2" />
            ) : (
              <List className="h-4 w-4 mr-2" />
            )}
            {view === "list" ? "Grid View" : "List View"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => setExpandedNodes(
              expandedNodes.size ? new Set() : new Set(getAllPaths(siteStructure))
            )}
          >
            {expandedNodes.size ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {expandedNodes.size ? "Collapse All" : "Expand All"}
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-5xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              {selectedCategory || "All Categories"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className={cn(
        "grid gap-4 sm:gap-6 lg:gap-8",
        view === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "grid-cols-1 max-w-5xl mx-auto"
      )}>
        {filteredNodes.map((node) => (
          <SitemapNode
            key={node.path}
            node={node}
            view={view}
            expanded={expandedNodes.has(node.path)}
            onToggle={() => toggleNode(node.path)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredNodes.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
            <Info className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No pages found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sitemap;

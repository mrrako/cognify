"use client";

import React, { ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Something went wrong</h2>
              <p className="text-muted-foreground">
                We've encountered an unexpected error. Our team has been notified.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-left overflow-auto max-h-32">
              <p className="text-xs font-mono text-red-400">
                {this.state.error?.message || "Unknown error"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                className="rounded-full px-8"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                variant="outline" 
                asChild 
                className="rounded-full px-8"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

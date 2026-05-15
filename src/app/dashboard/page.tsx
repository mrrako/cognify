import { DashboardHeader } from "@/components/dashboard/header";
import { FileUpload } from "@/components/dashboard/file-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const recentNotes = [
    { id: "1", title: "Introduction to Biology", date: "2 hours ago", pages: 12 },
    { id: "2", title: "Microeconomics - Chapter 4", date: "Yesterday", pages: 8 },
    { id: "3", title: "Organic Chemistry Notes", date: "3 days ago", pages: 24 },
  ];

  return (
    <div className="min-h-screen bg-background dark">
      <DashboardHeader email={user.email} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Welcome Header */}
          <section>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              Welcome back, <span className="text-primary">{user.email?.split('@')[0]}</span>
            </h1>
            <p className="text-muted-foreground">What would you like to study today?</p>
          </section>

          {/* Upload Section */}
          <section>
            <FileUpload />
          </section>

          {/* Recent Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Notes
              </h2>
              <Button variant="ghost" size="sm">View all</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNotes.map((note, i) => (
                <Link key={note.id} href={`/study/${note.id}`}>
                  <Card className="hover:border-primary/50 transition-all cursor-pointer group bg-black/40 border-white/5">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{note.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <span>{note.pages} pages</span>
                        <span>•</span>
                        <span>{note.date}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-xs font-medium text-primary uppercase tracking-wider">
                        Open Study View
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

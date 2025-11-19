"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { User, TrendingUp, Award, ArrowLeft } from "lucide-react";

interface Boy {
  id: string;
  fullName: string;
  age: number;
  program: string;
  email: string;
  phone: string;
  growthMetrics: {
    skillsLevel: number;
    educationScore: number;
    athleticAbility: number;
    totalScore: number;
  };
  sponsor?: string | null;
  background: string;
  goals: string;
  createdAt: string;
}

export default function BoyDashboard() {
  const params = useParams();
  const [boy, setBoy] = useState<Boy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoy = async () => {
      try {
        const res = await fetch(`/api/boys/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setBoy({
            id: data._id || data.id,
            fullName: data.fullName,
            age: Number(data.age),
            program: data.program,
            email: data.email,
            phone: data.phone,
            sponsor: data.sponsor ?? null,
            background: data.background ?? "",
            goals: data.goals ?? "",
            createdAt: data.createdAt,
            growthMetrics: data.growthMetrics || {
              skillsLevel: 0,
              educationScore: 0,
              athleticAbility: 0,
              totalScore: 0,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching boy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoy();
  }, [params.id]);

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );

  if (!boy)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground mb-4">Profile not found</p>
          <Link href="/admin/boys" className="text-primary hover:underline">
            Back to Boys List
          </Link>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen ">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          href="/admin/boys"
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Boys List
        </Link>

        {/* Profile Card */}
        <div className="bg-card dark:bg-gray-900 border border-border rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary  flex items-center gap-3">
                <User className="w-6 h-6" />
                {boy.fullName}
              </h1>
              <p className="text-muted-foreground mt-2">
                {boy.age} years old •{" "}
                {boy.program.charAt(0).toUpperCase() + boy.program.slice(1)} Program
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text- font-bold text-foreground mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-foreground">Email:</p>
                  <p className="text-sm text-muted-foreground">{boy.email}</p>
                </div>
                <div>
                  <p className="text-foreground">Phone:</p>
                  <p className="text-sm text-muted-foreground">{boy.phone}</p>
                </div>
                <div>
                  <p className="text-foreground">
                    Joined:
                  </p>
                  <p className="text-sm text-muted-foreground">{new Date(boy.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Personal Story
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Background</p>
                  <p className="text-foreground text-sm">
                    {boy.background || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Goals</p>
                  <p className="text-foreground text-sm">
                    {boy.goals || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Section */}
        <div className="bg-card border dark:bg-gray-900 border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6" />
            Growth Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Skills Level", value: boy.growthMetrics.skillsLevel },
              { label: "Education Score", value: boy.growthMetrics.educationScore },
              { label: "Athletic Ability", value: boy.growthMetrics.athleticAbility },
            ].map((metric, i) => (
              <div
                key={i}
                className="bg-secondary dark:bg-gray-800 rounded-lg p-6 text-center border border-border"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <div className="w-full bg-border dark:bg-white rounded-full h-1 mt-3">
                  <div
                    className="bg-primary  h-full rounded-full"
                    style={{ width: `${(metric.value / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="bg-primary/10 rounded-lg p-6 text-center border border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                {boy.growthMetrics.totalScore}
                <Award className="w-6 h-6" />
              </div>
              <p className="text-sm text-foreground">Overall Score</p>
            </div>
          </div>

          {boy.sponsor && (
            <div className="mt-6 p-4 bg-secondary dark:bg-gray-800 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Sponsor</p>
              <p className="text-lg font-bold text-primary">{boy.sponsor}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

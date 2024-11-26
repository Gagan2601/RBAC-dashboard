'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, ShieldCheck, Lock, Activity } from "lucide-react";
import { getUsers, getRoles, getPermissions } from "@/lib/api";
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  const [permissionCount, setPermissionCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const usersResponse = await getUsers();
        const rolesResponse = await getRoles();
        const permissionsResponse = await getPermissions();

        setUserCount(usersResponse.data.length);
        setActiveUserCount(
          usersResponse.data.filter((user: any) => user.status === "active").length
        );
        setRoleCount(rolesResponse.data.length);
        setPermissionCount(permissionsResponse.data.length);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: "Total Users",
      value: userCount,
      icon: Users,
      description: "Total users in the system",
      color: "text-blue-500",
      link: "/users",
    },
    {
      title: "Active Users",
      value: activeUserCount,
      icon: Users,
      description: "Currently active users",
      color: "text-pink-500",
      link: "/users",
    },
    {
      title: "Active Roles",
      value: roleCount,
      icon: ShieldCheck,
      description: "Different roles configured",
      color: "text-green-500",
      link: "/roles",
    },
    {
      title: "Permissions",
      value: permissionCount,
      icon: Lock,
      description: "Unique permission sets",
      color: "text-purple-500",
      link: "/permissions",
    },
    {
      title: "Recent Activity",
      value: 0,
      icon: Activity,
      description: "Actions in last 24 hours",
      color: "text-orange-500",
      link: "/",
    }
  ];


  const handleCardClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <Card
            key={index}
            className="relative overflow-hidden group transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleCardClick(stat.link)}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-400 animate-glow-rotation rounded-full opacity-80 blur-md" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-300 to-pink-400 animate-glow-rotation-reverse rounded-full opacity-80 blur-md" />
              </div>
            </div>
            <div className="relative bg-background/90 backdrop-blur-md rounded-lg h-full z-10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                )}
                {loading ? (
                  <Skeleton className="h-6 w-6" />
                ) : (
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                )}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{stat.value}</div>
                )}
                {loading ? (
                  <Skeleton className="h-3 w-full" />
                ) : (
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                )}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShieldCheck, Lock, Activity } from "lucide-react";
import { getUsers, getRoles, getPermissions } from "@/lib/api";

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  const [permissionCount, setPermissionCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersResponse = await getUsers();
        const rolesResponse = await getRoles();
        const permissionsResponse = await getPermissions();

        setUserCount(usersResponse.data.length);
        setRoleCount(rolesResponse.data.length);
        setPermissionCount(permissionsResponse.data.length);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: "Total Users",
      value: userCount,
      icon: Users,
      description: "Active users in the system",
      color: "text-blue-500"
    },
    {
      title: "Active Roles",
      value: roleCount,
      icon: ShieldCheck,
      description: "Different roles configured",
      color: "text-green-500"
    },
    {
      title: "Permissions",
      value: permissionCount,
      icon: Lock,
      description: "Unique permission sets",
      color: "text-purple-500"
    },
    {
      title: "Recent Activity",
      value: 0, // TODO: Implement activity tracking
      icon: Activity,
      description: "Actions in last 24 hours",
      color: "text-orange-500"
    }
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="animate-fade-in-up transition-transform duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
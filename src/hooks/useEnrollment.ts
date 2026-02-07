"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/auth-provider";

/**
 * Hook to auto-enroll a user in a course when they visit
 * Also syncs progress to the backend
 */
export function useEnrollment(courseId: string) {
  const { user } = useAuth();
  const hasEnrolled = useRef(false);

  useEffect(() => {
    if (!user?.id || hasEnrolled.current) return;

    const enrollUser = async () => {
      try {
        const response = await fetch("/api/courses/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            userId: user.id,
          }),
        });

        if (response.ok) {
          hasEnrolled.current = true;
          console.log(`Enrolled in ${courseId}`);
        }
      } catch (error) {
        console.error("Enrollment failed:", error);
      }
    };

    enrollUser();
  }, [user?.id, courseId]);

  // Update progress
  const updateProgress = async (
    completedLessons: number[],
    totalLessons: number,
  ) => {
    if (!user?.id) return;

    const progress = Math.round((completedLessons.length / totalLessons) * 100);

    try {
      await fetch("/api/courses/enroll", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          userId: user.id,
          progress,
          completedLessons,
        }),
      });
    } catch (error) {
      console.error("Progress update failed:", error);
    }
  };

  return { updateProgress };
}

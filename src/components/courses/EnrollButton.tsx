"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { enrollInCourse } from "@/app/actions";
import { useState } from "react";
import { Check } from "lucide-react";

export default function EnrollButton({ courseId }: { courseId: string }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [enrolled, setEnrolled] = useState(false);

    const handleEnroll = async () => {
        if (!session) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const res = await enrollInCourse(courseId, session.user!.id!);
            if (res.success) {
                setEnrolled(true);
                setTimeout(() => router.push("/dashboard"), 1500);
            } else {
                alert(res.error || "Enrollment failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (enrolled) {
        return (
            <Button disabled className="w-full bg-green-500 text-white rounded-full py-8 text-lg font-bold flex items-center justify-center gap-2">
                <Check className="w-6 h-6" /> Enrolled Successfully!
            </Button>
        );
    }

    return (
        <Button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full bg-chocolate hover:bg-choco-dark text-white rounded-full py-8 text-lg font-bold shadow-lg shadow-chocolate/20 disabled:opacity-50"
        >
            {loading ? "Processing..." : "Enroll in Course"}
        </Button>
    );
}

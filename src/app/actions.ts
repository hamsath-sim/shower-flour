"use server";

import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function submitContactForm(formData: FormData) {
    try {
        const firstName = formData.get("firstname") as string;
        const lastName = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        await prisma.contactMessage.create({
            data: {
                firstName,
                lastName,
                email,
                message,
            },
        });

        console.log("Persistence Success:", { firstName, email });
        return { success: true };
    } catch (error) {
        console.error("Form submission failed:", error);
        return { success: false, error: "Failed to save message" };
    }
}

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, users };
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return { success: false, error: "Database fetch failed" };
    }
}

export async function deleteUser(userId: string) {
    try {
        await prisma.user.delete({
            where: { id: userId },
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete user:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function getCourses() {
    try {
        const courses = await prisma.course.findMany({
            include: {
                batches: true,
                lessons: {
                    orderBy: { orderIndex: "asc" },
                },
            },
        });
        return { success: true, courses };
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        return { success: false, error: "Database fetch failed" };
    }
}

export async function getUserEnrollments(userId: string) {
    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: true,
                batch: {
                    include: {
                        zoomLinks: true,
                    },
                },
            },
        });
        return { success: true, enrollments };
    } catch (error) {
        console.error("Failed to fetch enrollments:", error);
        return { success: false, error: "Database fetch failed" };
    }
}

export async function enrollInCourse(courseId: string, userId: string, batchId?: string) {
    try {
        const enrollment = await prisma.enrollment.create({
            data: {
                userId,
                courseId,
                batchId,
                amount: 5999, // Placeholder
                paid: true,
            },
        });
        revalidatePath("/dashboard");
        return { success: true, enrollment };
    } catch (error) {
        console.error("Enrollment failed:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function getCourseById(id: string) {
    try {
        const course = await prisma.course.findUnique({
            where: { id },
            include: {
                batches: true,
                lessons: {
                    orderBy: { orderIndex: "asc" },
                },
            },
        });
        return { success: true, course };
    } catch (error) {
        console.error("Failed to fetch course:", error);
        return { success: false, error: "Database fetch failed" };
    }
}

export async function registerUser(data: { name: string, email: string, password: string, phone?: string }) {
    try {
        const normalizedEmail = data.email.toLowerCase().trim();
        const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (existingUser) return { success: false, error: "Email already registered" };

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await (prisma.user as any).create({
            data: {
                name: data.name,
                email: normalizedEmail,
                password: hashedPassword,
                phone: data.phone,
                role: "STUDENT",
            },
        });

        return { success: true, user: { id: user.id, email: user.email } };
    } catch (error) {
        console.error("Full Registration Error:", error);
        return { success: false, error: `Registration error: ${error instanceof Error ? error.message : "Unknown error"}` };
    }
}

export async function getAdminStats() {
    try {
        const [userCount, courseCount, enrollmentCount, messageCount, totalRevenue] = await Promise.all([
            prisma.user.count(),
            prisma.course.count(),
            prisma.enrollment.count(),
            prisma.contactMessage.count(),
            prisma.enrollment.aggregate({
                _sum: { amount: true },
                where: { paid: true }
            })
        ]);

        // Get recent signups for trend
        const recentUsers = await prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            select: { name: true, email: true, createdAt: true }
        });

        // Get top courses
        const topCourses = await prisma.course.findMany({
            take: 3,
            orderBy: { enrollments: { _count: "desc" } },
            select: { title: true, _count: { select: { enrollments: true } } }
        });

        return {
            success: true,
            stats: {
                userCount,
                courseCount,
                enrollmentCount,
                messageCount,
                revenue: totalRevenue._sum.amount || 0,
                recentUsers,
                topCourses
            }
        };
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return { success: false, error: "Database fetch failed" };
    }
}


export async function createCourse(data: any) {
    try {
        const course = await prisma.course.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                price: parseFloat(data.price),
                oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
                thumbnail: data.thumbnail,
                type: data.type,
                level: data.level,
                sessions: parseInt(data.sessions),
                duration: data.duration,
            },
        });
        revalidatePath("/admin/courses");
        revalidatePath("/");
        return { success: true, course };
    } catch (error) {
        console.error("Failed to create course:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function updateCourse(id: string, data: any) {
    try {
        const course = await prisma.course.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                price: parseFloat(data.price),
                oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
                thumbnail: data.thumbnail,
                type: data.type,
                level: data.level,
                sessions: parseInt(data.sessions),
                duration: data.duration,
            },
        });
        revalidatePath("/admin/courses");
        revalidatePath(`/admin/courses/${id}`);
        revalidatePath("/");
        return { success: true, course };
    } catch (error) {
        console.error("Failed to update course:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function deleteCourse(id: string) {
    try {
        await prisma.course.delete({
            where: { id },
        });
        revalidatePath("/admin/courses");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete course:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function getEnrollments() {
    try {
        const enrollments = await prisma.enrollment.findMany({
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } },
                batch: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, enrollments };
    } catch (error) {
        console.error("Failed to fetch enrollments:", error);
        return { success: false, error: "Database fetch failed" };
    }
}

export async function updateEnrollmentStatus(id: string, paid: boolean) {
    try {
        await prisma.enrollment.update({
            where: { id },
            data: { paid },
        });
        revalidatePath("/admin/enrollments");
        return { success: true };
    } catch (error) {
        console.error("Failed to update enrollment:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function getBatches() {
    try {
        const batches = await prisma.batch.findMany({
            include: {
                course: { select: { title: true } },
                enrollments: { select: { id: true } },
            },
            orderBy: { startDate: "asc" },
        });
        return { success: true, batches };
    } catch (error) {
        console.error("Failed to fetch batches:", error);
        return { success: false, error: "Database fetch failed" };
    }
}

export async function createBatch(data: any) {
    try {
        const batch = await prisma.batch.create({
            data: {
                courseId: data.courseId,
                name: data.name,
                schedule: data.schedule,
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
                maxSeats: parseInt(data.maxSeats),
            },
        });
        revalidatePath("/admin/batches");
        return { success: true, batch };
    } catch (error) {
        console.error("Failed to create batch:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function deleteBatch(id: string) {
    try {
        await prisma.batch.delete({
            where: { id },
        });
        revalidatePath("/admin/batches");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete batch:", error);
        return { success: false, error: "Database operation failed" };
    }
}

export async function getContactMessages() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, messages };
    } catch (error) {
        console.error("Failed to fetch contact messages:", error);
        return { success: false, error: "Database fetch failed" };
    }
}


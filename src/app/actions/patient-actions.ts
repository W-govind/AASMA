"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPatient(data: any) {
    try {
        const patient = await prisma.patient.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                age: parseInt(data.age),
                gender: data.gender,
                medicalHistory: data.medicalHistory || "None",
                heartRate: parseFloat(data.heartRate) || 70,
                hrv: parseFloat(data.hrv) || 50,
                systolicBp: parseFloat(data.systolicBp) || 120,
                diastolicBp: parseFloat(data.diastolicBp) || 80,
                spo2: parseFloat(data.spo2) || 98,
                temperature: parseFloat(data.temperature) || 36.5,
                activityLevel: parseFloat(data.activityLevel) || 5.0,
                pm25: parseFloat(data.pm25) || 15.0,
                aqi: parseFloat(data.aqi) || 45.0,
                riskScore: parseFloat(data.riskScore) || 45.0,
                status: data.status || "Stable",
                adherenceRate: parseFloat(data.adherenceRate) || 0.85
            },
        });

        revalidatePath("/patients");
        return { success: true, patient };
    } catch (error: any) {
        console.error("Error creating patient:", error);
        return { success: false, error: error.message };
    }
}

export async function updatePatient(id: string, data: any) {
    try {
        const patient = await prisma.patient.update({
            where: { id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                age: parseInt(data.age),
                gender: data.gender,
                medicalHistory: data.medicalHistory,
                heartRate: parseFloat(data.heartRate),
                hrv: parseFloat(data.hrv),
                systolicBp: parseFloat(data.systolicBp),
                diastolicBp: parseFloat(data.diastolicBp),
                spo2: parseFloat(data.spo2),
                temperature: parseFloat(data.temperature),
                activityLevel: parseFloat(data.activityLevel),
                pm25: parseFloat(data.pm25),
                aqi: parseFloat(data.aqi),
                riskScore: parseFloat(data.riskScore),
                status: data.status,
                adherenceRate: parseFloat(data.adherenceRate)
            },
        });

        revalidatePath("/patients");
        return { success: true, patient };
    } catch (error: any) {
        console.error("Error updating patient:", error);
        return { success: false, error: error.message };
    }
}

export async function deletePatient(id: string) {
    try {
        await prisma.patient.delete({ where: { id } });
        revalidatePath("/patients");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

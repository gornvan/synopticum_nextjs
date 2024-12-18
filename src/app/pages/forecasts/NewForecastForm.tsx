"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSynopticumApiClient } from "@/app/apiClients/synopticum/SynopticumApiClientProviderWrapper";

// Validation schema for the form
const ForecastSchema = Yup.object().shape({
    date: Yup.string()
        .required("Date is required")
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Date must be in the format YYYY-MM-DD"
        ),
    temperatureC: Yup.number()
        .required("Temperature is required")
        .min(-50, "Temperature cannot be below -50°C")
        .max(50, "Temperature cannot exceed 50°C"),
    summary: Yup.number()
        .required("Summary is required")
        .min(0, "Invalid summary value")
        .max(10, "Invalid summary value")
        .integer("Summary must be a whole number"),
});

const NewForecastForm = ({ country, city }: { country: string; city: string }) => {
    const client = useSynopticumApiClient();

    const handleSubmit = async (values: any, { setSubmitting, resetForm, setStatus }: any) => {
        if (!client) {
            console.error("API client not initialized.");
            return;
        }

        try {
            await client.createForecast(country, city, {
                date: values.date,
                temperatureC: Number(values.temperatureC),
                summary: Number(values.summary),
            });
            setStatus({ success: "Forecast successfully created!" });
            resetForm();
        } catch (error: any) {
            console.error("Error creating forecast:", error.message);
            setStatus({ error: "Failed to create the forecast. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Forecast for {city}, {country}</h2>
            <Formik
                initialValues={{
                    date: "",
                    temperatureC: "",
                    summary: "",
                }}
                validationSchema={ForecastSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        {/* Date Field */}
                        <div className="mb-4">
                            <label htmlFor="date" className="block font-medium">Date (YYYY-MM-DD)</label>
                            <Field
                                type="text"
                                name="date"
                                id="date"
                                className="w-full border p-2 rounded"
                            />
                            <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Temperature Field */}
                        <div className="mb-4">
                            <label htmlFor="temperatureC" className="block font-medium">Temperature (°C)</label>
                            <Field
                                type="number"
                                name="temperatureC"
                                id="temperatureC"
                                className="w-full border p-2 rounded"
                            />
                            <ErrorMessage name="temperatureC" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Summary Field */}
                        <div className="mb-4">
                            <label htmlFor="summary" className="block font-medium">Summary</label>
                            <Field
                                as="select"
                                name="summary"
                                id="summary"
                                className="w-full border p-2 rounded"
                            >
                                <option value="" label="Select summary" />
                                <option value="0">Liquifying</option>
                                <option value="1">Freezing</option>
                                <option value="2">Bracing</option>
                                <option value="3">Chilly</option>
                                <option value="4">Cool</option>
                                <option value="5">Mild</option>
                                <option value="6">Warm</option>
                                <option value="7">Hot</option>
                                <option value="8">Sweating</option>
                                <option value="9">Sweltering</option>
                                <option value="10">Scorching</option>
                            </Field>
                            <ErrorMessage name="summary" component="div" className="text-red-500 text-sm" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {isSubmitting ? "Submitting..." : "Create Forecast"}
                            </button>
                        </div>

                        {/* Success/Error Messages */}
                        {status?.success && (
                            <div className="mt-4 text-green-500">{status.success}</div>
                        )}
                        {status?.error && (
                            <div className="mt-4 text-red-500">{status.error}</div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewForecastForm;

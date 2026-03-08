import { describe, expect, it, vi, beforeEach } from "vitest";
import { z } from "zod";

describe("Delete Request Validation", () => {
  const deleteRequestSchema = z.object({
    userId: z.string().uuid(),
    email: z.string().email(),
    reason: z.string().min(1),
    otherReasonDetail: z.string().optional(),
  });

  it("should validate a valid delete request", () => {
    const validRequest = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      email: "user@example.com",
      reason: "I am not interested",
    };

    const result = deleteRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it("should validate delete request with other reason detail", () => {
    const validRequest = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      email: "user@example.com",
      reason: "Other reason",
      otherReasonDetail: "The app does not meet my needs",
    };

    const result = deleteRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const invalidRequest = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      email: "invalid-email",
      reason: "I am not interested",
    };

    const result = deleteRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it("should reject invalid UUID", () => {
    const invalidRequest = {
      userId: "not-a-uuid",
      email: "user@example.com",
      reason: "I am not interested",
    };

    const result = deleteRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it("should reject empty reason", () => {
    const invalidRequest = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      email: "user@example.com",
      reason: "",
    };

    const result = deleteRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it("should reject missing required fields", () => {
    const invalidRequest = {
      email: "user@example.com",
      reason: "I am not interested",
    };

    const result = deleteRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });
});

describe("Delete Request Reasons", () => {
  const validReasons = [
    "I am not interested",
    "I found a better application",
    "It is very expensive",
    "It is slow",
    "It doesn't have features I want",
    "Other reason",
  ];

  it("should accept all predefined reasons", () => {
    validReasons.forEach((reason) => {
      const request = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
        email: "user@example.com",
        reason,
      };

      const reasonSchema = z.object({
        reason: z.enum([
          "I am not interested",
          "I found a better application",
          "It is very expensive",
          "It is slow",
          "It doesn't have features I want",
          "Other reason",
        ] as const),
      });

      const result = reasonSchema.safeParse({ reason });
      expect(result.success).toBe(true);
    });
  });

  it("should reject invalid reason", () => {
    const reasonSchema = z.object({
      reason: z.enum([
        "I am not interested",
        "I found a better application",
        "It is very expensive",
        "It is slow",
        "It doesn't have features I want",
        "Other reason",
      ] as const),
    });

    const result = reasonSchema.safeParse({ reason: "Invalid reason" });
    expect(result.success).toBe(false);
  });
});

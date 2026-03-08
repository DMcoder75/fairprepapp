import { describe, expect, it } from "vitest";

describe("Supabase Configuration", () => {
  it("should have valid Supabase environment variables", () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseUrl).toMatch(/^https:\/\/.*\.supabase\.co$/);

    expect(supabaseAnonKey).toBeDefined();
    expect(supabaseAnonKey).toMatch(/^eyJ/); // JWT tokens start with eyJ
  });

  it("should have valid JWT structure in ANON_KEY", () => {
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
    expect(anonKey).toBeDefined();

    // JWT has 3 parts separated by dots
    const parts = anonKey!.split(".");
    expect(parts).toHaveLength(3);

    // Decode and verify it's a valid JWT structure
    const decoded = JSON.parse(Buffer.from(parts[1], "base64").toString());
    expect(decoded).toHaveProperty("iss");
    expect(decoded.iss).toBe("supabase");
    expect(decoded).toHaveProperty("role");
    expect(decoded.role).toBe("anon");
  });
});

import z from "zod";

export function dynamicFieldZod<T extends z.ZodTypeAny>(
  schema: T,
  mode: "mandatory" | "optional" | "off"
): T | z.ZodOptional<T> | undefined {
  if (mode === "mandatory") return schema;
  if (mode === "optional") return schema.optional();
  return undefined;
}

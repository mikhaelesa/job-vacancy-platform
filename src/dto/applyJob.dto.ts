import z from "zod";
import { dynamicFieldZod } from "../helpers/dynamicFieldZod.helper";

export function buildDynamicSchema(settings: {
  id: string;
  full_name_setting: "mandatory" | "optional" | "off";
  photo_profile_setting: "mandatory" | "optional" | "off";
  gender_setting: "mandatory" | "optional" | "off";
  domicile_setting: "mandatory" | "optional" | "off";
  email_setting: "mandatory" | "optional" | "off";
  phone_number_setting: "mandatory" | "optional" | "off";
  linkedin_setting: "mandatory" | "optional" | "off";
  date_of_birth_setting: "mandatory" | "optional" | "off";
}) {
  // Base field definitions
  const fullName = dynamicFieldZod(
    z.string("Full name must be filled").min(1, "Full name must be filled"),
    settings.full_name_setting
  );

  const photoProfile = dynamicFieldZod(
    z.string("Photo must be uploaded"),
    settings.photo_profile_setting
  );

  const gender = dynamicFieldZod(
    z.enum(["male", "female"], "Gender must be filled"),
    settings.gender_setting
  );

  const provinceId = dynamicFieldZod(
    z.number().min(1, "Domicile must be filled"),
    settings.domicile_setting
  );

  const email = dynamicFieldZod(
    z
      .string("Please enter your email in the format: name@example.com")
      .email("Please enter your email in the format: name@example.com"),
    settings.email_setting
  );

  const phoneNumber = dynamicFieldZod(
    z.string().regex(/^[0-9+\-\s]+$/, "Invalid phone number"),
    settings.phone_number_setting
  );

  const linkedin = dynamicFieldZod(
    z
      .string("Linkedin link must be filled")
      .regex(
        /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
        "Must be a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"
      ),
    settings.linkedin_setting
  );

  const dateOfBirth = dynamicFieldZod(
    z
      .string("Date of birth must be filled")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    settings.date_of_birth_setting
  );

  // Compose final schema
  return z.object({
    ...(fullName && { full_name: fullName }),
    ...(photoProfile && { photo_profile: photoProfile }),
    ...(gender && { gender }),
    ...(provinceId && { province_id: provinceId }),
    ...(email && { email }),
    ...(phoneNumber && { phone_number: phoneNumber }),
    ...(linkedin && { linkedin }),
    ...(dateOfBirth && { date_of_birth: dateOfBirth }),
  });
}

export interface IApplyJobRequestBody {
  linkedin?: string;
  fullName?: string;
  gender?: string;
  phoneCode?: number;
  phoneNumber?: string;
  email?: string;
  provinceId?: number;
  dateOfBirth?: string;
  photo?: Blob;
}

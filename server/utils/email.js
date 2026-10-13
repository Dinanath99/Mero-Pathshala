export const normalizeEmail = (email) => {
  if (!email || typeof email !== "string") return "";
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return "";
  return trimmed;
};

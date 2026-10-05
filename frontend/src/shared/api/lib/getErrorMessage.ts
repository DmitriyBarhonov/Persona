import { isAxiosError } from "axios";
import { i18n } from "@/src/shared/i18n";

export const getErrorMessage = (err: unknown) => {
  const message = isAxiosError(err) ? err.response?.data?.error : undefined;
  return message ?? i18n.t("errors.generic");
};

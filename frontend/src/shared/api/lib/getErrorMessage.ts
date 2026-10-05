import { isAxiosError } from "axios";
import i18next from "../../i18n/i18n";

export const getErrorMessage = (err: unknown) => {
  const message = isAxiosError(err) ? err.response?.data?.error : undefined;
  return message ?? i18next.t("errors.generic");
};

export const THEME_STORAGE_KEY = "persona-theme";

// Выполняется в <head> до первой отрисовки: ставит data-theme на <html>
// из сохранённого выбора, а если его нет — по настройке системы.
// Без этого страница при загрузке сначала мигала бы светлой темой.
export const themeScript = `
try {
  var theme = localStorage.getItem("${THEME_STORAGE_KEY}");
  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
} catch (e) {}
`;

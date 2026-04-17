// ========== Theme Management ==========

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const MEDIA_QUERY_DARK = '(prefers-color-scheme: dark)';

/**
 * 保存済みテーマを取得
 * @returns {string|null}
 */
function getStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === THEME_DARK || value === THEME_LIGHT) {
      return value;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  return null;
}

/**
 * テーマを保存
 * @param {string} theme
 */
function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
}

/**
 * 現在のOS設定に基づくテーマを取得
 * @returns {string}
 */
function getSystemTheme() {
  return window.matchMedia(MEDIA_QUERY_DARK).matches ? THEME_DARK : THEME_LIGHT;
}

/**
 * HTMLにテーマを反映
 * @param {string} theme
 */
export function applyTheme(theme) {
  const nextTheme = theme === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
  document.documentElement.setAttribute('data-theme', nextTheme);
}

/**
 * トグルボタン表示を更新
 * @param {HTMLElement|null} button
 * @param {string} theme
 */
function updateThemeToggleButton(button, theme) {
  if (!button) {
    return;
  }

  const icon = button.querySelector('i');
  const isLight = theme === THEME_LIGHT;

  button.setAttribute(
    'aria-label',
    isLight ? 'Switch to dark theme' : 'Switch to light theme'
  );
  button.setAttribute('title', isLight ? 'Dark theme' : 'Light theme');
  button.setAttribute('aria-pressed', String(isLight));

  if (icon) {
    icon.classList.remove('fa-sun', 'fa-moon');
    icon.classList.add(isLight ? 'fa-sun' : 'fa-moon');
  }
}

/**
 * 初期テーマを決定して反映
 * @returns {string}
 */
export function initializeTheme() {
  const storedTheme = getStoredTheme();
  const resolvedTheme = storedTheme || getSystemTheme();

  applyTheme(resolvedTheme);
  return resolvedTheme;
}

/**
 * テーマ切替UIを初期化
 */
export function initializeThemeSwitcher() {
  const themeButton = document.querySelector('[data-theme-toggle]');

  if (!themeButton) {
    return;
  }

  const getCurrentTheme = () => (
    document.documentElement.getAttribute('data-theme') === THEME_LIGHT
      ? THEME_LIGHT
      : THEME_DARK
  );

  updateThemeToggleButton(themeButton, getCurrentTheme());

  themeButton.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

    applyTheme(nextTheme);
    storeTheme(nextTheme);
    updateThemeToggleButton(themeButton, nextTheme);
  });

  const mediaQuery = window.matchMedia(MEDIA_QUERY_DARK);
  mediaQuery.addEventListener('change', (event) => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return;
    }

    const nextTheme = event.matches ? THEME_DARK : THEME_LIGHT;
    applyTheme(nextTheme);
    updateThemeToggleButton(themeButton, nextTheme);
  });
}

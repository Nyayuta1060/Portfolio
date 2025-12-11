// ========== 国際化(i18n)マネージャー ==========

/**
 * i18nマネージャークラス
 * 言語切り替え、翻訳の取得、UIの更新を管理
 */
class I18nManager {
  constructor() {
    this.currentLanguage = 'ja'; // デフォルト言語
    this.translations = {}; // 翻訳データ
    this.supportedLanguages = ['ja', 'en']; // サポートする言語
    this.fallbackLanguage = 'ja'; // フォールバック言語
  }

  /**
   * 初期化
   */
  async initialize() {
    try {
      // ローカルストレージから保存された言語を読み込む
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
        this.currentLanguage = savedLanguage;
      } else {
        // ブラウザの言語設定を取得
        const browserLanguage = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLanguage)) {
          this.currentLanguage = browserLanguage;
        }
      }

      // 翻訳データを読み込む
      await this.loadTranslations(this.currentLanguage);
      
      // HTMLのlang属性を更新
      document.documentElement.lang = this.currentLanguage;

      console.log(`✅ i18n initialized with language: ${this.currentLanguage}`);
    } catch (error) {
      console.error('❌ Failed to initialize i18n:', error);
      // フォールバック言語を読み込む
      await this.loadTranslations(this.fallbackLanguage);
    }
  }

  /**
   * 翻訳データを読み込む
   * @param {string} language - 言語コード
   */
  async loadTranslations(language) {
    try {
      const response = await fetch(`./src/data/locales/${language}/main.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`);
      }
      this.translations[language] = await response.json();
      console.log(`✅ Loaded translations for ${language}`);
    } catch (error) {
      console.error(`❌ Failed to load translations for ${language}:`, error);
      throw error;
    }
  }

  /**
   * 翻訳を取得
   * @param {string} key - 翻訳キー (例: 'nav.home', 'hero.greeting')
   * @param {object} params - プレースホルダーの置換パラメータ
   * @returns {string} 翻訳されたテキスト
   */
  t(key, params = {}) {
    try {
      const keys = key.split('.');
      let translation = this.translations[this.currentLanguage];

      // ネストされたキーを辿る
      for (const k of keys) {
        if (translation && typeof translation === 'object') {
          translation = translation[k];
        } else {
          throw new Error(`Translation key not found: ${key}`);
        }
      }

      if (typeof translation !== 'string') {
        throw new Error(`Translation for ${key} is not a string`);
      }

      // プレースホルダーを置換
      let result = translation;
      Object.keys(params).forEach(param => {
        result = result.replace(new RegExp(`{${param}}`, 'g'), params[param]);
      });

      return result;
    } catch (error) {
      console.warn(`⚠️ Translation error for key "${key}":`, error.message);
      // フォールバック: キーをそのまま返す
      return key;
    }
  }

  /**
   * 言語を切り替える
   * @param {string} language - 言語コード
   */
  async switchLanguage(language) {
    if (!this.supportedLanguages.includes(language)) {
      console.error(`❌ Unsupported language: ${language}`);
      return;
    }

    if (language === this.currentLanguage) {
      console.log(`ℹ️ Already using language: ${language}`);
      return;
    }

    try {
      // 翻訳データが未読み込みの場合は読み込む
      if (!this.translations[language]) {
        await this.loadTranslations(language);
      }

      this.currentLanguage = language;
      localStorage.setItem('preferredLanguage', language);
      document.documentElement.lang = language;

      // UIを更新
      this.updateUI();

      // カスタムイベントを発火
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }));

      console.log(`✅ Switched to language: ${language}`);
    } catch (error) {
      console.error(`❌ Failed to switch language to ${language}:`, error);
    }
  }

  /**
   * UIを更新
   */
  updateUI() {
    // data-i18n属性を持つすべての要素を取得
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      // data-i18n-html属性があればinnerHTMLを使用
      if (element.hasAttribute('data-i18n-html')) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    });

    // プレースホルダーを持つ要素を更新
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });

    // タイトルを持つ要素を更新
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      element.title = this.t(key);
    });

    // aria-labelを持つ要素を更新
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      element.setAttribute('aria-label', this.t(key));
    });

    console.log('✅ UI updated with current language');
  }

  /**
   * 現在の言語を取得
   * @returns {string} 現在の言語コード
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * サポートされている言語のリストを取得
   * @returns {Array<string>} サポートされている言語コードの配列
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }
}

// グローバルインスタンスを作成
const i18n = new I18nManager();

export default i18n;
export { I18nManager };

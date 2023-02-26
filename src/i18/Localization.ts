export class LocalizationLibrary {
  private readonly translations: Record<string, Record<string, string>>;

  constructor(translations: Record<string, Record<string, string>>) {
    this.translations = translations;
  }

  translate(text?: string, language?: string): string | undefined {
    if (!language || !text) return;
    const translationsForLanguage = this.translations[language];
    if (translationsForLanguage && translationsForLanguage[text]) {
      return translationsForLanguage[text];
    } else {
      return text;
    }
  }
}

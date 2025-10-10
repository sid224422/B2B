'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' }
]

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
  className?: string
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  className 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    onLanguageChange(languageCode)
    setIsOpen(false)
    
    // Store language preference in localStorage
    localStorage.setItem('ai-language-preference', languageCode)
    
    // Update document language attribute
    document.documentElement.lang = languageCode
  }

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className={cn(
        "w-auto min-w-[140px] h-8 text-xs bg-background/50 border-border/50 hover:bg-background hover:border-primary/50 transition-all duration-300",
        className
      )}>
        <div className="flex items-center gap-2">
          <Globe className="h-3 w-3" />
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
          <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        </div>
      </SelectTrigger>
      
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {languages.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="h-4 w-4 ml-auto text-primary" />
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// Language-specific translations
export const translations = {
  en: {
    placeholder: "Ask me anything about B2B services...",
    suggestions: "Try asking:",
    quickActions: "Quick Actions:",
    clearChat: "Clear chat",
    exportConversation: "Export conversation",
    voiceInput: "Voice input",
    aiSearch: "AI Search",
    loading: "Thinking...",
    noResults: "No relevant documents found. Try rephrasing your question.",
    error: "Sorry, I encountered an error. Please try again.",
    webDev: "Web Development",
    marketing: "Marketing", 
    saas: "SaaS",
    security: "Security",
    cloud: "Cloud",
    analytics: "Analytics",
    design: "Design"
  },
  es: {
    placeholder: "Pregúntame cualquier cosa sobre servicios B2B...",
    suggestions: "Prueba preguntando:",
    quickActions: "Acciones Rápidas:",
    clearChat: "Limpiar chat",
    exportConversation: "Exportar conversación",
    voiceInput: "Entrada de voz",
    aiSearch: "Búsqueda IA",
    loading: "Pensando...",
    noResults: "No se encontraron documentos relevantes. Intenta reformular tu pregunta.",
    error: "Lo siento, encontré un error. Por favor intenta de nuevo.",
    webDev: "Desarrollo Web",
    marketing: "Marketing",
    saas: "SaaS",
    security: "Seguridad",
    cloud: "Nube",
    analytics: "Analítica",
    design: "Diseño"
  },
  fr: {
    placeholder: "Demandez-moi n'importe quoi sur les services B2B...",
    suggestions: "Essayez de demander:",
    quickActions: "Actions Rapides:",
    clearChat: "Effacer le chat",
    exportConversation: "Exporter la conversation",
    voiceInput: "Entrée vocale",
    aiSearch: "Recherche IA",
    loading: "Réflexion...",
    noResults: "Aucun document pertinent trouvé. Essayez de reformuler votre question.",
    error: "Désolé, j'ai rencontré une erreur. Veuillez réessayer.",
    webDev: "Développement Web",
    marketing: "Marketing",
    saas: "SaaS",
    security: "Sécurité",
    cloud: "Cloud",
    analytics: "Analytique",
    design: "Design"
  },
  de: {
    placeholder: "Fragen Sie mich alles über B2B-Dienstleistungen...",
    suggestions: "Versuchen Sie zu fragen:",
    quickActions: "Schnellaktionen:",
    clearChat: "Chat löschen",
    exportConversation: "Konversation exportieren",
    voiceInput: "Spracheingabe",
    aiSearch: "KI-Suche",
    loading: "Denke nach...",
    noResults: "Keine relevanten Dokumente gefunden. Versuchen Sie, Ihre Frage umzuformulieren.",
    error: "Entschuldigung, ich bin auf einen Fehler gestoßen. Bitte versuchen Sie es erneut.",
    webDev: "Webentwicklung",
    marketing: "Marketing",
    saas: "SaaS",
    security: "Sicherheit",
    cloud: "Cloud",
    analytics: "Analytik",
    design: "Design"
  }
}

export function getTranslation(key: string, language: string = 'en'): string {
  return (translations as any)[language]?.[key] || (translations as any)['en'][key] || key
}

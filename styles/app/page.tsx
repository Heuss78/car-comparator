"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Star, Users, Shield, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import AuthModal from "@/components/auth-modal"
import CarComparator from "@/components/car-comparator"

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [showComparator, setShowComparator] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  const handleAuth = (mode: "login" | "register") => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  const handleAuthSuccess = (name: string) => {
    setIsLoggedIn(true)
    setUserName(name)
    setShowAuth(false)
  }

  if (showComparator) {
    return <CarComparator onBack={() => setShowComparator(false)} isLoggedIn={isLoggedIn} userName={userName} />
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
              SportCarAI
            </span>
            <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700">
              <Sparkles className="w-3 h-3 mr-1" />
              Intelligence Avancée
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Bonjour, {userName}</span>
                <Button variant="outline" onClick={() => setShowComparator(true)}>
                  Comparer
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => handleAuth("login")}>
                  Connexion
                </Button>
                <Button onClick={() => handleAuth("register")}>Inscription</Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Car Background */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(239, 68, 68, 0.9), rgba(147, 51, 234, 0.9)), url('/placeholder.svg?height=800&width=1200&text=Supercar+Background')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-600/20"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Technologie de Pointe</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
            Trouvez votre voiture de rêve avec l'intelligence artificielle
          </h1>

          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Notre technologie révolutionnaire analyse en temps réel des milliers de données techniques, avis d'experts
            et retours d'utilisateurs pour vous recommander LA voiture parfaite. Que vous cherchiez une sportive, une
            familiale ou une citadine, notre système comprend vos besoins et vous guide vers le meilleur choix selon
            votre budget et vos critères.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 shadow-lg font-semibold"
              onClick={() => (isLoggedIn ? setShowComparator(true) : handleAuth("register"))}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Voir la démo
            </Button>
          </div>

          {/* Free Trial Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-500/90 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/30">
            <Star className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">2 comparaisons gratuites • Puis 9,99€/mois</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Pourquoi choisir SportCarAI ?</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Notre plateforme utilise une technologie avancée pour vous offrir des comparaisons précises et
              personnalisées.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Analyse Intelligente</CardTitle>
                <CardDescription>
                  Notre système analyse plus de 50 critères pour chaque voiture et vous donne un ranking personnalisé.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Comparaisons Détaillées</CardTitle>
                <CardDescription>
                  Avantages, inconvénients, coûts cachés - tout est analysé pour vous aider à décider.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Données Fiables</CardTitle>
                <CardDescription>
                  Informations mises à jour en temps réel depuis les constructeurs et les tests indépendants.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section with Car Background */}
      <section
        className="py-16 px-4 relative"
        style={{
          background: `linear-gradient(45deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)), url('/placeholder.svg?height=600&width=1200&text=Luxury+Cars+Showroom')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Tarification Simple et Transparente</h2>
          <p className="text-white/80 mb-12">Commencez gratuitement, continuez pour seulement 9,99€/mois</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="border-2 border-white/30 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Essai Gratuit</CardTitle>
                <div className="text-3xl font-bold text-green-600">0€</div>
                <CardDescription>Pour découvrir notre service</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-green-500 mr-2" />2 comparaisons gratuites
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-green-500 mr-2" />
                    Analyse basique
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-green-500 mr-2" />
                    Avantages/Inconvénients
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-400 relative bg-white/95 backdrop-blur-sm">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-yellow-500 text-black">Recommandé</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-3xl font-bold text-blue-600">
                  9,99€<span className="text-lg text-gray-500">/mois</span>
                </div>
                <CardDescription>Pour les acheteurs sérieux</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Comparaisons illimitées
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Analyse complète
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Ranking personnalisé
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Alertes prix
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" onClick={() => handleAuth("register")}>
                  Commencer maintenant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 via-red-600 to-purple-700">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-white">Prêt à trouver votre voiture idéale ?</h2>
          <p className="text-xl mb-8 text-white/90">
            Rejoignez des milliers d'acheteurs qui ont trouvé leur voiture parfaite grâce à notre technologie.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 font-semibold shadow-lg"
            onClick={() => (isLoggedIn ? setShowComparator(true) : handleAuth("register"))}
          >
            <Users className="w-5 h-5 mr-2" />
            Commencer gratuitement
          </Button>
        </div>
      </section>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} mode={authMode} onSuccess={handleAuthSuccess} />
    </div>
  )
}

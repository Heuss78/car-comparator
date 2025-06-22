"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Sparkles, Star, X } from "lucide-react"
import CarSelector from "@/components/car-selector"
import PopularComparisons from "@/components/popular-comparisons"

interface Car {
  id: string
  name: string
  brand: string
  price: number
  image: string
  power: string
  model?: string
  version?: string
}

interface CarComparatorProps {
  onBack: () => void
  isLoggedIn: boolean
  userName: string
}

export default function CarComparator({ onBack, isLoggedIn, userName }: CarComparatorProps) {
  const [selectedCars, setSelectedCars] = useState<Car[]>([])
  const [usageCount, setUsageCount] = useState(0)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("carComparatorUsage")
    if (stored) {
      setUsageCount(Number.parseInt(stored))
    }
  }, [])

  const handleCarSelected = (car: Car) => {
    if (selectedCars.length < 3 && !selectedCars.find((c) => c.id === car.id)) {
      setSelectedCars([...selectedCars, car])
    }
  }

  const handleRemoveCar = (carId: string) => {
    setSelectedCars(selectedCars.filter((car) => car.id !== carId))
  }

  const handlePopularComparison = (cars: Car[]) => {
    setSelectedCars(cars)
    setShowComparison(true)
  }

  const handleCompare = () => {
    if (!isLoggedIn) {
      alert("Veuillez vous connecter pour utiliser le comparateur")
      return
    }

    if (usageCount >= 2) {
      setShowUpgrade(true)
      return
    }

    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowComparison(true)
      const newCount = usageCount + 1
      setUsageCount(newCount)
      localStorage.setItem("carComparatorUsage", newCount.toString())
    }, 2000)
  }

  // Données détaillées pour la comparaison
  const getDetailedCarData = (car: Car) => ({
    ...car,
    category: "Supercar",
    fuel: "Essence",
    consumption: "10.5L/100km",
    seats: 2,
    safety: 5,
    reliability: 4,
    aiScore: Math.floor(Math.random() * 20) + 80,
    pros: ["Performances exceptionnelles", "Design iconique", "Technologie avancée", "Prestige"],
    cons: ["Prix élevé", "Consommation importante", "Entretien coûteux"],
  })

  const detailedCars = selectedCars.map(getDetailedCarData)
  const sortedCars = [...detailedCars].sort((a, b) => b.aiScore - a.aiScore)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <span className="font-semibold">Comparateur Intelligent</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={usageCount >= 2 ? "destructive" : "secondary"}>{usageCount}/2 utilisations gratuites</Badge>
            <span className="text-sm text-gray-600">Bonjour, {userName}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!showComparison ? (
          <>
            {/* Sélecteur de voitures */}
            <CarSelector onCarSelected={handleCarSelected} selectedCars={selectedCars} />

            {/* Bouton de comparaison */}
            {selectedCars.length >= 2 && (
              <div className="text-center mb-8">
                <Button
                  size="lg"
                  onClick={handleCompare}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-orange-600 hover:via-red-600 hover:to-purple-700 shadow-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Comparer ({selectedCars.length} voitures)
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Comparaisons populaires */}
            <PopularComparisons onComparisonSelect={handlePopularComparison} />
          </>
        ) : (
          <>
            {/* Résultats de comparaison */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Résultats de la comparaison</h1>
              <Button variant="outline" onClick={() => setShowComparison(false)}>
                Nouvelle comparaison
              </Button>
            </div>

            {/* Voitures sélectionnées */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {selectedCars.map((car, index) => (
                <Card key={car.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => handleRemoveCar(car.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <CardHeader className="pb-2">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <CardTitle className="text-lg">{car.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Prix:</span>
                        <span className="font-semibold">{car.price.toLocaleString()}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Puissance:</span>
                        <span>{car.power}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Classement IA */}
            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 via-red-50 to-purple-50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                    Classement Intelligent
                  </span>
                </CardTitle>
                <CardDescription>
                  Analyse basée sur les performances, le rapport qualité-prix et les avis d'experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedCars.map((car, index) => (
                    <div key={car.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 text-white rounded-full font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{car.name}</h3>
                        <p className="text-sm text-gray-600">{car.price.toLocaleString()}€</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{car.aiScore}/100</div>
                        <Progress value={car.aiScore} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Modal d'upgrade */}
        {showUpgrade && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Limite atteinte !</CardTitle>
                <CardDescription>
                  Vous avez utilisé vos 2 comparaisons gratuites. Passez à Premium pour continuer.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-blue-600">9,99€/mois</div>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Comparaisons illimitées
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Analyse avancée
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Alertes prix
                  </li>
                </ul>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowUpgrade(false)}>
                    Plus tard
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Passer à Premium</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

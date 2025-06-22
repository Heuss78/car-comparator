"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, TrendingUp, Zap, VoteIcon as Vs } from "lucide-react"

interface PopularComparisonsProps {
  onComparisonSelect: (cars: any[]) => void
}

const popularComparisons = [
  {
    id: "porsche-vs-ferrari",
    title: "Porsche 911 Turbo S vs Ferrari F8 Tributo",
    category: "Supercars Iconiques",
    description: "Le duel éternel entre l'efficacité allemande et la passion italienne",
    cars: [
      {
        id: "porsche-911-turbo-s",
        name: "Porsche 911 Turbo S",
        brand: "Porsche",
        price: 245000,
        power: "650ch",
        image: "/placeholder.svg?height=150&width=200",
      },
      {
        id: "ferrari-f8-tributo",
        name: "Ferrari F8 Tributo",
        brand: "Ferrari",
        price: 280000,
        power: "720ch",
        image: "/placeholder.svg?height=150&width=200",
      },
    ],
    popularity: 95,
    views: "12.5k vues",
  },
  {
    id: "lamborghini-vs-mclaren",
    title: "Lamborghini Huracán EVO vs McLaren 720S",
    category: "Performances Pures",
    description: "Deux philosophies différentes pour des performances exceptionnelles",
    cars: [
      {
        id: "lamborghini-huracan-evo",
        name: "Lamborghini Huracán EVO",
        brand: "Lamborghini",
        price: 265000,
        power: "640ch",
        image: "/placeholder.svg?height=150&width=200",
      },
      {
        id: "mclaren-720s",
        name: "McLaren 720S",
        brand: "McLaren",
        price: 320000,
        power: "720ch",
        image: "/placeholder.svg?height=150&width=200",
      },
    ],
    popularity: 88,
    views: "8.9k vues",
  },
  {
    id: "bmw-vs-mercedes",
    title: "BMW M8 Competition vs Mercedes-AMG GT 63 S",
    category: "GT Allemandes",
    description: "Le face-à-face des grand tourisme de luxe allemands",
    cars: [
      {
        id: "bmw-m8-competition",
        name: "BMW M8 Competition",
        brand: "BMW",
        price: 185000,
        power: "625ch",
        image: "/placeholder.svg?height=150&width=200",
      },
      {
        id: "mercedes-amg-gt-63s",
        name: "Mercedes-AMG GT 63 S",
        brand: "Mercedes-AMG",
        price: 195000,
        power: "630ch",
        image: "/placeholder.svg?height=150&width=200",
      },
    ],
    popularity: 82,
    views: "6.2k vues",
  },
  {
    id: "porsche-vs-lamborghini-suv",
    title: "Porsche Cayenne Turbo vs Lamborghini Urus",
    category: "SUV Sportifs",
    description: "Quand les sportives deviennent familiales sans perdre leur âme",
    cars: [
      {
        id: "porsche-cayenne-turbo",
        name: "Porsche Cayenne Turbo",
        brand: "Porsche",
        price: 145000,
        power: "550ch",
        image: "/placeholder.svg?height=150&width=200",
      },
      {
        id: "lamborghini-urus",
        name: "Lamborghini Urus",
        brand: "Lamborghini",
        price: 220000,
        power: "650ch",
        image: "/placeholder.svg?height=150&width=200",
      },
    ],
    popularity: 76,
    views: "4.8k vues",
  },
]

export default function PopularComparisons({ onComparisonSelect }: PopularComparisonsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Face-à-Face Populaires
        </h2>
        <p className="text-gray-600">Découvrez les comparaisons les plus consultées par notre communauté</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {popularComparisons.map((comparison) => (
          <Card
            key={comparison.id}
            className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-gray-100 hover:border-orange-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700">
                  <Flame className="w-3 h-3 mr-1" />
                  {comparison.category}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>{comparison.views}</span>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{comparison.title}</CardTitle>
              <CardDescription className="text-sm">{comparison.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Voitures face à face */}
              <div className="grid grid-cols-2 gap-4">
                {comparison.cars.map((car, index) => (
                  <div key={car.id} className="text-center">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-semibold text-sm mb-1">{car.brand}</h4>
                    <p className="text-xs text-gray-600 mb-1">{car.name.replace(car.brand + " ", "")}</p>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{car.price.toLocaleString()}€</span>
                      <span className="text-blue-600">{car.power}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* VS au centre */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Vs className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Popularité et bouton */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Popularité: {comparison.popularity}%</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => onComparisonSelect(comparison.cars)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Comparer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

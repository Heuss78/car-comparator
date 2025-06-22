"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Zap } from "lucide-react"

interface SearchFilters {
  brand: string
  model: string
  year: string
  fuelType: string
  category: string
  minPrice: string
  maxPrice: string
  minPower: string
  maxPower: string
}

interface CarSearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void
  onReset: () => void
}

const brands = [
  "Toutes marques",
  "Audi",
  "BMW",
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Mercedes-AMG",
  "Porsche",
  "Aston Martin",
  "Bugatti",
  "Koenigsegg",
  "Pagani",
  "Alpine",
  "Lotus",
]

const categories = ["Tous types", "Supercar", "Hypercar", "GT", "Cabriolet", "Coupé", "Berline sportive"]

const fuelTypes = ["Tous carburants", "Essence", "Hybride", "Électrique", "Hybride rechargeable"]

const years = Array.from({ length: 15 }, (_, i) => (2024 - i).toString())

export default function CarSearchFilters({ onFiltersChange, onReset }: CarSearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    brand: "",
    model: "",
    year: "",
    fuelType: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minPower: "",
    maxPower: "",
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      brand: "",
      model: "",
      year: "",
      fuelType: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minPower: "",
      maxPower: "",
    }
    setFilters(resetFilters)
    onReset()
  }

  const activeFiltersCount = Object.values(filters).filter((value) => value !== "").length

  return (
    <Card className="mb-8 border-2 border-orange-100 bg-gradient-to-r from-orange-50 via-red-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Recherche Intelligente
            </span>
            <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700">
              <Zap className="w-3 h-3 mr-1" />
              Technologie Avancée
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                {activeFiltersCount} filtre{activeFiltersCount > 1 ? "s" : ""}
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Filter className="w-4 h-4 mr-1" />
              {showAdvanced ? "Masquer" : "Filtres avancés"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recherche principale */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Marque</Label>
            <Select value={filters.brand} onValueChange={(value) => handleFilterChange("brand", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une marque" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand === "Toutes marques" ? "" : brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Modèle</Label>
            <Input
              id="model"
              placeholder="Ex: 911, F8, Huracan..."
              value={filters.model}
              onChange={(e) => handleFilterChange("model", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Année</Label>
            <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes années</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Type</Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type de voiture" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category === "Tous types" ? "" : category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtres avancés */}
        {showAdvanced && (
          <div className="border-t pt-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fuelType">Carburant</Label>
                <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de carburant" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel === "Tous carburants" ? "" : fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Prix (€)</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    type="number"
                  />
                  <Input
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Puissance (ch)</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Min"
                    value={filters.minPower}
                    onChange={(e) => handleFilterChange("minPower", e.target.value)}
                    type="number"
                  />
                  <Input
                    placeholder="Max"
                    value={filters.maxPower}
                    onChange={(e) => handleFilterChange("maxPower", e.target.value)}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={handleReset} className="flex items-center space-x-2">
            <X className="w-4 h-4" />
            <span>Réinitialiser</span>
          </Button>
          <div className="text-sm text-gray-600">
            Notre système analyse vos critères pour vous proposer les meilleures correspondances
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

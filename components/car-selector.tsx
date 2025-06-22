"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Car, Check } from "lucide-react"

interface CarSelectorProps {
  onCarSelected: (car: any) => void
  selectedCars: any[]
}

const carDatabase = {
  Porsche: {
    "911": {
      "Turbo S": {
        id: "porsche-911-turbo-s",
        price: 245000,
        power: "650ch",
        image: "/placeholder.svg?height=200&width=300",
      },
      "Carrera S": {
        id: "porsche-911-carrera-s",
        price: 135000,
        power: "450ch",
        image: "/placeholder.svg?height=200&width=300",
      },
      GT3: { id: "porsche-911-gt3", price: 185000, power: "510ch", image: "/placeholder.svg?height=200&width=300" },
    },
    Cayenne: {
      Turbo: {
        id: "porsche-cayenne-turbo",
        price: 145000,
        power: "550ch",
        image: "/placeholder.svg?height=200&width=300",
      },
      S: { id: "porsche-cayenne-s", price: 95000, power: "440ch", image: "/placeholder.svg?height=200&width=300" },
    },
  },
  Ferrari: {
    F8: {
      Tributo: {
        id: "ferrari-f8-tributo",
        price: 280000,
        power: "720ch",
        image: "/placeholder.svg?height=200&width=300",
      },
      Spider: {
        id: "ferrari-f8-spider",
        price: 295000,
        power: "720ch",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
    Roma: {
      Standard: { id: "ferrari-roma", price: 230000, power: "620ch", image: "/placeholder.svg?height=200&width=300" },
    },
  },
  Lamborghini: {
    Huracán: {
      EVO: {
        id: "lamborghini-huracan-evo",
        price: 265000,
        power: "640ch",
        image: "/placeholder.svg?height=200&width=300",
      },
      STO: {
        id: "lamborghini-huracan-sto",
        price: 295000,
        power: "640ch",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
    Urus: {
      Standard: {
        id: "lamborghini-urus",
        price: 220000,
        power: "650ch",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
  },
  McLaren: {
    "720S": {
      Standard: { id: "mclaren-720s", price: 320000, power: "720ch", image: "/placeholder.svg?height=200&width=300" },
      Spider: {
        id: "mclaren-720s-spider",
        price: 335000,
        power: "720ch",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
  },
  BMW: {
    M3: {
      Competition: {
        id: "bmw-m3-competition",
        price: 85000,
        power: "510ch",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
    M8: {
      Competition: {
        id: "bmw-m8-competition",
        price: 185000,
        power: "625ch",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
  },
  "Mercedes-AMG": {
    GT: {
      "63 S": {
        id: "mercedes-amg-gt-63s",
        price: 195000,
        power: "630ch",
        image: "/placeholder.svg?height=200&width=300",
      },
    },
    C63: {
      S: { id: "mercedes-amg-c63s", price: 95000, power: "510ch", image: "/placeholder.svg?height=200&width=300" },
    },
  },
}

export default function CarSelector({ onCarSelected, selectedCars }: CarSelectorProps) {
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedVersion, setSelectedVersion] = useState("")

  const brands = Object.keys(carDatabase)
  const models = selectedBrand ? Object.keys(carDatabase[selectedBrand as keyof typeof carDatabase]) : []
  const versions =
    selectedBrand && selectedModel
      ? Object.keys(
          carDatabase[selectedBrand as keyof typeof carDatabase][
            selectedModel as keyof (typeof carDatabase)[keyof typeof carDatabase]
          ],
        )
      : []

  const handleAddCar = () => {
    if (selectedBrand && selectedModel && selectedVersion) {
      const carData =
        carDatabase[selectedBrand as keyof typeof carDatabase][
          selectedModel as keyof (typeof carDatabase)[keyof typeof carDatabase]
        ][
          selectedVersion as keyof (typeof carDatabase)[keyof typeof carDatabase][keyof (typeof carDatabase)[keyof typeof carDatabase]]
        ]
      const fullCar = {
        ...carData,
        name: `${selectedBrand} ${selectedModel} ${selectedVersion}`,
        brand: selectedBrand,
        model: selectedModel,
        version: selectedVersion,
      }
      onCarSelected(fullCar)
      // Reset selection
      setSelectedBrand("")
      setSelectedModel("")
      setSelectedVersion("")
    }
  }

  const isCarSelected = (brand: string, model: string, version: string) => {
    return selectedCars.some((car) => car.brand === brand && car.model === model && car.version === version)
  }

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Car className="w-6 h-6 text-blue-600" />
          <span>Sélectionnez vos voitures à comparer</span>
        </CardTitle>
        <CardDescription>
          Choisissez jusqu'à 3 voitures en sélectionnant la marque, le modèle et la version
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection progressive */}
        <div className="grid md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">1. Marque</label>
            <Select
              value={selectedBrand}
              onValueChange={(value) => {
                setSelectedBrand(value)
                setSelectedModel("")
                setSelectedVersion("")
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une marque" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">2. Modèle</label>
            <Select
              value={selectedModel}
              onValueChange={(value) => {
                setSelectedModel(value)
                setSelectedVersion("")
              }}
              disabled={!selectedBrand}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un modèle" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">3. Version</label>
            <Select value={selectedVersion} onValueChange={setSelectedVersion} disabled={!selectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une version" />
              </SelectTrigger>
              <SelectContent>
                {versions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleAddCar}
            disabled={
              !selectedBrand ||
              !selectedModel ||
              !selectedVersion ||
              selectedCars.length >= 3 ||
              isCarSelected(selectedBrand, selectedModel, selectedVersion)
            }
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {isCarSelected(selectedBrand, selectedModel, selectedVersion) ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Déjà ajoutée
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                Ajouter
              </>
            )}
          </Button>
        </div>

        {/* Voitures sélectionnées */}
        {selectedCars.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Voitures sélectionnées ({selectedCars.length}/3)</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {selectedCars.map((car, index) => (
                <div key={car.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-12 h-8 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{car.name}</p>
                    <p className="text-xs text-gray-500">{car.price.toLocaleString()}€</p>
                  </div>
                  <Badge variant="secondary">{index + 1}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

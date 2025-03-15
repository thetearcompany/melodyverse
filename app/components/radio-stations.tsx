import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRadioStore } from "@/store/use-radio-store"
import { RadioStation } from "@/types/radio"
import { Play, Pause } from "lucide-react"

const getRadioStations = (): RadioStation[] => {
  const currentHour = new Date().getHours()
  const isAmapiano = currentHour >= 20 || currentHour < 6 // Amapiano plays at night
  
  return [
    {
      id: "adonai",
      name: "Adonai Radio",
      genre: "reggae" as const,
      description: "Roots, culture and spiritual vibrations",
      streamUrl: "/stream/adonai",
      current: !isAmapiano
    },
    {
      id: "amapiano-fm",
      name: "Amapiano FM",
      genre: "amapiano" as const,
      description: "Best of South African house music",
      streamUrl: "/stream/amapiano",
      current: isAmapiano
    },
    {
      id: "rastafari-radio",
      name: "Rastafari Radio",
      genre: "reggae" as const,
      description: "24/7 Roots Reggae & Dub",
      streamUrl: "https://stream.zeno.fm/zksqgm03pm8uv",
      current: false
    },
    {
      id: "house-africa",
      name: "House Afrika",
      genre: "amapiano" as const,
      description: "Deep house & amapiano beats",
      streamUrl: "https://stream.zeno.fm/u5f6vxm5wp8uv",
      current: false
    },
    {
      id: "gospel-jams",
      name: "Gospel Jams",
      genre: "gospel" as const,
      description: "Uplifting gospel reggae",
      streamUrl: "https://stream.zeno.fm/qr2vzbm6pm8uv",
      current: false
    },
    {
      id: "dub-massive",
      name: "Dub Massive",
      genre: "dub" as const,
      description: "Heavy dub plates & remixes",
      streamUrl: "https://stream.zeno.fm/n8r9z9m7pm8uv",
      current: false
    },
    {
      id: "kabza-small",
      name: "Kabza Small Radio",
      genre: "amapiano" as const,
      description: "King of Amapiano selection",
      streamUrl: "https://stream.zeno.fm/b5r2vym8pm8uv",
      current: false
    },
    {
      id: "nyahbinghi",
      name: "Nyahbinghi Radio",
      genre: "reggae" as const,
      description: "Traditional Rastafari rhythms",
      streamUrl: "https://stream.zeno.fm/m7r2v5m9pm8uv",
      current: false
    }
  ]
}

export function RadioStations() {
  const [stations, setStations] = useState<RadioStation[]>(getRadioStations())
  const { currentStation, isPlaying, playStation, pauseStation, initAudio } = useRadioStore()

  useEffect(() => {
    initAudio()
    // Update stations every minute
    const interval = setInterval(() => {
      setStations(getRadioStations())
    }, 60000)

    return () => clearInterval(interval)
  }, [initAudio])

  const handleStationClick = (station: RadioStation) => {
    if (currentStation?.id === station.id && isPlaying) {
      pauseStation()
    } else {
      playStation(station)
    }
  }

  return (
    <div className="space-y-2">
      {stations.map((station) => (
        <div
          key={station.id}
          onClick={() => handleStationClick(station)}
          className={`p-3 rounded-lg ${
            station.current
              ? "bg-gradient-to-r from-[#006400]/20 to-[#FFD700]/20"
              : "hover:bg-muted/50"
          } transition-colors cursor-pointer`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm">{station.name}</h3>
              <p className="text-xs text-muted-foreground">{station.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                station.genre === 'reggae' ? 'bg-[#006400]/20 text-[#006400]' :
                station.genre === 'amapiano' ? 'bg-[#FFD700]/20 text-[#FFD700]' :
                station.genre === 'gospel' ? 'bg-[#8B0000]/20 text-[#8B0000]' :
                'bg-[#4B0082]/20 text-[#4B0082]'
              }`}>
                {station.genre}
              </span>
              {currentStation?.id === station.id && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStationClick(station)
                  }}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              )}
              {station.current && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 
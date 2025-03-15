import { useEffect } from 'react'
import { useRadioStore } from '@/store/use-radio-store'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export function RadioPlayer() {
  const { currentStation, isPlaying, volume, playStation, pauseStation, setVolume } = useRadioStore()

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100)
  }

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          {currentStation ? (
            <>
              <h3 className="font-medium">{currentStation.name}</h3>
              <p className="text-sm text-muted-foreground">{currentStation.description}</p>
            </>
          ) : (
            <p className="text-muted-foreground">Select a station to start listening</p>
          )}
        </div>
        {currentStation && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => isPlaying ? pauseStation() : playStation(currentStation)}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
        >
          {volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          className="w-[120px]"
          onValueChange={handleVolumeChange}
        />
      </div>
    </div>
  )
} 
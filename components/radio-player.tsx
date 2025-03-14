"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Radio, Heart, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [listeners, setListeners] = useState(427)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentTrack, setCurrentTrack] = useState({
    title: "Redemption Song",
    artist: "Bob Marley & The Wailers",
    startTime: new Date().getTime(),
  })

  // Simulate audio visualization
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Simulate changing tracks periodically
  useEffect(() => {
    const tracks = [
      { title: "Redemption Song", artist: "Bob Marley & The Wailers" },
      { title: "Rivers of Babylon", artist: "Boney M" },
      { title: "By the Rivers of Babylon", artist: "The Melodians" },
      { title: "Jah Live", artist: "Bob Marley" },
      { title: "Rastaman Chant", artist: "Bob Marley & The Wailers" },
      { title: "Zion Train", artist: "Bob Marley & The Wailers" },
      { title: "Jah Is My Light", artist: "Jacob Miller" },
      { title: "Holy Mount Zion", artist: "Burning Spear" },
    ]

    const interval = setInterval(() => {
      if (isPlaying) {
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
        setCurrentTrack({
          ...randomTrack,
          startTime: new Date().getTime(),
        })

        // Simulate fluctuating listener count
        setListeners(Math.floor(400 + Math.random() * 100))
      }
    }, 30000) // Change track every 30 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  // Audio visualization effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const drawVisualization = () => {
      ctx.clearRect(0, 0, width, height)

      if (!isPlaying) {
        // Draw flat line when not playing
        ctx.beginPath()
        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.strokeStyle = "#666"
        ctx.lineWidth = 2
        ctx.stroke()
        return
      }

      // Draw waveform visualization
      ctx.beginPath()

      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, "#FFD700")
      gradient.addColorStop(0.5, "#DC143C")
      gradient.addColorStop(1, "#006400")

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2

      const segments = 100
      const segmentWidth = width / segments

      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth

        // Create a semi-random but smooth waveform
        const time = Date.now() / 1000
        const amplitude = isPlaying ? 30 : 5
        const frequency = 0.1
        const noise = Math.sin(i * frequency + time) * amplitude

        const y = height / 2 + noise

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
      animationRef.current = requestAnimationFrame(drawVisualization)
    }

    drawVisualization()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  // Calculate elapsed time
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        const now = new Date().getTime()
        const diff = Math.floor((now - currentTrack.startTime) / 1000)
        setElapsed(diff)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, currentTrack])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // Reset elapsed time when starting to play
      setCurrentTrack({
        ...currentTrack,
        startTime: new Date().getTime(),
      })
      setElapsed(0)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-[#006400] to-[#DC143C] p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Radio className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold">Adonai Radio</h2>
            <Badge className="ml-3 bg-[#FFD700] text-black">LIVE</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Radio className="h-4 w-4 mr-1" />
            <span>{listeners} listeners</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{currentTrack.title}</h3>
            <p className="text-sm text-white/80">{currentTrack.artist}</p>
            <div className="mt-2 text-xs text-white/60">
              {isPlaying ? `Elapsed: ${formatTime(elapsed)}` : "Ready to play"}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn("h-5 w-5", isFavorite ? "fill-[#DC143C]" : "")} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 h-[60px]">
          <canvas ref={canvasRef} width={800} height={60} className="w-full h-full" />
        </div>
      </div>

      <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Button
          size="lg"
          className={cn(
            "rounded-full w-full md:w-auto",
            isPlaying ? "bg-[#DC143C] hover:bg-[#DC143C]/90" : "bg-[#FFD700] text-black hover:bg-[#FFD700]/90",
          )}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Stop Radio
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Play Radio
            </>
          )}
        </Button>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            className="w-full md:w-[200px]"
            onValueChange={(value) => {
              setVolume(value[0])
              if (value[0] > 0) setIsMuted(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}


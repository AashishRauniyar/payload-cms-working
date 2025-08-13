import {
  AboutHero,
  AboutMission,
  AboutValues,
  AboutStats,
  AboutTeam,
  AboutTimeline,
  AboutTestimonials,
  AboutContact,
} from '@/components/about'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutStats />
      <AboutTeam />
      <AboutTimeline />
      <AboutTestimonials />
      <AboutContact />
    </div>
  )
}

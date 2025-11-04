import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media, User } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 600

// Social Media Icon Component
const SocialIcon = ({
  platform,
  url,
  logo,
}: {
  platform: string
  url?: string | null
  logo?: Media | null
}) => {
  if (!url) return null

  const platformColors = {
    linkedin: {
      bg: 'bg-[#0077b5]',
      hover: 'hover:bg-[#005885]',
      text: 'text-white',
    },
    twitter: {
      bg: 'bg-[#1da1f2]',
      hover: 'hover:bg-[#0d8bd9]',
      text: 'text-white',
    },
    facebook: {
      bg: 'bg-[#1877f2]',
      hover: 'hover:bg-[#166fe5]',
      text: 'text-white',
    },
    instagram: {
      bg: 'bg-gradient-to-br from-purple-600 to-pink-500',
      hover: 'hover:from-purple-700 hover:to-pink-600',
      text: 'text-white',
    },
    youtube: {
      bg: 'bg-[#ff0000]',
      hover: 'hover:bg-[#cc0000]',
      text: 'text-white',
    },
    website: {
      bg: 'bg-gray-600',
      hover: 'hover:bg-gray-700',
      text: 'text-white',
    },
  }

  const icons = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
          clipRule="evenodd"
        />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M2.166 4.999A11.854 11.854 0 001 10.049 11.854 11.854 0 002.166 15.1c.205.358.478.649.804.82.33.174.684.26 1.042.26h11.976c.358 0 .712-.086 1.042-.26.326-.171.599-.462.804-.82a11.853 11.853 0 001.166-5.051 11.854 11.854 0 00-1.166-5.05 2.007 2.007 0 00-.804-.821A2.007 2.007 0 0015.988 4H4.012c-.358 0-.712.086-1.042.26a2.007 2.007 0 00-.804.82zm6.58 3.856l-.007-.004A1 1 0 007.618 8v4a1 1 0 001.533.846l.007-.004 4-2.5a1 1 0 000-1.692l-4-2.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
    website: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  const colors = platformColors[platform as keyof typeof platformColors] || platformColors.website
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-3 py-2 ${colors.bg} ${colors.hover} ${colors.text} rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105`}
      title={`${platformName} profile`}
    >
      {logo?.url ? (
        <Image
          src={logo.url}
          alt={`${platform} logo`}
          width={20}
          height={20}
          className="w-5 h-5 rounded"
        />
      ) : (
        <div className="w-5 h-5">{icons[platform as keyof typeof icons] || icons.website}</div>
      )}
      <span className="text-sm font-medium">{platformName}</span>
    </a>
  )
}

async function getAuthors() {
  const payload = await getPayload({ config: configPromise })
  const users = await payload.find({ collection: 'users', limit: 100, pagination: false })
  return users.docs as User[]
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Authors</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the experts behind our reviews and health guidance.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => {
            const avatar = author.avatar as Media | null
            const linkedinLogo = author.socialMedia?.linkedin?.logo as Media | null
            const twitterLogo = author.socialMedia?.twitter?.logo as Media | null
            const facebookLogo = author.socialMedia?.facebook?.logo as Media | null
            const instagramLogo = author.socialMedia?.instagram?.logo as Media | null
            const youtubeLogo = author.socialMedia?.youtube?.logo as Media | null
            const websiteLogo = author.socialMedia?.website?.logo as Media | null

            return (
              <div
                key={author.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Profile Section */}
                <div className="p-8 text-center">
                  {/* Avatar */}
                  <div className="relative mb-6 inline-block">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-white shadow-lg">
                      {avatar?.url ? (
                        <Image
                          src={avatar.url}
                          alt={avatar.alt || author.name || 'Author'}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          👤
                        </div>
                      )}
                    </div>
                    {/* Verification Badge - Positioned on top-right of the avatar circle */}
                    <div className="absolute top-0 right-0 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {author.name || 'Unnamed Author'}
                  </h3>
                  {author.title && (
                    <div className="inline-block mb-4">
                      <p className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium text-sm rounded-full">
                        {author.title}
                      </p>
                    </div>
                  )}

                  {/* Experience & Stats */}
                  <div className="flex justify-center gap-4 mb-6">
                    {author.experience && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{author.experience}+</div>
                        <div className="text-xs text-gray-500">Years</div>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">Health</div>
                      <div className="text-xs text-gray-500">Specialty</div>
                    </div>
                  </div>

                  {/* Bio Preview */}
                  {author.bio && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                      {author.bio.length > 120 ? `${author.bio.substring(0, 120)}...` : author.bio}
                    </p>
                  )}

                  {/* Social Media Links */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <SocialIcon
                      platform="linkedin"
                      url={author.socialMedia?.linkedin?.url}
                      logo={linkedinLogo}
                    />
                    <SocialIcon
                      platform="twitter"
                      url={author.socialMedia?.twitter?.url}
                      logo={twitterLogo}
                    />
                    <SocialIcon
                      platform="facebook"
                      url={author.socialMedia?.facebook?.url}
                      logo={facebookLogo}
                    />
                    <SocialIcon
                      platform="instagram"
                      url={author.socialMedia?.instagram?.url}
                      logo={instagramLogo}
                    />
                    <SocialIcon
                      platform="youtube"
                      url={author.socialMedia?.youtube?.url}
                      logo={youtubeLogo}
                    />
                    <SocialIcon
                      platform="website"
                      url={author.socialMedia?.website?.url}
                      logo={websiteLogo}
                    />
                  </div>

                  {/* View Profile Button */}
                  <Link
                    href={`/authors/${author.id}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    View Profile
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {authors.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl text-gray-300 mb-4">👥</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No authors yet</h2>
            <p className="text-gray-500">Authors will appear here once content is added!</p>
          </div>
        )}
      </div>
    </div>
  )
}

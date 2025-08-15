import type { CollectionAfterReadHook } from 'payload'
import { User } from 'src/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorDocs: User[] = []

    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 1, // Reduced depth to avoid deep serialization issues
        })

        if (authorDoc) {
          authorDocs.push(authorDoc)
        }
      } catch {
        // swallow error
      }
    }

    // Create clean serializable author objects
    if (authorDocs.length > 0) {
      const serializedAuthors = []

      for (const authorDoc of authorDocs) {
        try {
          // Get avatar data if it exists
          let avatarData = null
          if (authorDoc.avatar) {
            if (typeof authorDoc.avatar === 'object') {
              avatarData = {
                id: authorDoc.avatar.id,
                url: authorDoc.avatar.url || null,
                alt: authorDoc.avatar.alt || null,
                width: authorDoc.avatar.width || null,
                height: authorDoc.avatar.height || null,
              }
            } else {
              // If avatar is just an ID, fetch the media
              try {
                const media = await payload.findByID({
                  collection: 'media',
                  id: authorDoc.avatar,
                  depth: 0,
                })

                if (media) {
                  avatarData = {
                    id: media.id,
                    url: media.url || null,
                    alt: media.alt || null,
                    width: media.width || null,
                    height: media.height || null,
                  }
                }
              } catch {
                // Avatar fetch failed, use null
              }
            }
          }

          // Create clean author object
          serializedAuthors.push({
            id: authorDoc.id,
            name: authorDoc.name || null,
            avatar: avatarData,
            title: authorDoc.title || null,
            bio: authorDoc.bio || null,
          })
        } catch (error) {
          console.error('Error serializing author:', error)
        }
      }

      doc.populatedAuthors = serializedAuthors
    }
  }

  return doc
}

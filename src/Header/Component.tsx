import { HeaderClient } from './Component.client'
import { NavbarWrapper } from '@/components/Navbar/NavbarWrapper'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <NavbarWrapper />
}

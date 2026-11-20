import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from '@carbon/react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/cuga', label: 'CUGA Page Studio' },
  { to: '/hive', label: 'Hive Agent Fleet' },
  { to: '/contact', label: 'Contact' },
] as const

function Layout() {
  const [isSideNavExpanded, setSideNavExpanded] = useState(false)
  const closeSideNav = () => setSideNavExpanded(false)

  return (
    <>
      <Header aria-label="Beehive">
        <SkipToContent />
        <HeaderMenuButton
          aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
          isActive={isSideNavExpanded}
          onClick={() => setSideNavExpanded((expanded) => !expanded)}
          isCollapsible
        />
        <HeaderName as={Link} to="/" prefix="">
          Beehive
        </HeaderName>
        <HeaderNavigation aria-label="Main">
          {NAV_ITEMS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className="cds--header__menu-item"
                role="menuitem"
              >
                <span className="cds--text-truncate--end">{label}</span>
              </NavLink>
            </li>
          ))}
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
          onOverlayClick={closeSideNav}
          onSideNavBlur={closeSideNav}
        >
          <SideNavItems>
            {NAV_ITEMS.map(({ to, label }) => (
              <SideNavLink
                key={to}
                as={NavLink}
                to={to}
                end
                onClick={closeSideNav}
              >
                {label}
              </SideNavLink>
            ))}
          </SideNavItems>
        </SideNav>
      </Header>
      <Content id="main-content">
        <Outlet />
      </Content>
    </>
  )
}

export default Layout

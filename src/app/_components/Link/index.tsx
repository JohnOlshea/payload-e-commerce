import React from 'react'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { Button, Props as ButtonProps } from '../Button'

// Define the icon type
type IconType = {
  url: string;
}

type CMSLinkType = {
  type?: 'custom' | 'reference'
  url?: string
  newTab?: boolean
  reference?: {
    value: string | Page
    relationTo: 'pages'
  }
  label?: string
  appearance?: ButtonProps['appearance']
  children?: React.ReactNode
  className?: string
  invert?: ButtonProps['invert']
  icon?: IconType // Add icon prop
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  className,
  invert,
  icon // Destructure icon prop
}) => {
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug
      }`
      : url

  if (!href) return null

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  // Create content with icon if available
  const content = (
    <>
      {icon && <img src={icon.url} alt="" className="icon" />} {/* Render icon if it exists */}
    </>
  );

  if (!appearance) {
    return (
      <Link {...newTabProps} href={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <Button
      className={className}
      newTab={newTab}
      href={href}
      appearance={appearance}
      label={label}
      invert={invert}
    >
      {content}
    </Button>
  )
}

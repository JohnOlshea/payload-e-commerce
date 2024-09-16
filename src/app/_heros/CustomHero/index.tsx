"use client"

import React, { Fragment, useEffect } from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const CustomHero: React.FC<Page['hero']> = (props) => {

  const { richText, media, links } = props;

  useEffect(() => {
    console.log('prppppppin', props);
    console.log('ricch gannnng', richText, media, links);
  }, [props, richText, media, links]);

  const mediaUrl =
    media &&
    typeof media !== 'string' &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${media.filename}`

  return (
    <section className={classes.hero}>
      <div className={classes.heroWrapper} style={{ backgroundImage: `url(${mediaUrl})` }}>
        <div className={classes.heroTextBox}>
          <RichText content={richText} />

          {Array.isArray(links) && links.length > 0 && (
            <div className={classes.linksWrapper}>
              <div className={classes.linksContainer}>
                <h6 className={classes.linkText}>Start Shopping</h6>
                <ul className={classes.links}>
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

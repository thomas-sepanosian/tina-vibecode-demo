'use client';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { TextEffect } from '../motion-primitives/text-effect';
import { Button } from '../ui/button';
import { iconSchema } from '@/tina/fields/icon';
import { Transition } from 'motion/react';
import confetti from 'canvas-confetti';

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

const LlamaCard = ({ src, alt }: { src: string; alt: string }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const hasFiredRef = React.useRef(false);

  const handleMouseEnter = () => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x, y },
        startVelocity: 25,
        gravity: 0.8,
        ticks: 60,
        colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b'],
      });
    }
  };

  const handleMouseLeave = () => {
    hasFiredRef.current = false;
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-[220px] cursor-pointer select-none overflow-hidden rounded-2xl border border-zinc-200 shadow-sm shadow-zinc-950/10 bg-white"
      style={{
        aspectRatio: '2 / 3',
        transition: 'transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08) rotate(3deg)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1) rotate(0deg)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-2xl pointer-events-none"
        sizes="220px"
      />
    </div>
  );
};

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section background={data.background!}>
      <div className='text-center sm:mx-auto lg:mr-auto lg:mt-0'>
        {data.headline && (
          <div data-tina-field={tinaField(data, 'headline')}>
            <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h1' className='mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem]'>
              {data.headline!}
            </TextEffect>
          </div>
        )}
        {data.tagline && (
          <div data-tina-field={tinaField(data, 'tagline')}>
            <TextEffect per='line' preset='fade-in-blur' speedSegment={0.3} delay={0.5} as='p' className='mx-auto mt-8 max-w-2xl text-balance text-lg'>
              {data.tagline!}
            </TextEffect>
          </div>
        )}

        <AnimatedGroup variants={transitionVariants} className='mt-12 flex flex-col items-center justify-center gap-2 md:flex-row'>
          {data.actions &&
            data.actions.map((action) => (
              <div key={action!.label} data-tina-field={tinaField(action)} className='bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5'>
                <Button asChild size='lg' variant={action!.type === 'link' ? 'ghost' : 'default'} className='rounded-xl px-5 text-base'>
                  <Link href={action!.link!}>
                    {action?.icon && <Icon data={action?.icon} />}
                    <span className='text-nowrap'>{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </AnimatedGroup>
      </div>

      {data.image?.src && (
        <AnimatedGroup variants={transitionVariants}>
          <div className='mt-12 flex justify-center' data-tina-field={tinaField(data, 'image')}>
            <LlamaCard src={data.image.src} alt={data.image.alt || 'Llama'} />
          </div>
        </AnimatedGroup>
      )}
    </Section>
  );
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: {
              name: "Tina",
              color: "white",
              style: "float",
          },
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
      ],
    },
  ],
};

'use client';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksTerminal } from '../../tina/__generated__/types';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { TerminalThemePicker } from '../../tina/fields/terminal-theme';

const themes: Record<string, { bg: string; titleBar: string; text: string; dot1: string; dot2: string; dot3: string }> = {
  matrix: {
    bg: '#0d1117',
    titleBar: '#161b22',
    text: '#00ff41',
    dot1: '#ff5f56',
    dot2: '#ffbd2e',
    dot3: '#27c93f',
  },
  dracula: {
    bg: '#282a36',
    titleBar: '#21222c',
    text: '#f8f8f2',
    dot1: '#ff5555',
    dot2: '#f1fa8c',
    dot3: '#50fa7b',
  },
  gruvbox: {
    bg: '#282828',
    titleBar: '#1d2021',
    text: '#ebdbb2',
    dot1: '#cc241d',
    dot2: '#d79921',
    dot3: '#98971a',
  },
  solarized: {
    bg: '#fdf6e3',
    titleBar: '#eee8d5',
    text: '#657b83',
    dot1: '#dc322f',
    dot2: '#b58900',
    dot3: '#859900',
  },
};

const defaultTheme = themes.matrix;

export const Terminal = ({ data }: { data: PageBlocksTerminal }) => {
  const theme = themes[data.theme || 'matrix'] || defaultTheme;

  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-2xl">
        {/* Window frame */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: theme.titleBar,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: theme.dot1, display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: theme.dot2, display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: theme.dot3, display: 'inline-block' }} />
            {data.title && (
              <span
                data-tina-field={tinaField(data, 'title')}
                style={{
                  color: theme.text,
                  opacity: 0.6,
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  marginLeft: '8px',
                }}
              >
                {data.title}
              </span>
            )}
          </div>

          {/* Console */}
          <div
            style={{
              background: theme.bg,
              padding: '20px',
              minHeight: '120px',
            }}
          >
            <pre
              data-tina-field={tinaField(data, 'content')}
              style={{
                color: theme.text,
                fontFamily: '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace',
                fontSize: '14px',
                lineHeight: 1.7,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {data.content}
            </pre>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const terminalBlockSchema: Template = {
  name: 'terminal',
  label: 'Terminal',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      title: 'terminal',
      content: '$ echo "Hello, world!"',
      theme: 'matrix',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Content',
      name: 'content',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      label: 'Theme',
      name: 'theme',
      ui: {
        component: TerminalThemePicker,
      },
    },
  ],
};

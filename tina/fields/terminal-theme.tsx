import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

const themes = {
  matrix: {
    label: 'Matrix',
    bg: '#0d1117',
    titleBar: '#161b22',
    text: '#00ff41',
    dot1: '#ff5f56',
    dot2: '#ffbd2e',
    dot3: '#27c93f',
  },
  dracula: {
    label: 'Dracula',
    bg: '#282a36',
    titleBar: '#21222c',
    text: '#f8f8f2',
    dot1: '#ff5555',
    dot2: '#f1fa8c',
    dot3: '#50fa7b',
  },
  gruvbox: {
    label: 'Gruvbox',
    bg: '#282828',
    titleBar: '#1d2021',
    text: '#ebdbb2',
    dot1: '#cc241d',
    dot2: '#d79921',
    dot3: '#98971a',
  },
  solarized: {
    label: 'Solarized Light',
    bg: '#fdf6e3',
    titleBar: '#eee8d5',
    text: '#657b83',
    dot1: '#dc322f',
    dot2: '#b58900',
    dot3: '#859900',
  },
};

export const TerminalThemePicker = wrapFieldsWithMeta(({ input }) => {
  return (
    <>
      <input type="text" id={input.name} className="hidden" {...input} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {Object.entries(themes).map(([key, theme]) => {
          const isSelected = input.value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => input.onChange(key)}
              style={{
                border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                padding: 0,
                outline: isSelected ? '2px solid #93c5fd' : 'none',
                outlineOffset: '1px',
              }}
            >
              {/* Mini terminal preview */}
              <div style={{ background: theme.bg, width: '100%' }}>
                {/* Mini title bar */}
                <div
                  style={{
                    background: theme.titleBar,
                    padding: '4px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.dot1, display: 'inline-block' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.dot2, display: 'inline-block' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.dot3, display: 'inline-block' }} />
                </div>
                {/* Mini console */}
                <div style={{ padding: '6px 8px', minHeight: '32px' }}>
                  <div
                    style={{
                      color: theme.text,
                      fontSize: '7px',
                      fontFamily: 'monospace',
                      textAlign: 'left',
                      lineHeight: 1.4,
                    }}
                  >
                    <div>$ hello world</div>
                    <div style={{ opacity: 0.6 }}>→ ready</div>
                  </div>
                </div>
                {/* Label */}
                <div
                  style={{
                    color: theme.text,
                    fontSize: '9px',
                    padding: '2px 0 5px',
                    textAlign: 'center',
                    fontWeight: 600,
                    opacity: 0.8,
                  }}
                >
                  {theme.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
});

export const terminalThemes = themes;

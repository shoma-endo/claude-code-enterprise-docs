'use client';

import { useState } from 'react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TocSidebar } from '@/components/TocSidebar';
import type { TocEntry, TrainingSections } from '@/lib/markdown';

type TabId = 'overview' | 'session1' | 'session2' | 'session3';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: '概要 & 事前準備' },
  { id: 'session1', label: 'Session 1' },
  { id: 'session2', label: 'Session 2' },
  { id: 'session3', label: 'Session 3' },
];

interface Props extends TrainingSections {
  tocByTab: Record<TabId, TocEntry[]>;
}

export function TrainingPage({ intro, prep, session1, session2, session3, tocByTab }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  function switchTab(tab: TabId) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const sessionContent: Record<'session1' | 'session2' | 'session3', string> = {
    session1,
    session2,
    session3,
  };

  return (
    <div className="mx-auto w-full max-w-[1560px] px-4 py-8 md:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1024px)_18rem] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1120px)_20rem]">
      <div className="hidden xl:block" aria-hidden="true" />

      <article className="mx-auto min-w-0 max-w-5xl xl:mx-0 xl:max-w-none">
        <nav
          className="mb-8 flex gap-0 border-b border-slate-200"
          role="tablist"
          aria-label="研修セッション"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => switchTab(tab.id)}
                className={`-mb-px border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === 'overview' ? (
          <>
            <MarkdownRenderer content={intro} />
            <div
              className="mb-6 rounded-r-lg border border-amber-200/90 border-l-4 border-l-amber-400 bg-amber-50 px-5 py-6 shadow-sm ring-1 ring-amber-100/80 md:px-8 md:py-8 [&>h2:first-of-type]:mt-2"
              aria-label="事前準備"
            >
              <MarkdownRenderer content={prep} />
            </div>
          </>
        ) : (
          <MarkdownRenderer content={sessionContent[activeTab as 'session1' | 'session2' | 'session3']} />
        )}
      </article>

      <aside className="hidden xl:block min-w-0">
        {/* key forces TocSidebar to remount on tab change, resetting scroll position and active heading */}
        <TocSidebar key={activeTab} entries={tocByTab[activeTab]} />
      </aside>
    </div>
  );
}

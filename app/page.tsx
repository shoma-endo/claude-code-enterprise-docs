import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude Code Docs',
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-3 text-gray-900">Claude Code Docs</h1>
      <p className="text-gray-500 mb-12">
        Claude Code に関するドキュメント・研修資料を集約したリポジトリです。
      </p>

      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b border-gray-200 pb-2">
          研修資料
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/training"
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Claude Code 法人向けハンズオン研修（全 15 時間）
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Session 1〜3 の完全版カリキュラム。起動・ファイル操作・CLAUDE.md・業務秘書エージェントから定着計画まで。
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}

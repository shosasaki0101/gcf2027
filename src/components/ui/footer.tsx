import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 border-t border-slate-700 relative z-10">
      <div className="mx-auto">
        <div className="space-y-8 pb-8">
          {/* コピーライト */}
          <div className="text-center">
            <p className="text-lg font-semibold text-blue-200 mb-2">
              © 2026 Global Commons Forum
            </p>
            <p className="text-sm text-gray-400">
              All rights reserved.
            </p>
          </div>

          {/* お問い合わせ */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-200 mb-3">
              お問い合わせ
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                Global Commons Forum事務局
              </p>
              <a 
                href="mailto:info@globalcommonsforum.org"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
              >
                cgc.forum.adm@ifi.u-tokyo.ac.jp
              </a>
            </div>
          </div>
        </div>

        {/* 下部: 追加情報 */}
        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-xs text-gray-500">
            地球の共有資源について考える国際フォーラム | 
            プラネタリー・バウンダリーから持続可能な未来へ
          </p>
        </div>
      </div>
    </footer>
  );
};

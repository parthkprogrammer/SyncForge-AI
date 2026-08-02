import { useState } from 'react';
import { Card } from '../../../components/ui/Card/Card';
import { Button } from '../../../components/ui/Button';
import { Link, Link2Off, Link2 } from 'lucide-react';
import type { ConnectedAccount } from '../types/profile.types';

interface ConnectedAccountsProps {
  accounts: ConnectedAccount[];
  onConnect: (provider: string, username: string) => void;
  onDisconnect: (provider: string) => void;
}

export function ConnectedAccounts({
  accounts,
  onConnect,
  onDisconnect,
}: ConnectedAccountsProps) {
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);
  const [inputUsername, setInputUsername] = useState('');

  const handleConnectClick = (provider: string) => {
    setConnectingProvider(provider);
    setInputUsername('');
  };

  const handleConfirmConnect = (provider: string) => {
    if (inputUsername.trim()) {
      onConnect(provider, inputUsername.trim());
      setConnectingProvider(null);
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm flex flex-col h-full">
      <Card.Header className="border-none pb-0 mb-4">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-350 tracking-tight uppercase">
          Connected Accounts
        </h3>
        <span className="text-[10px] text-slate-400">OAuth connections catalogs for third party API hooks</span>
      </Card.Header>

      <Card.Content className="space-y-4 flex-1 select-none">
        {accounts.map((acc) => {
          const isConnecting = connectingProvider === acc.provider;
          
          return (
            <div
              key={acc.provider}
              className="flex flex-col gap-2 p-3 border border-slate-100 dark:border-slate-850 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${
                    acc.isConnected
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'bg-slate-50 dark:bg-slate-850 text-slate-400'
                  }`}>
                    {acc.isConnected ? <Link className="h-4 w-4" /> : <Link2Off className="h-4 w-4" />}
                  </div>

                  <div>
                    <span className="text-xs font-extrabold text-slate-850 dark:text-white block">
                      {acc.provider}
                    </span>
                    {acc.isConnected ? (
                      <span className="text-[9px] text-slate-400 dark:text-slate-550 block mt-0.5">
                        Linked as <strong className="text-slate-550 dark:text-slate-450">@{acc.username}</strong>
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-400 dark:text-slate-550 block mt-0.5">
                        Not linked
                      </span>
                    )}
                  </div>
                </div>

                {/* Account Actions */}
                <div className="flex items-center gap-2">
                  {acc.isConnected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDisconnect(acc.provider)}
                      className="text-error-500 hover:bg-error-50 dark:hover:bg-error-950/15 border-slate-200 dark:border-slate-850 h-7.5 px-3 rounded-lg text-[9px] font-bold tracking-wider uppercase"
                    >
                      Disconnect
                    </Button>
                  ) : !isConnecting ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnectClick(acc.provider)}
                      className="border-slate-200 dark:border-slate-800 h-7.5 px-3 rounded-lg text-[9px] font-bold tracking-wider uppercase flex items-center gap-1"
                    >
                      <Link2 className="h-3 w-3" />
                      <span>Connect</span>
                    </Button>
                  ) : null}
                </div>
              </div>

              {/* Inline connector form input */}
              {isConnecting && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 dark:border-slate-800 dark:bg-slate-950 text-slate-850 dark:text-white px-2.5 py-1.5 rounded-lg text-[10px] focus:border-primary-500 focus:outline-none"
                    autoFocus
                  />
                  
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleConfirmConnect(acc.provider)}
                    className="h-7.5 px-3.5 rounded-lg text-[9px] font-bold tracking-wider uppercase"
                  >
                    Confirm
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConnectingProvider(null)}
                    className="border-slate-200 dark:border-slate-800 h-7.5 px-3.5 rounded-lg text-[9px] font-bold tracking-wider uppercase"
                  >
                    Cancel
                  </Button>
                </div>
              )}

            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}

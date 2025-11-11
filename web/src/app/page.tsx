'use client';

import { useMemo, useState } from "react";

const defaultParams = {
  trendLength: 34,
  signalLength: 13,
  volatilityLength: 21,
  smoothFactor: 0.2,
};

const pascalTemplate = ({
  trendLength,
  signalLength,
  volatilityLength,
  smoothFactor,
}: typeof defaultParams) => `// Indicador: Adaptive Momentum Zones
// Plataforma: ProfitChart (Nelogica)
// Linguagem: Pascal Script

Input:
    TrendLength(${trendLength}),
    SignalLength(${signalLength}),
    VolatilityLength(${volatilityLength}),
    SmoothFactor(${smoothFactor.toFixed(2)});

Vars:
    TrendEMA(0),
    Drift(0),
    Volatility(0),
    NormalizedDrift(0),
    SmoothedDrift(0),
    SignalLine(0);

// Cálculo da tendência base com média exponencial
TrendEMA := MediaExponencial(Close, TrendLength);

// Distância entre o preço e a tendência
Drift := Close - TrendEMA;

// Volatilidade baseada no desvio padrão
Volatility := DesvioPadrao(Close, VolatilityLength);

If Volatility = 0 Then
    NormalizedDrift := 0
Else
    NormalizedDrift := Drift / Volatility;

// Suavização adaptativa opcional
SmoothedDrift := (SmoothFactor * NormalizedDrift) + ((1 - SmoothFactor) * SmoothedDrift[1]);

// Linha de sinal baseada na suavização exponencial
SignalLine := MediaExponencial(SmoothedDrift, SignalLength);

Plot1(SmoothedDrift, 'Momentum');
Plot2(SignalLine, 'Signal');
Plot3(0, 'Zero');

// Pintura de fundo conforme a dominância
If SmoothedDrift > SignalLine Then
    PaintBar(True, RGB(10, 140, 90))
Else If SmoothedDrift < SignalLine Then
    PaintBar(True, RGB(190, 35, 80))
Else
    PaintBar(True, RGB(120, 120, 120));

Comment('Momentum: ' + FormatFloat(SmoothedDrift, 2) + '  |  Signal: ' + FormatFloat(SignalLine, 2));
`;

export default function Home() {
  const [trendLength, setTrendLength] = useState(defaultParams.trendLength);
  const [signalLength, setSignalLength] = useState(defaultParams.signalLength);
  const [volatilityLength, setVolatilityLength] = useState(
    defaultParams.volatilityLength,
  );
  const [smoothFactor, setSmoothFactor] = useState(defaultParams.smoothFactor);
  const [copied, setCopied] = useState(false);

  const pascalCode = useMemo(
    () =>
      pascalTemplate({
        trendLength,
        signalLength,
        volatilityLength,
        smoothFactor,
      }),
    [trendLength, signalLength, volatilityLength, smoothFactor],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pascalCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-12 text-slate-100 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            ProfitChart Indicator Builder
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Adaptive Momentum Zones para Nelogica ProfitChart
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Gere um indicador em Pascal que captura a força de momentum
            normalizada pela volatilidade e gera zonas dinâmicas de compra e
            venda. Ajuste os parâmetros abaixo para atender ao seu setup e copie
            o código pronto para colar diretamente no editor do ProfitChart.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-white">
              Código Pascal Gerado
            </h2>
            <div className="relative">
              <button
                onClick={handleCopy}
                className="absolute right-3 top-3 rounded-full bg-emerald-500 px-4 py-1 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
              <pre className="max-h-[540px] overflow-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm leading-relaxed text-emerald-200 shadow-inner shadow-black">
{pascalCode}
              </pre>
            </div>
            <p className="text-sm text-slate-400">
              Dica: Se preferir manter o indicador sempre positivo, substitua a
              linha de plotagem por {`Plot1(Abs(SmoothedDrift), 'Momentum');`}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-white">Parâmetros</h2>
            <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
              <label className="block space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>TrendLength</span>
                  <span>{trendLength} candles</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={120}
                  value={trendLength}
                  onChange={(event) => setTrendLength(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>SignalLength</span>
                  <span>{signalLength} candles</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={60}
                  value={signalLength}
                  onChange={(event) => setSignalLength(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>VolatilityLength</span>
                  <span>{volatilityLength} candles</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={volatilityLength}
                  onChange={(event) =>
                    setVolatilityLength(Number(event.target.value))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>SmoothFactor</span>
                  <span>{smoothFactor.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={smoothFactor}
                  onChange={(event) =>
                    setSmoothFactor(Number(event.target.value))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
                />
              </label>

              <button
                onClick={() => {
                  setTrendLength(defaultParams.trendLength);
                  setSignalLength(defaultParams.signalLength);
                  setVolatilityLength(defaultParams.volatilityLength);
                  setSmoothFactor(defaultParams.smoothFactor);
                }}
                className="w-full rounded-full border border-emerald-500/60 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-slate-950"
              >
                Restaurar padrão
              </button>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-sm text-slate-300">
              <h3 className="text-base font-semibold text-white">Como usar</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Acesse o ProfitChart e abra o editor de indicadores.</li>
                <li>Cole o código Pascal gerado e salve o indicador.</li>
                <li>Adicione o indicador ao gráfico desejado.</li>
                <li>
                  As barras pintadas em verde indicam momentum positivo
                  sustentado; barras vermelhas apontam perda de força.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Lógica do Indicador
            </h2>
            <p className="text-slate-300">
              O Adaptive Momentum Zones normaliza a distância entre o preço e a
              média exponencial de tendência pelo desvio padrão, permitindo
              comparar diferentes ativos e períodos. A suavização adaptativa
              reduz ruídos e alimenta uma linha de sinal que ajuda a identificar
              mudanças de regime.
            </p>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <h3 className="text-base font-semibold text-white">
              Boas práticas
            </h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Combine com filtros de tendência, como médias móveis ou VWAP,
                para validar sinais.
              </li>
              <li>
                Ajuste {`SmoothFactor`} para controlar a sensibilidade. Valores
                altos reagem mais rápido, porém com mais ruído.
              </li>
              <li>
                Use em conjunto com gerenciamento de risco e confirmação por
                price action.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

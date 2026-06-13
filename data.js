// hnn.spwbrasil.org.br — protótipo conceitual
// ATENÇÃO: TODOS os dados aqui são FICTÍCIOS ou aproximações. Não use clinicamente.
// Pesos foram atribuídos por um não-médico tentando refletir literatura, e PRECISAM
// de revisão por geneticista/neurologista antes de qualquer uso real.

window.HNN_DATA = {
  sindromes: [
    { id: 'pws',    nome: 'Prader-Willi', sigla: 'PWS', gene: '15q11-q13 (cópia paterna)', associacao: 'spw_brasil', padraoOuro: 'metilacao_15q' },
    { id: 'sma',    nome: 'AME / SMA tipo 1', sigla: 'AME', gene: 'gene SMN1 (5q13)', associacao: 'iname', padraoOuro: 'smn1_molecular' },
    { id: 'angel',  nome: 'Síndrome de Angelman', sigla: 'AS', gene: '15q11-q13 (cópia materna) / UBE3A', associacao: 'angelman_brasil', padraoOuro: 'metilacao_15q' },
    { id: 'dm1',    nome: 'Distrofia Miotônica Congênita', sigla: 'DM1', gene: 'DMPK (expansão CTG)', associacao: 'adb', padraoOuro: 'dmpk_molecular' },
    { id: 'cms',    nome: 'Síndromes Miastênicas Congênitas', sigla: 'CMS', gene: 'CHRNE, RAPSN, COLQ e outros', associacao: 'cms_brasil', padraoOuro: 'painel_cms' },
    { id: 'miop',   nome: 'Miopatias Congênitas', sigla: 'MC', gene: 'múltiplos (RYR1, NEB, ACTA1 …)', associacao: 'miopatias_brasil', padraoOuro: 'painel_neuromuscular' },
    { id: 'hipot',  nome: 'Hipotireoidismo Congênito', sigla: 'HC', gene: 'multifatorial', associacao: null, padraoOuro: 'tsh_t4' },
    { id: 'pitth',  nome: 'Síndrome de Pitt-Hopkins', sigla: 'PHS', gene: 'TCF4', associacao: 'pitt_hopkins_brasil', padraoOuro: 'tcf4_sequenciamento' },
    { id: 'phelan', nome: 'Síndrome de Phelan-McDermid', sigla: 'PMS', gene: '22q13.3 / SHANK3', associacao: 'afspm', padraoOuro: 'cma' },
    { id: 'del1p36',nome: 'Deleção 1p36', sigla: '1p36', gene: '1p36', associacao: 'abf1p36', padraoOuro: 'cma' },
    { id: 'temple', nome: 'Síndrome de Temple', sigla: 'TS14', gene: '14q32 (disomia materna)', associacao: null, padraoOuro: 'metilacao_14q32' },
    { id: 'sys',    nome: 'Síndrome de Schaaf-Yang', sigla: 'SYS', gene: 'MAGEL2', associacao: null, padraoOuro: 'magel2_sequenciamento' },
  ],

  // Blocos de perguntas. Linguagem simples; termos técnicos sempre vêm explicados
  // entre parênteses ou no campo "hint" (mostrado em fonte menor).
  blocos: [
    {
      titulo: 'Gestação',
      perguntas: [
        {
          id: 'polidramnio',
          texto: 'Houve excesso de líquido amniótico durante a gestação?',
          hint: 'Também chamado de polidrâmnio. Geralmente identificado em ultrassom.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 2, dm1: 3, sys: 2, temple: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
            { v: 'ns',  label: 'Não sei', deltas: {} },
          ],
        },
        {
          id: 'oligodramnio',
          texto: 'Houve pouco líquido amniótico durante a gestação?',
          hint: 'Também chamado de oligodrâmnio.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { miop: 1, cms: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
            { v: 'ns',  label: 'Não sei', deltas: {} },
          ],
        },
        {
          id: 'movim_fetal',
          texto: 'Como a mãe descreve a movimentação do bebê durante a gestação?',
          opcoes: [
            { v: 'normal',    label: 'Movimentava normalmente', deltas: {} },
            { v: 'diminuida', label: 'Mexia pouco', deltas: { pws: 3, dm1: 3, sys: 3, sma: 2, miop: 2, cms: 2, temple: 2 } },
            { v: 'ausente',   label: 'Quase não mexia', deltas: { sma: 3, dm1: 3, miop: 3, sys: 3 } },
            { v: 'ns',        label: 'Não sei', deltas: {} },
          ],
        },
        {
          id: 'hist_materna_dm',
          texto: 'A mãe tem sinais leves de distrofia miotônica?',
          hint: 'Sinais comuns: dificuldade em soltar a mão após apertar algo, fraqueza muscular leve, catarata em adulto jovem. Mesmo que ela não saiba, vale perguntar.',
          opcoes: [
            { v: 'sim',     label: 'Sim', deltas: { dm1: 5 } },
            { v: 'nao',     label: 'Não', deltas: { dm1: -2 } },
            { v: 'ns',      label: 'Não investigada', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Nascimento',
      perguntas: [
        {
          id: 'prematuridade',
          texto: 'Nasceu prematuro (antes de 37 semanas)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: {} },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'peso',
          texto: 'Peso ao nascer estava:',
          hint: 'PIG = abaixo do esperado para a idade gestacional. GIG = acima do esperado.',
          opcoes: [
            { v: 'pig',  label: 'Pequeno para idade gestacional (PIG)', deltas: { temple: 3, del1p36: 1 } },
            { v: 'aig',  label: 'Adequado (AIG)', deltas: {} },
            { v: 'gig',  label: 'Grande (GIG)', deltas: {} },
          ],
        },
        {
          id: 'circ_cefalica',
          texto: 'Tamanho da cabeça (perímetro cefálico) está:',
          opcoes: [
            { v: 'micro',   label: 'Pequeno (microcefalia)', deltas: { del1p36: 3, pitth: 2 } },
            { v: 'normal',  label: 'Normal', deltas: {} },
            { v: 'macro',   label: 'Grande (macrocefalia)', deltas: {} },
          ],
        },
        {
          id: 'choro',
          texto: 'Como é o choro do recém-nascido?',
          opcoes: [
            { v: 'forte',  label: 'Forte e vigoroso', deltas: { sma: -1, pws: -1, miop: -1 } },
            { v: 'fraco',  label: 'Fraco', deltas: { pws: 3, sma: 3, dm1: 2, miop: 2, sys: 2, temple: 2 } },
            { v: 'ausente', label: 'Quase não chora', deltas: { sma: 3, miop: 3, pws: 2 } },
          ],
        },
      ],
    },
    {
      titulo: 'Sucção e alimentação',
      perguntas: [
        {
          id: 'succao',
          texto: 'Como o bebê está sugando (mamando)?',
          opcoes: [
            { v: 'normal',   label: 'Mama normalmente', deltas: { pws: -2, sys: -2, sma: -1 } },
            { v: 'pobre',    label: 'Mama, mas cansa rápido / fraco', deltas: { pws: 3, sys: 3, dm1: 2, sma: 2, temple: 2, miop: 2 } },
            { v: 'ausente',  label: 'Não consegue mamar', deltas: { pws: 4, sys: 4, sma: 2, miop: 2 } },
          ],
        },
        {
          id: 'sonda',
          texto: 'Está usando sonda para se alimentar?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 2, sys: 2, dm1: 2, sma: 2, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Respiração e UTI',
      perguntas: [
        {
          id: 'uti',
          texto: 'Precisou ficar na UTI neonatal?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 2, miop: 2, sys: 2, sma: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'vent_mecanica',
          texto: 'Precisou de respirador (ventilação mecânica)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 3, miop: 3, sys: 3, sma: 3, cms: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'apneia',
          texto: 'Tem pausas na respiração (apneia)?',
          hint: 'Apneia central = bebê para de respirar sem fazer esforço, mesmo dormindo.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sys: 3, pitth: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Exame neurológico',
      perguntas: [
        {
          id: 'reflexos',
          texto: 'Como estão os reflexos do bebê (patelar, aquileu)?',
          hint: 'Quando você bate no joelho ou no calcanhar com martelinho, o bebê responde?',
          opcoes: [
            { v: 'preserv',  label: 'Presentes', deltas: { pws: 1, sys: 1, temple: 1, sma: -2 } },
            { v: 'diminuidos', label: 'Diminuídos (mas presentes)', deltas: { miop: 2, dm1: 2, cms: 1 } },
            { v: 'ausentes', label: 'Ausentes', deltas: { sma: 4, miop: 2 } },
          ],
        },
        {
          id: 'fasciculacao',
          texto: 'Há tremores finos (em "minhoquinha") na língua quando ela está parada?',
          hint: 'Chamado de fasciculação de língua. Sinal muito típico de AME/SMA. Olhe a língua em repouso, sem o bebê chorando.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sma: 5 } },
            { v: 'nao', label: 'Não', deltas: { sma: -2 } },
          ],
        },
        {
          id: 'olhar_atento',
          texto: 'Mesmo com o corpo mole, o bebê tem olhar atento e segue rosto/luz?',
          hint: 'Contato visual preservado apesar da hipotonia é típico de AME.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sma: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'ptose',
          texto: 'Pálpebras caídas ou olhos que mexem pouco?',
          hint: 'Ptose = pálpebra caída. Oftalmoplegia = movimento dos olhos limitado.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { cms: 4 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'flutuante',
          texto: 'A fraqueza varia ao longo do dia (piora quando cansa, melhora ao descansar)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { cms: 4 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Aparência e outros sinais',
      perguntas: [
        {
          id: 'face_miop',
          texto: 'Rosto com pouca expressão / boca semi-aberta / lábios afastados?',
          hint: 'Chamada de "face miopática". Fraqueza simétrica dos músculos da face.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 4, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'face_pws',
          texto: 'Olhos amendoados, lábio superior fino, testa estreita?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 3, sys: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'face_pitt',
          texto: 'Nariz grande/proeminente, lábios grossos, queixo proeminente?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pitth: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'face_1p36',
          texto: 'Testa proeminente, sobrancelhas retas, queixo pequeno/retraído?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { del1p36: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'hipogonad',
          texto: 'Em meninos: testículos não desceram? Em meninas: genital pouco desenvolvido?',
          hint: 'Em meninos chama-se criptorquidia.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 3, sys: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'macroglossia',
          texto: 'Língua aumentada (não cabe direito na boca)?',
          hint: 'Chamada de macroglossia.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { hipot: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'icter',
          texto: 'Amarelão (icterícia) que dura mais de 2 semanas + sonolência + temperatura baixa?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { hipot: 4 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'artrog',
          texto: 'Articulações travadas / contraturas presentes ao nascer?',
          hint: 'Chamadas de artrogripose. Mãozinhas ou pezinhos que não se abrem completamente.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 3, sys: 3, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'cardiop',
          texto: 'Problema cardíaco identificado (sopro, cardiopatia)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { del1p36: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'convulsoes',
          texto: 'Apresentou crises convulsivas?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { del1p36: 2, pitth: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'hipogli',
          texto: 'Crises de açúcar baixo (hipoglicemia) que voltam mesmo após alimentar?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { temple: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'História familiar',
      perguntas: [
        {
          id: 'consanguin',
          texto: 'Os pais têm parentesco entre si (primos, tio-sobrinha, etc)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { cms: 2, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'morte_neon',
          texto: 'Há histórico de morte de irmão(s) no período neonatal sem causa esclarecida?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sma: 2, miop: 2, cms: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Exames já realizados',
      perguntas: [
        {
          id: 'pezinho_hipot',
          texto: 'Teste do pezinho mostrou alteração para hipotireoidismo?',
          opcoes: [
            { v: 'sim',     label: 'Sim', deltas: { hipot: 8 } },
            { v: 'nao',     label: 'Não', deltas: { hipot: -5 } },
            { v: 'pendente',label: 'Resultado ainda não saiu', deltas: {} },
          ],
        },
        {
          id: 'tsh',
          texto: 'TSH (hormônio da tireoide) dosado e está alto?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { hipot: 6 } },
            { v: 'nao', label: 'Não, TSH normal', deltas: { hipot: -4 } },
            { v: 'ns',  label: 'Não dosado', deltas: {} },
          ],
        },
        {
          id: 'ck',
          texto: 'CK (creatina quinase) está alta?',
          hint: 'Exame de sangue. Indica lesão muscular quando elevado.',
          opcoes: [
            { v: 'elevada',  label: 'Elevada', deltas: { dm1: 1, miop: 1 } },
            { v: 'normal',   label: 'Normal', deltas: {} },
            { v: 'ns',       label: 'Não dosada', deltas: {} },
          ],
        },
      ],
    },
  ],

  // Exames padrão-ouro e auxiliares.
  exames: [
    {
      id: 'metilacao_15q',
      nome: 'Teste de Metilação 15q11-q13 (MS-PCR / MLPA)',
      hint: 'Detecta perda ou alteração da região 15q. É o exame definitivo para Prader-Willi e Angelman.',
      confirma_afasta: ['pws', 'angel'],
      sus: { disponivel: 'centros_referencia', sigtap: '21.02.01.038-7 (FICTÍCIO)', obs: 'Disponível em centros de referência genética; encaminhamento via SUS pode demorar' },
      particular: { disponivel: true, faixa: '$$' },
      associacao_extra: 'spw_brasil',
      motivo: 'Padrão-ouro para Prader-Willi e Angelman. Resolve duas das principais hipóteses ao mesmo tempo.',
    },
    {
      id: 'smn1_molecular',
      nome: 'Análise molecular SMN1 (MLPA / PCR quantitativa)',
      hint: 'Detecta deleção do gene SMN1. AME tem tratamento específico e o tempo conta.',
      confirma_afasta: ['sma'],
      sus: { disponivel: 'centros_referencia', sigtap: '21.02.01.024-7 (FICTÍCIO)', obs: 'Centros de referência em doenças neuromusculares' },
      particular: { disponivel: true, faixa: '$$' },
      associacao_extra: 'iname',
      motivo: 'Padrão-ouro para AME. URGENTE: quanto antes confirmar, melhor a resposta ao tratamento.',
    },
    {
      id: 'painel_neuromuscular',
      nome: 'Painel neuromuscular (sequenciamento de vários genes)',
      hint: 'Em vez de testar 1 gene por vez, testa vários simultaneamente — útil quando o quadro não é claro.',
      confirma_afasta: ['miop', 'cms', 'dm1'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível diretamente no SUS' },
      particular: { disponivel: true, faixa: '$$$$' },
      associacao_extra: null,
      motivo: 'Cobre miopatias congênitas, miastenia e distrofia miotônica numa só análise.',
    },
    {
      id: 'dmpk_molecular',
      nome: 'Análise molecular DMPK (expansão CTG)',
      hint: 'Detecta a repetição CTG no gene DMPK. Vale a pena testar a mãe junto (forma adulta leve).',
      confirma_afasta: ['dm1'],
      sus: { disponivel: 'centros_referencia', sigtap: '21.02.01.025-5 (FICTÍCIO)', obs: 'Em centros de referência' },
      particular: { disponivel: true, faixa: '$$' },
      associacao_extra: 'adb',
      motivo: 'Padrão-ouro para distrofia miotônica congênita.',
    },
    {
      id: 'tsh_t4',
      nome: 'TSH + T4 livre (dosagem hormonal)',
      hint: 'Exame de sangue simples, rápido e barato. Disponível em qualquer laboratório.',
      confirma_afasta: ['hipot'],
      sus: { disponivel: 'sim', sigtap: '02.02.06.014-5', obs: 'Amplamente disponível em qualquer unidade de saúde' },
      particular: { disponivel: true, faixa: '$' },
      associacao_extra: null,
      motivo: 'Barato e rápido — deveria ser feito de rotina em qualquer hipotonia neonatal.',
    },
    {
      id: 'cma',
      nome: 'CMA (microarranjo cromossômico)',
      hint: 'Examina o genoma inteiro buscando deleções e duplicações cromossômicas.',
      confirma_afasta: ['phelan', 'del1p36'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível no SUS de rotina' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: null,
      motivo: 'Detecta deleções como 1p36 e 22q13 (Phelan-McDermid).',
    },
    {
      id: 'tcf4_sequenciamento',
      nome: 'Sequenciamento de TCF4',
      hint: 'Análise específica do gene TCF4 — diagnóstico de Pitt-Hopkins.',
      confirma_afasta: ['pitth'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Restrito a particular / pesquisa' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: 'pitt_hopkins_brasil',
      motivo: 'Padrão-ouro para Pitt-Hopkins.',
    },
    {
      id: 'metilacao_14q32',
      nome: 'Teste de metilação 14q32',
      hint: 'Detecta disomia uniparental materna no cromossomo 14.',
      confirma_afasta: ['temple'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível no SUS' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: null,
      motivo: 'Padrão-ouro para síndrome de Temple.',
    },
    {
      id: 'magel2_sequenciamento',
      nome: 'Sequenciamento de MAGEL2',
      hint: 'Análise específica do gene MAGEL2. Considerar quando o teste de Prader-Willi der negativo mas o quadro persistir.',
      confirma_afasta: ['sys'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Particular / centros de pesquisa' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: null,
      motivo: 'Padrão-ouro para Schaaf-Yang.',
    },
    {
      id: 'painel_cms',
      nome: 'Painel de Síndromes Miastênicas Congênitas',
      hint: 'Painel que sequencia vários genes relacionados (CHRNE, RAPSN, COLQ, DOK7…).',
      confirma_afasta: ['cms'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Particular' },
      particular: { disponivel: true, faixa: '$$$$' },
      associacao_extra: null,
      motivo: 'Sequencia múltiplos genes envolvidos em CMS.',
    },
  ],

  associacoes: {
    spw_brasil:           { nome: 'SPW Brasil',                    site: 'https://spwbrasil.org.br',                oferece: 'Exame gratuito de metilação 15q via parceria com IFF/Fiocruz; orientação e acolhimento.' },
    angelman_brasil:      { nome: 'Angelman Brasil',               site: 'https://angelmanbrasil.org',              oferece: 'Subsídio em alguns exames; orientação às famílias.' },
    iname:                { nome: 'INAME (Instituto Nac. AME)',    site: 'https://iname.org.br',                    oferece: 'Orientação diagnóstica e suporte para acesso ao tratamento.' },
    adb:                  { nome: 'Aliança Distrofia Brasil',      site: 'https://aliancadistrofiabrasil.org.br',   oferece: 'Orientação e rede de famílias.' },
    cms_brasil:           { nome: 'Grupo CMS Brasil',              site: '#',                                       oferece: 'Orientação e rede.' },
    miopatias_brasil:     { nome: 'Rede de Miopatias Congênitas',  site: '#',                                       oferece: 'Apoio às famílias.' },
    pitt_hopkins_brasil:  { nome: 'Pitt Hopkins Brasil',           site: 'https://pitthopkinsbrasil.org',           oferece: 'Orientação diagnóstica.' },
    afspm:                { nome: 'AFSPM (Phelan-McDermid)',       site: 'https://afspm.com.br',                    oferece: 'Orientação e suporte.' },
    abf1p36:              { nome: 'Associação Brasileira de Famílias 1p36', site: '#',                              oferece: 'Orientação e rede.' },
  },
}

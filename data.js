// hnn.spwbrasil.org.br — protótipo conceitual
// ATENÇÃO: TODOS os dados aqui são FICTÍCIOS ou aproximações. Não use clinicamente.

window.HNN_DATA = {
  sindromes: [
    {
      id: 'pws', nome: 'Prader-Willi', sigla: 'PWS', cor: '#dc2683',
      gene: '15q11-q13 (cópia paterna)', associacao: 'spw_brasil', padraoOuro: 'metilacao_15q',
      descricao: 'Hipotonia central grave no neonato, sucção pobre, choro fraco, e — clinicamente característica — hipogonadismo. Polidrâmnio e movimentação fetal reduzida são pistas pré-natais frequentes.',
      sintomasChave: ['Hipotonia central grave', 'Sucção pobre', 'Hipogonadismo', 'Choro fraco', 'Olhos amendoados'],
    },
    {
      id: 'sma', nome: 'AME / SMA tipo 1', sigla: 'AME', cor: '#dc2626',
      gene: 'gene SMN1 (5q13)', associacao: 'iname', padraoOuro: 'smn1_molecular',
      descricao: 'Doença do neurônio motor por deleção/mutação do SMN1. Fraqueza proximal progressiva, arreflexia, fasciculações de língua, sem comprometimento cognitivo. Há tratamentos aprovados — diagnóstico precoce é urgente.',
      sintomasChave: ['Arreflexia', 'Fasciculações de língua', 'Fraqueza proximal', 'Olhar atento preservado', 'Sem dismorfias'],
    },
    {
      id: 'angel', nome: 'Síndrome de Angelman', sigla: 'AS', cor: '#f59e0b',
      gene: '15q11-q13 (cópia materna) / UBE3A', associacao: 'angelman_brasil', padraoOuro: 'metilacao_15q',
      descricao: 'Geralmente não se manifesta com hipotonia grave no neonato (manifestações claras aparecem entre 6-12 meses). Pode haver dificuldade alimentar leve. Microcefalia se desenvolve depois.',
      sintomasChave: ['Hipotonia leve', 'Dificuldade alimentar', 'Manifestação tardia'],
    },
    {
      id: 'dm1', nome: 'Distrofia Miotônica Congênita', sigla: 'DM1', cor: '#9333ea',
      gene: 'DMPK (expansão CTG)', associacao: 'adb', padraoOuro: 'dmpk_molecular',
      descricao: 'Doença autossômica dominante por expansão CTG em DMPK. Forma congênita grave = sempre transmissão materna (antecipação). O diagnóstico na mãe frequentemente é feito pelo filho. Polidrâmnio, artrogripose e insuficiência respiratória são comuns na forma congênita.',
      sintomasChave: ['Mãe com miotonia ou fraqueza', 'Face miopática', 'Ptose palpebral bilateral', 'Polidrâmnio', 'Artrogripose possível'],
    },
    {
      id: 'cms', nome: 'Síndromes Miastênicas Congênitas', sigla: 'CMS', cor: '#2563eb',
      gene: 'CHRNE, RAPSN, COLQ e outros', associacao: 'cms_brasil', padraoOuro: 'painel_cms',
      descricao: 'Falha na junção neuromuscular por mutação em genes que codificam componentes do receptor de acetilcolina. Fraqueza flutuante, ptose, oftalmoplegia, frequentemente herança autossômica recessiva.',
      sintomasChave: ['Fraqueza flutuante', 'Ptose palpebral', 'Oftalmoplegia', 'Consanguinidade'],
    },
    {
      id: 'miop', nome: 'Miopatias Congênitas', sigla: 'MC', cor: '#059669',
      gene: 'múltiplos (RYR1, NEB, ACTA1 …)', associacao: 'miopatias_brasil', padraoOuro: 'painel_neuromuscular',
      descricao: 'Grupo heterogêneo de miopatias estruturais (nemalínica, central core, centronuclear). Hipotonia grave, fraqueza não-progressiva, reflexos diminuídos ou ausentes, sem fasciculações.',
      sintomasChave: ['Hipotonia grave', 'Reflexos diminuídos', 'Insuficiência respiratória', 'Sem fasciculações'],
    },
    {
      id: 'hipot', nome: 'Hipotireoidismo Congênito', sigla: 'HC', cor: '#0891b2',
      gene: 'multifatorial', associacao: null, padraoOuro: 'tsh_t4',
      descricao: 'Triado no teste do pezinho. Letargia, icterícia prolongada, macroglossia, constipação, choro rouco, hipotermia, hipotonia leve a moderada. Tratável e reversível se identificado precocemente.',
      sintomasChave: ['Macroglossia', 'Icterícia prolongada', 'Letargia', 'Hipotermia'],
    },
    {
      id: 'pitth', nome: 'Síndrome de Pitt-Hopkins', sigla: 'PHS', cor: '#7c3aed',
      gene: 'TCF4', associacao: 'pitt_hopkins_brasil', padraoOuro: 'tcf4_sequenciamento',
      descricao: 'Mutação no TCF4. Hipotonia neonatal moderada a grave, dificuldade alimentar, dismorfia facial característica (nariz proeminente, lábios grossos), episódios respiratórios anormais (hiperventilação/apneia) podem aparecer depois.',
      sintomasChave: ['Nariz proeminente', 'Lábios grossos', 'Microcefalia', 'Episódios de apneia'],
    },
    {
      id: 'phelan', nome: 'Síndrome de Phelan-McDermid', sigla: 'PMS', cor: '#db2777',
      gene: '22q13.3 / SHANK3', associacao: 'afspm', padraoOuro: 'cma',
      descricao: 'Deleção 22q13 / SHANK3. Hipotonia neonatal, atraso global, dismorfia mínima, mãos grandes. Diagnóstico geralmente por microarranjo.',
      sintomasChave: ['Hipotonia neonatal', 'Dismorfia mínima', 'Atraso global'],
    },
    {
      id: 'del1p36', nome: 'Deleção 1p36', sigla: '1p36', cor: '#374151',
      gene: '1p36', associacao: 'abf1p36', padraoOuro: 'cma',
      descricao: 'Deleção terminal 1p36. Hipotonia, microcefalia, dismorfia (testa proeminente, sobrancelhas retas, queixo retraído), cardiopatia congênita comum, convulsões.',
      sintomasChave: ['Microcefalia', 'Testa proeminente', 'Cardiopatia congênita', 'Convulsões'],
    },
    {
      id: 'temple', nome: 'Síndrome de Temple', sigla: 'TS14', cor: '#16a34a',
      gene: '14q32 (disomia uniparental materna)', associacao: null, padraoOuro: 'metilacao_14q32',
      descricao: 'Disomia uniparental materna do cromossomo 14. Hipotonia neonatal grave (semelhante a PWS), restrição de crescimento intrauterino, dificuldade alimentar, hipoglicemia, sem hipogonadismo.',
      sintomasChave: ['PIG (baixo peso ao nascer)', 'Sucção pobre', 'Hipoglicemia', 'Mãos/pés pequenos'],
    },
    {
      id: 'sys', nome: 'Síndrome de Schaaf-Yang', sigla: 'SYS', cor: '#475569',
      gene: 'MAGEL2', associacao: null, padraoOuro: 'magel2_sequenciamento',
      descricao: 'Mutações de perda de função em MAGEL2 (15q11). Clinicamente similar a Prader-Willi mas com artrogripose neonatal, hipoventilação grave e mortalidade neonatal elevada. Metilação 15q e microarray podem ser normais — diagnóstico exige sequenciamento de MAGEL2.',
      sintomasChave: ['Artrogripose neonatal', 'Hipoventilação neonatal grave', 'Similar a Prader-Willi'],
    },
  ],

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
            { v: 'pig',  label: 'Pequeno (PIG)', deltas: { temple: 3, del1p36: 1 } },
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
            { v: 'pobre',    label: 'Mama, mas cansa rápido', deltas: { pws: 3, sys: 3, dm1: 2, sma: 2, temple: 2, miop: 2 } },
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
          texto: 'Tem pausas na respiração (apneia central)?',
          hint: 'Bebê para de respirar sem fazer esforço, mesmo dormindo.',
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
          texto: 'Como estão os reflexos profundos (patelar, aquileu)?',
          hint: 'Bate no joelho ou no calcanhar com martelinho — o bebê responde?',
          opcoes: [
            { v: 'preserv',  label: 'Presentes', deltas: { pws: 1, sys: 1, temple: 1, sma: -2 } },
            { v: 'diminuidos', label: 'Diminuídos (mas presentes)', deltas: { miop: 2, dm1: 2, cms: 1 } },
            { v: 'ausentes', label: 'Ausentes', deltas: { sma: 4, miop: 2 } },
          ],
        },
        {
          id: 'fasciculacao',
          texto: 'Há tremores finos (em "minhoquinha") na língua quando ela está parada?',
          hint: 'Chamado de fasciculação de língua. Sinal típico de AME. Olhe a língua em repouso, sem o bebê chorando.',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sma: 5 } },
            { v: 'nao', label: 'Não', deltas: { sma: -2 } },
          ],
        },
        {
          id: 'olhar_atento',
          texto: 'Mesmo com o corpo mole, o bebê tem olhar atento e segue o rosto?',
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
          texto: 'Nariz proeminente, lábios grossos, queixo proeminente?',
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
          texto: 'Icterícia >2 semanas + sonolência + temperatura baixa?',
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
            { v: 'pendente',label: 'Resultado pendente', deltas: {} },
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

  exames: [
    {
      id: 'metilacao_15q',
      nome: 'Teste de Metilação 15q11-q13 (MS-MLPA ou MS-PCR)',
      descricao: 'Este é o exame definitivo para Prader-Willi e Angelman — não o microarranjo. Detecta alterações no padrão de metilação do cromossomo 15, independente da causa (deleção, dissomia uniparental ou defeito de imprinting). Confirma Prader-Willi em ~99% dos casos e Angelman em ~88%.',
      confirma_afasta: ['pws', 'angel'],
      padrao_ouro: true,
      sus: { disponivel: 'parcial', sigtap: '21.02.01.038-7 (FICTÍCIO)', obs: 'Disponível em centros de referência do SUS (HC-USP, IFF/FIOCRUZ, HCFMRP-Ribeirão Preto). Pode requerer encaminhamento. Verificar disponibilidade no estado.' },
      particular: { disponivel: true, faixa: '$$', faixaTexto: 'R$ 800–1.500' },
      associacao_extra: 'spw_brasil',
      associacao_extra2: 'angelman_brasil',
      interpretacao: 'Resultado compatível com Prader-Willi: diagnóstico confirmado — encaminhar à genética para determinar o mecanismo. Resultado compatível com Angelman: diagnóstico confirmado. Normal: não afasta Angelman por mutação no gene UBE3A (~11% dos casos) — se suspeita clínica forte, pedir sequenciamento do UBE3A.',
    },
    {
      id: 'smn1_molecular',
      nome: 'Análise molecular SMN1 — MLPA / PCR quantitativa (éxons 7 e 8)',
      descricao: 'Exame de sangue que detecta a alteração no gene responsável pela AME (Amiotrofia Espinhal). Presente em ~95% dos casos. O diagnóstico rápido é urgente: existem três tratamentos aprovados no Brasil (Nusinersen, Zolgensma, Risdiplam) que mudam radicalmente o prognóstico — quanto mais cedo tratado, melhor o resultado.',
      confirma_afasta: ['sma'],
      padrao_ouro: true,
      sus: { disponivel: 'parcial', sigtap: '21.02.01.024-7 (FICTÍCIO)', obs: 'Disponível em centros de referência do SUS. AME tem tratamento de urgência — solicitar com prioridade.' },
      particular: { disponivel: true, faixa: '$$', faixaTexto: 'R$ 300–600' },
      associacao_extra: 'iname',
      interpretacao: 'Deleção detectada: diagnóstico de AME confirmado — encaminhar com urgência a serviço especializado para definir tipo e tratamento. Normal: afasta 95% dos casos de AME — se suspeita continua forte, pedir sequenciamento completo do gene SMN1.',
    },
    {
      id: 'painel_neuromuscular',
      nome: 'Painel neuromuscular (sequenciamento de múltiplos genes)',
      descricao: 'Sequencia simultaneamente vários genes envolvidos em miopatias congênitas, miastenias congênitas e distrofia miotônica. Útil quando o quadro clínico não permite priorizar uma síndrome específica.',
      confirma_afasta: ['miop', 'cms', 'dm1'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível diretamente no SUS' },
      particular: { disponivel: true, faixa: '$$$$', faixaTexto: 'R$ 3.000–8.000' },
      associacao_extra: null,
      interpretacao: 'Mutação patogênica em um dos genes: encaminhar à genética para aconselhamento e definir conduta. Normal: não afasta totalmente — pode haver mutação em genes fora do painel.',
    },
    {
      id: 'dmpk_molecular',
      nome: 'Análise molecular DMPK (expansão CTG)',
      descricao: 'Detecta a repetição CTG no gene DMPK. Padrão-ouro para distrofia miotônica congênita. Vale a pena testar a mãe junto (forma adulta leve frequentemente subdiagnosticada).',
      confirma_afasta: ['dm1'],
      padrao_ouro: true,
      sus: { disponivel: 'parcial', sigtap: '21.02.01.025-5 (FICTÍCIO)', obs: 'Em centros de referência' },
      particular: { disponivel: true, faixa: '$$', faixaTexto: 'R$ 500–1.200' },
      associacao_extra: 'adb',
      interpretacao: 'Expansão patogênica detectada: diagnóstico confirmado — investigar mãe e aconselhamento genético familiar. Normal: afasta DM1.',
    },
    {
      id: 'tsh_t4',
      nome: 'TSH + T4 livre (dosagem hormonal)',
      descricao: 'Exame de sangue simples, rápido e barato. Disponível em qualquer laboratório. Deveria ser feito de rotina em qualquer hipotonia neonatal — confirma ou afasta hipotireoidismo congênito.',
      confirma_afasta: ['hipot'],
      padrao_ouro: true,
      sus: { disponivel: 'sim', sigtap: '02.02.06.014-5', obs: 'Amplamente disponível em qualquer unidade de saúde' },
      particular: { disponivel: true, faixa: '$', faixaTexto: 'até R$ 300' },
      associacao_extra: null,
      interpretacao: 'TSH alto + T4 baixo: hipotireoidismo confirmado — iniciar levotiroxina imediatamente (tratamento reverte a hipotonia). Normal: afasta.',
    },
    {
      id: 'cma',
      nome: 'CMA (microarranjo cromossômico)',
      descricao: 'Examina o genoma inteiro buscando deleções e duplicações cromossômicas. Detecta síndromes como Phelan-McDermid (22q13) e Deleção 1p36. NÃO substitui o teste de metilação 15q para investigar Prader-Willi/Angelman.',
      confirma_afasta: ['phelan', 'del1p36'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível no SUS de rotina' },
      particular: { disponivel: true, faixa: '$$$', faixaTexto: 'R$ 1.000–3.000' },
      associacao_extra: null,
      interpretacao: 'Deleção 22q13 detectada: Phelan-McDermid confirmada. Deleção 1p36 detectada: 1p36 confirmada. Normal: afasta estas e outras deleções/duplicações de tamanho compatível.',
    },
    {
      id: 'tcf4_sequenciamento',
      nome: 'Sequenciamento de TCF4',
      descricao: 'Análise específica do gene TCF4 — padrão-ouro para Pitt-Hopkins.',
      confirma_afasta: ['pitth'],
      padrao_ouro: true,
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Restrito a particular / pesquisa' },
      particular: { disponivel: true, faixa: '$$$', faixaTexto: 'R$ 1.500–3.000' },
      associacao_extra: 'pitt_hopkins_brasil',
      interpretacao: 'Mutação patogênica: confirma Pitt-Hopkins. Normal: afasta.',
    },
    {
      id: 'metilacao_14q32',
      nome: 'Teste de metilação 14q32',
      descricao: 'Detecta disomia uniparental materna no cromossomo 14. Padrão-ouro para síndrome de Temple.',
      confirma_afasta: ['temple'],
      padrao_ouro: true,
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível no SUS' },
      particular: { disponivel: true, faixa: '$$$', faixaTexto: 'R$ 1.500–3.000' },
      associacao_extra: null,
      interpretacao: 'Padrão alterado: confirma Temple. Normal: afasta.',
    },
    {
      id: 'magel2_sequenciamento',
      nome: 'Sequenciamento de MAGEL2',
      descricao: 'Análise específica do gene MAGEL2. Considerar quando o teste de metilação 15q (Prader-Willi) der negativo mas o quadro clínico persistir.',
      confirma_afasta: ['sys'],
      padrao_ouro: true,
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Particular / centros de pesquisa' },
      particular: { disponivel: true, faixa: '$$$', faixaTexto: 'R$ 1.500–3.000' },
      associacao_extra: null,
      interpretacao: 'Mutação patogênica: confirma Schaaf-Yang. Normal: afasta.',
    },
    {
      id: 'painel_cms',
      nome: 'Painel de Síndromes Miastênicas Congênitas',
      descricao: 'Sequencia múltiplos genes envolvidos em CMS (CHRNE, RAPSN, COLQ, DOK7, etc).',
      confirma_afasta: ['cms'],
      padrao_ouro: true,
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Particular' },
      particular: { disponivel: true, faixa: '$$$$', faixaTexto: 'R$ 3.000–6.000' },
      associacao_extra: null,
      interpretacao: 'Mutação patogênica em um dos genes do painel: confirma CMS. Normal: não afasta totalmente (pode haver mutação em gene não coberto).',
    },
  ],

  associacoes: {
    spw_brasil:           { nome: 'SPW Brasil',                                                    site: 'https://spwbrasil.org.br',                oferece: 'Oferece o exame de metilação 15q gratuitamente via parceria com o IFF/FIOCRUZ; orientação e acolhimento às famílias.' },
    angelman_brasil:      { nome: 'ABSA — Angelman Brasil',                                        site: 'https://angelmanbrasil.org',              oferece: 'Oferece exame gratuito; subsídio em alguns casos; orientação às famílias.' },
    iname:                { nome: 'INAME — Instituto SMA Brasil',                                  site: 'https://iname.org.br',                    oferece: 'Pode dar maiores informações sobre acesso ao diagnóstico e ao tratamento.' },
    adb:                  { nome: 'Aliança Distrofia Brasil',                                      site: 'https://aliancadistrofiabrasil.org.br',   oferece: 'Orientação e rede de famílias.' },
    cms_brasil:           { nome: 'Grupo CMS Brasil',                                              site: '#',                                       oferece: 'Orientação e rede.' },
    miopatias_brasil:     { nome: 'Rede de Miopatias Congênitas',                                  site: '#',                                       oferece: 'Apoio às famílias.' },
    pitt_hopkins_brasil:  { nome: 'Pitt Hopkins Brasil',                                           site: 'https://pitthopkinsbrasil.org',           oferece: 'Orientação diagnóstica.' },
    afspm:                { nome: 'AFSPM — Phelan-McDermid',                                       site: 'https://afspm.com.br',                    oferece: 'Orientação e suporte às famílias.' },
    abf1p36:              { nome: 'Associação Brasileira de Famílias 1p36',                        site: '#',                                       oferece: 'Orientação e rede.' },
  },
}
